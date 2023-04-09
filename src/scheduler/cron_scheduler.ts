import { Scheduler } from "./scheduler.ts";
import { Task } from "../models/task.ts";

type CronField = {
    minValue: number;
    maxValue: number;
    values: Set<number>;
  };

function getNextOccurrence(fields: CronField[]): Date | null {
    const now = new Date();
    let nextDate = new Date(now.getTime());
  
    while (true) {
      // Increment the minute
      nextDate.setUTCMinutes(nextDate.getUTCMinutes() + 1);
  
      // Check if the new date matches all cron fields
      let match = true;
      for (let i = 0; i < 5 && match; i++) {
        const value = [
          nextDate.getUTCMinutes(),
          nextDate.getUTCHours(),
          nextDate.getUTCDate(),
          nextDate.getUTCMonth() + 1,
          nextDate.getUTCDay(),
        ][i];
  
        match = fields[i].values.has(value);
      }
  
      if (match) {
        return nextDate;
      }
  
      // Limit the search to avoid infinite loops
      if (nextDate.getTime() - now.getTime() > 365 * 24 * 60 * 60 * 1000) {
        return null;
      }
    }
}
function parseCronField(fieldStr: string, field: CronField): boolean {
    // Handle wildcards
    if (fieldStr === "*") {
      for (let i = field.minValue; i <= field.maxValue; i++) {
        field.values.add(i);
      }
      return true;
    }
  
    // Handle lists (e.g., "1,3,5")
    const listParts = fieldStr.split(",");
    for (const part of listParts) {
      // Handle ranges (e.g., "1-5")
      const rangeParts = part.split("-");
      if (rangeParts.length > 2) {
        return false;
      }
  
      let minValue = parseInt(rangeParts[0], 10);
      let maxValue = rangeParts.length === 2 ? parseInt(rangeParts[1], 10) : minValue;
  
      if (isNaN(minValue) || isNaN(maxValue) || minValue < field.minValue || maxValue > field.maxValue) {
        return false;
      }
  
      // Handle steps (e.g., "1-5/2")
      const stepParts = maxValue === minValue ? [minValue.toString()] : rangeParts[1].split("/");
      if (stepParts.length > 2) {
        return false;
      }
  
      maxValue = parseInt(stepParts[0], 10);
      const step = stepParts.length === 2 ? parseInt(stepParts[1], 10) : 1;
  
  if (isNaN(step) || step < 1) {
    return false;
  }
  
  for (let i = minValue; i <= maxValue; i += step) {
    field.values.add(i);
  }
    }
  
    return true;
}
export class CronScheduler extends Scheduler {
    private cronJobs: { [id: string]: number } = {};
  
    async start(): Promise<void> {
      const tasks = this.getTaskQueue().getTasks();
      tasks.forEach((task) => {
        this.schedule(task);
      });
    }
  
    protected async executeTask(task: Task): Promise<void> {
      try {
        await task.action();
      } catch (error) {
        console.error(`Error executing task ${task.id}:`, error);
      }
    }
  
    schedule(task: Task) {
      const dueTime = task.dueTime;
      const now = new Date();
  
      if (dueTime <= now) {
        throw new Error("Task due time should be in the future");
      }
  
      const interval = dueTime.getTime() - now.getTime();
  
      const intervalId = setTimeout(() => {
        this.executeTask(task);
        this.unschedule(task.id);
      }, interval);
  
      this.cronJobs[task.id] = intervalId;
    }
  
    unschedule(taskId: string) {
      if (this.cronJobs[taskId]) {
        clearTimeout(this.cronJobs[taskId]);
        delete this.cronJobs[taskId];
      }
    }
  }