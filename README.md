# Chronos Task Scheduler

A simple task scheduler library for Deno.

## Usage

Here's an example of how to use the Chronos Task Scheduler:

```typescript
import { Task, createTask, CronScheduler } from "https://path.to/chronos/src/mod.ts";

// Define a task action
const taskAction = async () => {
  console.log("Task executed:", new Date());
};

// Create a task to be executed in 5 seconds
const dueTime = new Date(Date.now() + 5000);
const task = createTask("exampleTask", taskAction, dueTime);

// Create a CronScheduler instance
const scheduler = new CronScheduler();

// Schedule the task
scheduler.schedule(task);

// You can unschedule the task if necessary
scheduler.unschedule(task.id);
