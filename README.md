![chronos](https://raw.githubusercontent.com/sust4in/chronos/master/chronos.png)

## Chronos - Task Scheduler

Chronos is a simple task scheduler library for Deno that allows you to schedule
and run tasks at specific intervals or times.

## Usage

Here's an example of how to use the Chronos Task Scheduler:

```typescript
import {
  createTask,
  IntervalScheduler,
  Task,
} from "https://deno.land/x/chronos@v0.1.0/src/mod.ts";

// Define a task action
const taskAction = async () => {
  console.log("Task executed:", new Date());
};

// Create a task to be executed in 5 seconds
const dueTime = new Date(Date.now() + 5000);
const task = createTask("exampleTask", taskAction, dueTime, 1000);

// Create an IntervalScheduler instance
const scheduler = new IntervalScheduler();

// Schedule the task
scheduler.schedule(task);

// You can unschedule the task if necessary
scheduler.unschedule(task.id);
```
