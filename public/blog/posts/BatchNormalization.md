---
title: "Batch Normalization Crush Course"
date: "2024-12-29"
excerpt: "Understanding the batch normalization alogrithm, and its impact on model performance"
coverImage: "/assets/blog_assets/batch_norm.jpg"
tags: ["Deep Learning", "Mathematics", "Neural Networks", "Algorithms", "Statistics"]
readingTime: 10
---


As I began my journey into deep learning, one of the algorithms that stood out most to me was **Batch Normalization**.  The main reason why was because its simple to understand (as it relies on basic statistical concepts) and tries to solve some of the most common problems deep neural networks face  like **Internal Covariate shifts** (changes in the distribution of activations), **Vanishing & Exploding gradients**.

It also removes the need for manual normalization of training data, and can also introduce some sort of **regularization** (reducing overfitting).

So what is **Batch Normalization** anyway. It is a technique that **normalizes**, **shifts** and **scales activations** of a layer during training. This happens for each batch of input data, with the help of  **layer**s --batch normalization layers placed between **hidden layers** of a neural network.

This is what happens in a BN layer for each batch of data.

1. Computation of the mean for each feature in the input batch
   $$
   \mu_B = \frac{1}{m_B}\sum_{i=1}^{m_B}x^{(i)}
   $$



2. Computation of the variance for each feature in the input batch
   $$
   \sigma_B^2 = \frac{1}{m_B}\sum_{i=1}^{m_B}(x^{(i)} - \mu_B)^2
   $$
   
3. Normalization of the activations
   $$
   \hat{x}^{(i)} = \frac{x^{(i)} - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}
   $$
   
   
   

   Note:  $\epsilon$ is a very small floating number added to prevent a division by zero

4. Scaling and shifting the normalized activations
   $$
   z^{(i)} = \gamma\otimes\hat{x}^{(i)} + \beta
   $$
   where:

   $\gamma$ is the **scale parameter** vector (contains one scale value per input feature)

   $\beta$ is the **shift parameter** vector (contains one scale value per input feature)

   Note: the model learns these parameters through **back propagation** during the training phase $\gamma$ and $\beta$

   ![my mathematical implementation of batch normalization](/assets/blog_assets/image_assets/bn_asset_1.jpg)

## What Happens During the Inference Phase 

During inference, the model replaces the statistics (mean and variance) with the **running averages** of mean and variance computed during training. The term running average intuitively is like a memory that keeps track of the value of mean and variance over time. So instead of looking only at the current batch of data, running averages combine the past batch statistics with the current batch to give a smoother, more reliable estimate. Each BN layer has its own running averages.
$$
\mu_{running} = \alpha\mu_{running} + (1 - \alpha)\mu_B
$$

$$
\sigma^2_{running} = \alpha\sigma^2_{running} + (1 - \alpha)\sigma^2_B
$$

Where:

 $\alpha$ is the momentum or smoothing factor which determines how much weight is given to the old running average versus the current batch's statistic when updating the running average. It is normally set to 0.9, 0.99, or 0.999


| Aspect | Normalization | Batch Normalization |
|----------|---------|----------|
| Purpose | Scale inputs/features to a fixed range or std/mean | Stabilize activations during training |
| Application | Preprocessing step | Applied to activations in the model |
| Trainable Parameters | No | Yes (scale and shift learned during training) |

| Aspect | Standardization | Batch Normalization |
|----------|---------|----------|
| Purpose | Preprocess input features to a standard scale | Stabilize and normalize activations dynamically |
| Scope | Entire dataset | Mini-batches during training |
| Trainable Parameters | No | Yes (scale and shift learned during training) |
| Dynamic/Static | Static (calculated once) | Dynamic (varies by batch during training) |
| Application | Input features | Intermediate layer activations |
| Inference Behavior | No changes during inference | Uses moving averages of batch statistics |

## Model Performance without And with Batch Normalization

**TASK**: Regression


**DATASET**: California Housing Dataset

```python
# Without Batch Normalization
import keras

model_1 = keras.Sequential([
    keras.Input(shape=[8,]),

    keras.layers.Dense(units=300, activation='relu'),
    keras.layers.Dense(units=256, activation='relu'),
    keras.layers.Dense(units=128, activation='relu'),
    keras.layers.Dense(units=100, activation='relu'),
    keras.layers.Dense(units=500, activation='relu'),
    keras.layers.Dense(units=100, activation='relu'),
    
    keras.layers.Dense(units=1),
    
])

tf_callback = keras.callbacks.TensorBoard(log_dir='./regression_logs/exp_no_bn')

model_1.compile(optimizer='sgd',
               loss='mse',
               metrics=['mse'])

model_1.fit(X, y, epochs=30, callbacks=tf_callback, validation_split=0.2)
```

   ![metrics (mse) of a model without batch normalization layers](/assets/blog_assets/image_assets/bn_asset_4.png)

```python
# With Batch Normalization
import keras

model_2 = keras.Sequential([
    keras.Input(shape=[8,]),

    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=300, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=256, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=128, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=100, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=500, activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.Dense(units=100, activation='relu'),
    
    keras.layers.Dense(units=1),
    
])

tf_callback = keras.callbacks.TensorBoard(log_dir='./regression_logs/exp_with_bn')

model_1.compile(optimizer='sgd',
               loss='mse',
               metrics=['mse'])

model_1.fit(X, y, epochs=30, callbacks=tf_callback, validation_split=0.2)
```

   ![metrics (mse) of a model with batch normalization layers](/assets/blog_assets/image_assets/bn_asset_2.png)


## CONCLUSION:

The Regression Model with Batch Normalization layers had a much lower error during training (red line), and on the validation set (light blue line) and learns faster compared to the model without any BN layers (orange for training dark blue for validation sets). Hence Batch Normalization increases model performance
   ![metrics (mse) of a model without vs model with batch normalization layes ](/assets/blog_assets/image_assets/bn_asset_3.png)




