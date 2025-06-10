---
title: "Just-In-Time Learning Framework (Project-Driven Learning)"
date: "2025-06-10"
excerpt: "My new framework for learning concepts and working on projects"
coverImage: "/assets/blog_assets/just_in_time_learning.jpg"
tags: ["Articles", "Projects"]
readingTime: 10
---
# Introduction

As you may or may not know, I have literally taught myself everything I know about machine learning, deeplearning and data science in general, but this comes with a heavy price to pay. 
First of all these are rapidly evolving fields, and tend to be very hard to learn due to the complex math and programming skills involved. Not to mention, these fields are at the intersection of **statistics**, **computer science** and **software engineering**, which most definitly requires one to know something in each of these fields.

For someone like me who is self-teaching myself, things really get overwhelming and out of control atimes, but just like everything else in life, with a little bit of work, persistance and discipline, things get really managable and fun. Imagine training a computer to understand and think "like a human", now that's something worth the struggle

However, as someone who is learning these things on my own l realized that the way l have been learning these concepts has really been wrong though, otherwise l wouldn't have written this blog. I have been a passive learner most of the time, trying to understand everything first before l do anything, and it turns out I have been stack in a **tutorial hell** for the most part and I almost have nothing, no proof for the knowledge l gained from these tutorials--for all the 2 years l have been learning. Trust me it takes a lot of grace to understand that this is actually a problem.

This has forced me to create a framework of how l will be learning. I call it **JUST-IN-TIME LEARNING**

# How the Just-In-Time Learning framework works
It is a project based learning framework which prioritises **acquiring knowledge about something just to solve the problem at hand**. 

Here's what this means, previously I had to first learn something (almost upto intermediate level) before l could even apply the knowledge (the craziest part is that l always felt like l did't know much after all the effort). I could watch hours of tutorials, read books about the concept, technology, language, page-by-page trying to understand something. But now l know, this is a completely wrong way to learn.

But for this new framework the approach is very different, I create a goal (a project), start working on it and then acquire relevant knowledge during the process of working on it.

Here's why this approach works
- It keeps you motivated, you have an end goal, not just reading through pages aimlessly
- You learn to solve real errors, which enforces knowledge
- It provides evidance for your knowledge (not just talking about what you know)
- Its fun, reading programming books actually gets boring


And another unique thing about this framework, it doesn't just end at solving the problem and aquiring the knowledge, the learnt concepts and projects have to be well documented, through documentations, blog posts, and youtube videos. The reason behind this is that my work needs to be put out there for the world to see, not just being hidden gems, ready to be discovered. This will create living proof of my knowledge and skills, it also reinforces it too and creates a digital potifolio for my work which can potentially open doors to new opportunities

# Breakdown of the framework
The Just-In-Time Learning framework is broken down into three phases

## 1). 🔍Deconstruction Phase (The 'What' & 'Why')
**🎯The Goal** of this phase is to take a large, intimidating concept and break it down into a single, concrete, achievable first step. This is done before watching any tutorial.

What **triggers** this phase is when l hit a requirement in a project. (e.g., I need to track my experiments for the maching learning model)

### ⚡The Deconstruction Ritual (15-Minute Task)
1️⃣ **Identify the Core Concept:** (e.g., Training a neural network)

2️⃣ **Define the 'Job To Be Done' (JTBD):** (e.g., What's the single, specific job I need this concept to do for me right now? Be brutally specific.) 

For example, instead saying "Learn Pytorch"❌ say, "Use Pytorch to train an MLP for 10 epochs"✅

3️⃣ **Find the 'Hello World' example:** Google a tool's *hello world* example (e.g., Pytorch hello world, or Pytorch quickstart)

Find the absolute simplest, minimal, code example that achieves something close to my JTBD.

4️⃣ **Formulate Questions:** I create a new markdown file in my project called LEARNING_LOG.md. Write down 3-5 *dumb* questions based on the "Hello World" code.

❓What is a training loop?, what does *.backward()* do?

❓How do l know that the model is learning?

**📋The Output:** A clearly defined, small task, a "Hello World" code snippet to start from, and a set of questions for active learning.

## 2). ⚔️The Crucible Phase (The 'How')
**🎯The Goal** of this phase is to achieve a deep, practical understanding of the concept through rapid, focused, hands-on cycles. This is where l enter my scheduled *Learn-Then-Build* block.

### **🔄 The Crucible Cycle (A 60-Minute Block)**

This cycle is designed to be repeated.

1. **⌨️ 30 Min Code-First Sprint**
    - **Action:** Get the "Hello World" code running, type it out. See it work.
    - **Now, break it on purpose.** Change a line. Remove something. See the error message.
    - **Fix it.**
    - **Tweak it.** I try to make it do one tiny thing closer to my project's need.
    - **This creates a hands-on dialogue with the code, building intuition.**
2. **📚15-Min Theory Sprint:**
    - **Action:** *Now* I watch the tutorial or read the docs, but this time I'am not watching passively. I am actively hunting for the answers to the questions l wrote down in the **Deconstruction phase**.
    - This creates deeper intuition, "Ah, *that's* why my code broke!", connecting theory directly to my recent, tangible experience.

3. **📝15-Min Documentation Sprint (The Logbook):**
    - **Action:** Go back to my LEARNING_LOG.md.
    - **Explain the concept in my own words.** Use the [Feynman Technique](https://fs.blog/feynman-technique/), write it out as if l am explaining it to a junior colleague.
    - **Paste my working, minimal code snippet.** Not the one from the tutorial, *my* version that l tweaked.
    - **Answer my own "dumb" questions from the Deconstruction phase.**

**📋The Output:** A new entry in my personal "Logbook" that proves l understand the concept, and a working, minimal example that l built myself.

## 3). **🎯Synthesis Phase (The 'Proof')**

**🎯The Goal** Of this phase is to weld the newly forged knowledge into my project, creating permanent value and undeniable proof of skill.

What **triggers** this phase is the successful run of the Crucible Cycle. l understand the basics. Now l make it real.

### **🔨 The Synthesis Ritual:**

1. **💻 The Application:** Go back to my main project code. Integrate the concept to solve the original "Job To Be Done." I can then use my minimal working example from the **Crucible** as my guide.
2. **📝 The Commit as Proof:** When l commit my code to GitHub, l have to write a professional, detailed commit message. This is a micro-document of my learning.

    - *❌ Bad:* git commit -m "added mlflow"
    - *✅ Good:* git commit -m "feat: Integrate MLflow for experiment tracking"
        
        WHY: To systematically log and compare model performance across different hyperparameters.
        
        HOW: Used mlflow.autolog() for PyTorch to automatically capture metrics and parameters. Configured tracking URI to save artifacts in a local 'mlruns' directory.    

**🏆 The Output:** A working, valuable feature in my main project, a permanent record of my competence in my Git history, and a piece of content that proves my mastery to the world. 

I then document the whole process through either writing a blog explaining what l learnt, creating a youtube tutorial implementing what l learnt.

# Conlusion
Well there's alot to unpack here, but this is a system that can be tailored to one's needs or problem at hand. Notice something, the framework is really specific with plenty of examples. This makes it easy for me or anyone to implement right away following the same phases and steps.

This is a system l have created for myself to provide a system to which l approach and learn different topics and concepts. I can't promise that its the holy grail to understanding each and everything, and probably can't promise that it will work for everyone, but its worth giving a try.

This blog is also on [medium](https://medium.com/@muhumuzadeus.ai/just-in-time-learning-framework-project-driven-learning-ed3ade10d2de)