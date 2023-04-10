import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { delay } from "https://deno.land/std/async/delay.ts";
import { CronScheduler } from "../../src/scheduler/cron_scheduler.ts";
import { Scheduler } from "../../src/scheduler/scheduler.ts";

import { Task } from "../../src/models/task.ts";

class TestScheduler extends Scheduler {
  schedule(task: Task) {
    // Implement or mock the scheduling logic
  }

  unschedule(taskId: string) {
    // Implement or mock the unscheduling logic
  }
  async start(): Promise<void> {
    const tasks = this.getTaskQueue().getTasks();
    for (const task of tasks) {
      await this.executeTask(task);
    }
  }

  protected async executeTask(task: Task): Promise<void> {
    try {
      await task.action();
      console.log(`Task '${task.name}' executed successfully.`);
    } catch (error) {
      console.error(`Error executing task '${task.name}':`, error);
    }
  }

  addTask(task: Task): void {
    this.getTaskQueue().addTask(task);
    this.executeTask(task);
  }
}

Deno.test("Scheduler: should create a new scheduler instance", () => {
  const scheduler = new TestScheduler();

  assertEquals(
    scheduler instanceof TestScheduler,
    true,
    "Scheduler instance should be created",
  );
});

Deno.test("Scheduler should run a task", async () => {
  const scheduler = new CronScheduler();
  const task = new Task("test", "test", () => {
    console.log("Task executed");
  }, new Date(Date.now() + 1000));
  scheduler.addTask(task);
  await delay(1500);
  assertEquals(scheduler.getTaskQueue().getTasks().length, 1);
});
