// src/scheduler/scheduler.ts
import { Task } from "../models/task.ts";
import { TaskQueue } from "../models/task_queue.ts";

export abstract class Scheduler {
  protected taskQueue: TaskQueue = new TaskQueue();

  addTask(task: Task) {
    this.taskQueue.addTask(task);
  }

  getTaskQueue(): TaskQueue {
    return this.taskQueue;
  }

  abstract start(): Promise<void>;

  protected async executeTask(task: Task): Promise<void> {
    await task.execute();
  }
}