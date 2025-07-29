---
title: "Continuous Integration (CI) and Unit Testing: Lessons from Building PlantVision"
date: "2025-06-10"
excerpt: "How automation and testing helped me catch bugs early and move fast"
coverImage: "/assets/blog_assets/ci_unit_tests.jpg"
tags: ["Articles", "Projects", "PlantVision", "Python", "MLOps"]
readingTime: 30
---
## **Unit Testing:**
- The practise of testing the smallest individual components (units or parts) of software in isolation
## **Continuous Integration (CI):**
- The practise of automatically running these tests every time new code is added to the project, ensuring all parts 
still work together after every change

# 1. Unit Testing - Verifying the Building Blocks
A nuit test has a very specific job, to verify that a single **function** or **method** works as expected given a specific input
## The Anatomy of a Good Unit Test: The **AAA** Pattern
Tests are writen following the **Arrange**, **Act**, **Assert (AAA)** pattern
- **Arrange:** Set up all the necessary preconditions and inputs. This is where dummy data and configure mocks are created, getting ready for the test
- **Act:** Execute the one specific function or method being tested. A good unit test calls only one function.
- **Assert:** Check if the result of the "Act" step is what is expected. this is done with `assert` statements. If an `assert` is true, the test passes. If false, the test fails
## Example 1: A unit test for `transforms.py`
```python
# in tests/data/test_transforms.py

def test_get_transforms_resizes_correctly():
"""Tests if the transform pipeline correctly resizes a dummy PIL image"""

# ARRANGE
test_img_size = 64
dummy_image_np = np.unit8(np.random.rand(100, 120, 3) * 255)
dummy_pil_image = Image.formarray(dummy_image_np)

# ACT
transform_pipeline = get_transforms(img_size=test_image_size)
transformed_image = transform_pipeline(dummy_image_np)

# ASSET
assert isinstance(transformed_image, torch.Tensor) # Checks if the output of transforms.py is pytorch tensor
expected_shape = (3, test_img_size, test_img_size)
assert transformed_image.shape == expected_shape
```
- **Why is this a perfect unit test?**
  1. **Isolation:** It tests only the `get_transforms` function. It doesn't need a model, a dataloader, or a real dataset
  2. **Deterministic:** It will produce the exact same result every single time its run. It doesn't depend on random factors
  3. **Fast:** It runs in a fraction of a second
##  Example 2a: The Power of Mocking
- Sometimes a "unit" depends on something external, like the file system or a network connection. To keep the tests isolated and fast,
**mocking** is used. A mock is a "stunt double" for a real component
```python
def check_kitchen_for_water():
    return True
```
```python
def boil_water():
    print("Boiling water...")
```
```python
def make_tea():
    if not check_kitchen_for_water():
        raise Exception("No water!")
    boil_water()
    return "Tea is ready!"
```

```python
from unittest.mock import patch

@patch('unit.boil_water') # mock boiling
@patch('unit.check_kitchen_for_water') # mock water check
def test_make_tea(mock_check_water, mock_boil):
  
  # ARRANGE
  mock_check_water.return_value = True # Pretend we have water
  mock_boil.return_value = None # Pretend boiling happend instantly
  
  # ACT
  result = make_tea()
  
  # ASSERT
  assert result == "Tea is ready!"
  mock_check_water.assert_called_once()
  mock_boil.assert_called_one()
```
##  Example 2b: A More Advanced Use of Mocks
```python
@patch('torch.load')
@patch('pathlib.Path.is_file')
def test_efficientnet_loads_pretrained_weights(mock_is_file, mock_torch_load):
  
    # ARRANGE
    mock_is_file.return_value = True # Pretend the file exists
    mock_torch_load.return_value = {} # Pretend torch.load returns an empty dic
    dummy_weights_path = MagicMock() # A fake path object ~MagicMock pretends to be any object with any attributes or parameters
    
    # ACT
    model = EfficientNet(
      num_classes=10,
      pretrained_weights_path=dummy_weights_path
    )
    
    # ASSERT
    mock_is_file.assert_called_once() # Did the code TRY to check if the file exists?
    mock_torch_load.assert_called_once() # Did the code TRY to load the weights?
```
> *Mocks go into the code and replace real logic with fake logic that follows rules you define*

## PyTest Fixture
- Is a powerful feature that allows you to set up some data or state before a test runs, and cleans it up afterward if necessary
A fixture is a **reusable**, **pre-test preparation function** that helps make tests **cleaner**, **DRY (Don't Repeat Yourself)** and
easier to maintain
### Key Benefits:
  - **Reusability:** Write the setup code once, use it in many tests
  - **Modularity:** Separates the "how to set things up" (the fixture) from "what to test" (the test function). This makes tests much easier to read
  - **Dependency Injection:** A test declares what it needs by simply accepting the fixture's name as an argument. `pytest` handles the rest automatically

```python
# A simple fixture
import pytest

@pytest.fixture
def sample_data():
    return {'name': 'Megan', 'age': 31}

def test_name(sample_data):
    assert sample_data['name'] == 'Megan'

def test_age(sample_data):
    assert sample_data['age'] == 22
```
> *`@pytest.fixture` is the decorator that turns a regular function into a fixture.*

## `conftest.py`
- Is a **shared fixture library** for the tests. When you place fixtures inside a `conftest.py` file, those fixtures become
**automatically available to all test files** (`test_*.py`) **in the same directory and all subdirectories. They don't need to be imported. 
`pytest` discovers them by magic**

```python
# conftest.py file
import pytest

@pytest.fixture(scope="session")
def dummy_evaluation_project(tmp_path_factory):
    ...
    return {
      'output_1': output1,
      'output_2': output2
    }

# tmp_path_factory: this is itself a  built-in pytest fixture! It provides a tool to create unique temporary directories that...
pytest will automatically delete after the tests are done
```

# 2. Continuous Integration (CI) - The Art of Automatic Code Integration
- Below is the github CI workflow that PlantVision uses
```python
name: PlantVision CI Pipeline

# 1. Trigger: When does this workflow run?
on:
  push:
    branches: ["main", "develop"] # Run on pushes to main or develop
  pull_request:
    branches: ["main"] # Also run on pull requests targeting main

# 2. Jobs: What tasks should be performed?
jobs:
  build-and-test:
    # 3. Environment: What kind of machine should this run on?
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11"]
    # 4. Steps: The sequence of commands to execute
    steps:
      # Step 1: Check out the repository's code
      - name: Check out code
        uses: actions/checkout@v4
      # Step 2: Set up the specific Python version
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      # Step 3: Install dependencies
      # Install dependencies including pytest
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      # Step 4: Install the project package itself
      - name: Install project package
        run: pip install -e .
      # Step 5: Run the tests: If this step fails, the entire workflow fails
      - name: Run tests with pytest
        run: pytest
```
## a). Trigger: When does the workflow run?
A CI pipeline starts with a trigger that initiates the automatic workflow. For example:
  - `push` to `main` or `develop` branches: Everytime new code is commited to the `main` or `develop` branch of PlantVision code repository,
  the CI pipeline is automatically started
  - `pull_request` to the `main` branch: The pipeline also runs when a developer creates a pull request to merge their changes into the `main` branch,
  - which is crucial for catching errors before code is integrated into the main codebase.
## b). Jobs: What tasks should be performed?
Once triggered, the pipeline executes one or more "jobs". A **Job** is a set of steps that run on the same virtual machine ie. `build-and-test`

## c). Environment: What kind of machine should this run on?
The `runs-on` keyword specifies the type of machine to run the job on. In this case, it's ubuntu-latest, which means the
job will execute in a fresh, up-to-date Ubuntu Linux environment.

The `strategy` section allows you to run the job multiple times with different configurations. Here, `matrix: python-version: ["3.11"]` 
sets up the job to run using Python version 3.11.

## d). Steps: The sequence of commands to execute
These are the individual commands that make up the job. They are executed in order, and **if any step fails, the entire job 
(and thus the pipeline) will fail**. This is to provide fast feedback to developers about the quality of the changes made

 - **Step 1: Check out code:** The `actions/checkout@v4` action is a pre-built script that **downloads the latest code** 
from the PlantVision repository into the virtual machine 
 - **Step 2: Set up Python:** The `actions/setup-python@v4` action **installs** the specified version of Python which is 3.11 in this case. 
 - **Step 3: Install dependencies:** This step uses `pip`, Python's package installer, to install all the necessary libraries 
and packages that PlantVision depends on. These are listed in the `requirements.txt` file. 
 - **Step 4: Install project package:** This command installs PlantVision's code as a package, making it available for testing. 
 - **Step 5: Run tests with pytest:** Finally, this step executes the automated tests written for the project using the pytest 
framework. If **any of these tests fail**, this step will fail, signaling that the new code has introduced a bug.