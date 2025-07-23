---
title: "The Anatomy of a Professional Machine Learning Project: A Guide to Structure and Sanity"
date: "2025-07-10"
excerpt: "A comprehensive guide to understanding how real-world machine learning projects are structured"
coverImage: "/assets/blog_assets/project_structures.jpg"
tags: ["Deep Learning", "Python", "Neural Networks", "PlantVision", "Projects"]
readingTime: 30
---
# Introduction: From Fragile Scripts to Robust Systems
Every machine learning practitioner starts the same way, a single Python script or a Jupyter Notebook. 
It works! You can load data, train a model, and see the results. 
But the moment you try to add a feature, or try to deploy your model, the house of cards collapses. 
You're hit with a ton of errors, `ModuleNotFoundError`, `FileNotFoundError`, or even `RunTimeErrors`.

## Motivation
All this started as I was working on my end-to-end [PlantVision project](https://muhumuzadeus.netlify.app/projects/plantvision-cv001dd), I had finished working on the model architecture and decided to try and run the `train.py` script, only to be hit by `ModuleNotFoundError` and `FileNotFoundError`. It was really confusing cause the files and modules where all there. 
It was not until I carried out some research that I realized I had done things really wrong, not only in my code, but also in the general structure of my project. 

One thing I realized is that its very easy for self-taught developers to bypass these important concepts and principles, as they are solely hyper-focused 
on getting the model running, and code with no bugs.

I can say with confidence that these errors and this project in general have opened to me a whole new way of writing clean, scalable, 
modular python code and structuring real-world python projects I didn't know existed.

# The Four Pillars of a Great Project Structure
First and foremost we have to understand the principles. The structure isn't arbitrary, its designed to enforce good habits

## 1. Separation of Concerns
In the same way dishes are not put together with laundry, code shouldn't be mixed up. There's a place for everything and 
everything in its place. A machine learning project has different types of assets: source code, configuration files, data, notebooks. 
They should never be mixed.

## 2. Decoupling
Modules (Python files) should be like LEGO bricks, each piece has a specific function and connects to others through a 
standard interface, but it doesn't need to know the internal workings of the other pieces.

What this means is that model code shouldn't know or care how data is loaded. The data loader shouldn't care what model 
is being used. This allows us to swap out a model, or a data source without breaking the entire system

## 3. Dependency Injection
A module should be given its dependencies (like configuration data), not go looking for them.

For example, 

❌❌ A data loading script that opens `../../configs/data.yaml` to find the batch size. This makes the script brittle
and impossible to test without a specific folder structure

☑️☑️ A data loading function that accepts `batch_size` as an argument. The main script (`train.py`) is responsible for 
reading the config file and passing (injecting) the `batch_size` value into the function

## Explicit is Better than Implicit
This is a core tenet of Python (The Zen of Python). Your project's structure and how it works should be obvious, not magical.
This is what `setup.py` and absolute imports archive

# <u>A TOUR OF THE PROJECT ANATOMY</u>

### Project structure before:
```python
plantvision/
├── data/                     
│   ├── raw/                  
│   └── processed/                         
├── src/                     
│   ├── configs/
│   │    ├── data_config.yaml
│   │    ├── model_config.yaml
│   │    └── train_config.yaml     
│   ├── data/
│   │   ├── __init__.py
│   │   ├── loader.py
│   │   └── transforms.py           
│   ├── models/              
│   ├── train.py             
│   ├── evaluate.py          
│   ├── quantize.py          
│   ├── serve/               
│   └── utils.py             
├── docker/                 
├── mlruns/                  
├── mlflow/                  
├── Dockerfile                
├── requirements.txt         
├── README.md                
├── start.sh                 
└── experiment/              
```

## Project structure after:
```python
PlantVision_cv001dd/
├── configs/                  # The Recipe Book: All experiment parameters.
│   ├── data_config.yaml
│   ├── model_config.yaml
│   └── train_config.yaml
├── data/                     # All project data.
│   ├── raw/                  # Original, immutable data.
│   └── processed/            # Cleaned, transformed data for training.
├── notebooks/                # The Lab Notebook: For exploration and analysis.
│   └── 1-data-exploration.ipynb
├── src/                      # The Engine Room: All Python source code.
│   ├── PlantVision/          # The core installable package for our project.
│   │   ├── __init__.py
│   │   ├── data/
│   │   │   ├── __init__.py
│   │   │   ├── loader.py
│   │   │   └── transforms.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── efficientnet/
│   │   ├── train.py          # Entrypoint for training.
│   │   ├── evaluate.py       # Entrypoint for evaluation.
│   │   └── utils.py
│   └── paths.py              # The GPS: A single source of truth for paths.
├── .dockerignore             # Tells Docker what to ignore.
├── Dockerfile                # The Shipping Container: For reproducibility.
├── README.md                 # Project explanation.
├── requirements.txt          # The Shopping List: Project dependencies.
└── setup.py                  # The Blueprint: Makes your project installable.
```
## a). `configs/`
This folder holds configuration as simple YAML or JSON files. Hyper-parameters, file paths (relative ones),
model variations, and anything which ,might be changed between experiments.

The purpose of this file is to separate code from configuration. for example the learning rate or image size are changed
without touching your Python code which is crucial for experiment tracking and reproducibility

## b). `src/PlantVision/`
This is the actual python package. This `PlantVision/` folder prevents the project's modules from accidentally conflicting
with other installed libraries and makes imports clean and unambiguous `(from PlantVision.data import ...)`.
### The Problem with a "Flat" src Directory
Imagine the project structure was simpler
```python
project_root/
└── src/
    ├── __init__.py
    ├── data.py
    ├── model.py
    └── train.py
```
And the `setup.py` was configured to recognise the packages inside `src`. The code might work after running `python -m train` but 
might introduce a subtle and dangerous problem as the project grows.

- What if we `pip install` a library that also has a module named `data.py` or `utils.py`. When we write
`from data import ...`, which data module is Python going to import?
### ``The Solution: The `src/PackageName` Layout``
By creating a dedicated package directory inside src, we solve the problem cleanly
```python
project_root/
└── src/
    └── PlantVision/        <-- The actual package
        ├── __init__.py
        ├── data.py
        ├── model.py
        └── train.py
```

Every import is now explicit and rooted in the unique package name:
- `from PlantVision.data import get_dataloader`
- `from PlantVision.models import EfficientNet`


### `__init__.py` 
These empty files tell Python that a directory is a package, allowing us to import modules from it
### `train.py`, `evaluate.py`, `api.py` 
These are this project's **entrypoints**. They are the "orchestrators" that read `configs`
and use the decoupled components from `data/` and `models/` to perform a specific task

## c). `paths.py`
This is the **project's GPS**. This is a simple but powerful addition. It defines the **absolute root** of the project and other key
directories. Any python script no matter how deeply nested, can import `paths.PROJECT_ROOT` and reliably find any non-python file.
This single-handedly solves `FileNotFoundError`

### The Problem It Solves: The Fragility of Relative Paths
Imagine the wasn't a `paths.py` file. How would the configuration file be loaded?

**Scenario: From `train.py`**
If we are in `src/PlantVision/train.py`, we might try to open the config file like this:
```python
# This is fragile!
with open("../../configs/data_config.yaml", "r") as f:
    ...
```
This uses a relative path (`../../`), which might work for now but what happens if we decide to refactor and move 
`train.py` into a new subfolder like `src/PlantVision/pipelines/`? Now the path is wrong (`../../../`), and our code breaks.

Every file needs to know its own exact depth in the directory tree to find the `configs` folder, which is a maintenance nightmare

This introduces a **core problem**; The code's ability to find its resources is tied to its own location on the file system

### The Solution of the `paths.py` file as the Stable Anchor
```python
# src/paths.py

from pathlib import Path

# __file__ is the absolute path to THIS paths.py file
# .parent is its directory (src/)
# .parent again is the project root

PROJECT_ROOT = Path(__file__).parent.parent

# Definition of other key directories relative to this stable anchor
CONFIG_DIR = PROJECT_ROOT / "configs"
DATA_DIR = PROJECT_ROOT / "data"
SAVED_MODELS_DIR = PROJECT_ROOT / "models"
```
Now any python file in our project can find the config file the exact same way, with no guesswork

```python
# In train.py, loader.py, or any other file...
from src import paths

# This is now 💯 reliable, no matter where this script is
config_path = paths.CONFIG_DIR / "data_config.yaml"

with open(config_path, "r") as f:
    ...
```
## d). `setup.py`
This is the build script for the project. It's a standard Python file that tells `setuptools` and `pip` everything it needs
to know to **package**, **install** and **distribute** the code
```python
# setup.py

# Import necessary functions
from setuptools import find_packages, setup

# Call the main setup() function
setup(
  # Core metadata
  name='PlantVision',
  version='0.0.1',
  auther='Muhumuza Deus.M.'
  description='A project for plant vision tasks',
  
  # Package Discovery (Perhaps the most important part for structure)
  package_dir={'': 'src'},
  packages=find_packages(where='src')
  
  # Optional addition
  python_requires='>=3.8'
)

# find_packages: Instead of manually listing every single package folder in the project,...
# find_packages() does it automatically by scanning the directory and finds any folder that contains...
# an __init__.py file, marking it as a package

# name='PlantVision': Official name to use to import the package (import PlantVision) and the name pip will use
# version='0.0.1': When code is updated, the version is increased

# packages=find_packages(where='src'): Tells find_packages() not to look for packages in the project root,...
# but to start from the src directory. 
# It will go into src/ and find the PlantVision directory because it has an __init__.py and so does its sub-packages
# It returns a list like ['PlantVision', 'PlantVision.data', 'PlantVision.models', ...]

# package_dir={'': 'src'}: Tells setuptools that the package name 'PlantVision' doesn't have its source code in its root dir...
# but inside the src/ folder
# '' represents the 'package root', meaning that the root for all packages('') is mapped to the src/ dir
```

### `pip install -e`
When ran inside the terminal,
- `pip` finds setup.py in the current directory
- It executes the `setup()` function
- Reads the `name (PlantVision)` and version
- Uses `package_dir` and `packages` to locate all the source code files inside src/
- Because of the `-e (editable)` flag, it creates the `PlantVision.egg-info` directory and the `.egg-link` file inside
`venv/Lib/site-packages/` that points directly back to the `src` folder

## `paths.py` VS. `setup.py`
- setup.py solves the Python module pathing problem. It helps Python answer the question "Where do l find the `PlantVision` package?"
- paths.py solves the data file pathing problem. It helps code answer the "Where do I find the `data_config.yaml` file?"

# <u>HOW THE PRINCIPLES WERE APPLIED TO THE PROJECT</u>
Here I explain how the four principles mentioned above were applied to the project, through comparing some of the changes made
in the project's code base

### i. Separation Of Concerns:
The `configs/` directory was moved out of `src/` to the project root, separating the project's source code from the configuration
files.
### ii. Decoupling:
The core logic doesn't know about file paths. 
- **Before:** `loader.py` and `transforms.py` directly opened config files, coupling them to a specific directory structure
```python
# loader.py

import yaml
from torch.utils.data import DataLoader
import torchvision.datasets as datasets
from data.transforms import transform
from pathlib import Path


def load_config(config_path="src/configs/data_config.yaml"):
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)
    
# Config settings from the config file  
data_config = load_config()
train_path = Path(data_config['data']['train_dir'])
batch_size = data_config['data']['batch_size']
num_workers = data_config['data']['loader_num_workers']
    ...
```
```python
# transforms.py

import yaml
from torchvision import transforms

def load_config(config_path="src/configs/data_config.yaml"):
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)
    
    
data_config = load_config()
img_size = data_config['data']['img_size']


transform = transforms.Compose([
    transforms.Resize((img_size, img_size)),
    transforms.ToTensor()
])
```
- **After:** These are now pure functions decoupled from the file system
```python
# loader.py

from torch.utils.data import DataLoader
import torchvision.datasets as datasets
from pathlib import Path


def get_dataloader(data_path: Path, batch_size: int, num_workers: int, transform: callable):
    ...
```
```python
# transforms.py

from torchvision import transforms

def get_transforms(img_size: int):
    """
    Creates a transform pipeline.
    Args:
        img_size (int): The target image size.
    """
    return transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.ToTensor()
    ])
```
### iii. Dependency Injection:
- **Before:** `transforms.py` had a `load_config()` function and used it to get `img_size` itself. It was 
responsible for finding and creating its own dependency
```python
# transforms.py

import yaml
from torchvision import transforms

def load_config(config_path="src/configs/data_config.yaml"):
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)
    
    
data_config = load_config()
img_size = data_config['data']['img_size'] <--- Getting the image size by its self


transform = transforms.Compose([
    transforms.Resize((img_size, img_size)),
    transforms.ToTensor()
])
```
- **After:** `get_transforms(img_size: int)` was created with the dependency (`img_size`) now as an argument.
The responsibility of providing this value was moved up to the orchestrator, `train.py`
```python
# train.py

import yaml
import tqdm
import torch
import mlflow.pytorch
import torch.nn as nn

from src import paths
from PlantVision.data.transforms import get_transforms
from PlantVision.data.loader import get_dataloader
from PlantVision.models.efficientnet.EfficientNet import EfficientNet

def load_config(config_path):
    with open(config_path, "r") as f:
        return yaml.safe_load(f)


def main():
    print("Loading configurations...")
    data_config = load_config(paths.CONFIG_DIR / "data_config.yaml")
    model_config = load_config(paths.CONFIG_DIR / "model_config.yaml")
    train_config = load_config(paths.CONFIG_DIR / "train_config.yaml")

    print("Preparing data...")
    train_transforms = get_transforms(img_size=data_config['data']['img_size']) <--- Here: Dependency Injection
    ...
```
### iv. Explicit is Better than Implicit:
This is about removing ambiguity and "magic" from the project.
- **Before:** An import like `from utils import ...` was implicit, which `utils`? Where is it?
- **After:** An import like `from PlantVision.utils import ...` is explicit. It points out exactly what package the module 
belongs to

These are just a few examples. Many changes were made in order to align the project with these principles

# Conclusion
Applying these changes fixed the errors (`ModuleNotFoundError`, `FileNotFoundError`) I encountered while trying to run the `train.py` script,
permanently.

This reminds me of the very first reason why I decided to learn machine-learning and deeplearning concepts through working on real-world projects. 
As a self-taught machine learning practitioner, I had no clue about these concepts, all I knew was that files needed to be in their
right folders with the source code being in the `src/` folder. I didn't know how to structure and register my project as a 
python package that be recognised by `pip`

I have learnt alot just from a simple `ModuleNotFoundError` error I encountered while trying to run `train.py`. Best practices that have saved me from
pathing errors and potential future bugs, that would have been hard to detect

This blog is also on [Kaggle](https://www.kaggle.com/discussions/general/589305), 