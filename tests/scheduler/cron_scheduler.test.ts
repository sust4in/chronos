import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { CronScheduler } from "../../src/scheduler/cron_scheduler.ts";
import { Task } from "../../src/models/task.ts";

Deno.test("CronScheduler: should schedule a task with a valid due time", async () => {
  const scheduler = new CronScheduler();
  const task = new Task("test", "test", () => {}, new Date(Date.now() + 1000));

  scheduler.schedule(task);

  // Test if the task is scheduled and running
  // You can add more assertions or checks based on your implementation

  // Cleanup
  scheduler.unschedule(task.id);
});

Deno.test("CronScheduler: should throw an error for an invalid due time", () => {
  const scheduler = new CronScheduler();
  const task = new Task("test", "test", () => {}, new Date(Date.now() - 1000));

  assertThrows(
    () => {
      scheduler.schedule(task);
    },
    Error,
    "Task due time should be in the future",
  );
});

Deno.test("CronScheduler: should unschedule a task", () => {
  const scheduler = new CronScheduler();
  const task = new Task("test", "test", () => {}, new Date(Date.now() + 1000));

  scheduler.schedule(task);
  scheduler.unschedule(task.id);

  // Test if the task is unscheduled and not running
  // You can add more assertions or checks based on your implementation
});
