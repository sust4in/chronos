import { Scheduler } from "./scheduler.ts";
import { Task } from "../models/task.ts";

export class IntervalScheduler extends Scheduler {
  private intervals: { [id: string]: number } = {};

  async start(): Promise<void> {
    for (const task of this.taskQueue.getTasks()) {
      this.schedule(task);
    }
  }

  schedule(task: Task) {
    const interval = task.dueTime.getTime() - Date.now();

    if (interval <= 0) {
      throw new Error("Invalid interval");
    }

    const intervalId = setTimeout(async () => {
      await this.executeTask(task);
      if (task.interval) {
        this.intervals[task.id] = setInterval(async () => {
          await this.executeTask(task);
        }, task.interval);
      } else {
        this.unschedule(task.id);
      }
    }, interval);

    this.intervals[task.id] = intervalId;
  }

  unschedule(taskId: string) {
    if (this.intervals[taskId]) {
      clearInterval(this.intervals[taskId]);
      delete this.intervals[taskId];
    }
  }
}
