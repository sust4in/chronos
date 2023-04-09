// tests/scheduler/interval_scheduler.test.ts

import {
    assertEquals,
    assertThrows,
  } from "https://deno.land/std@0.182.0/testing/asserts.ts";
  import { IntervalScheduler } from "../../src/scheduler/interval_scheduler.ts";
  import { Task } from "../../src/models/task.ts";
  
  Deno.test("IntervalScheduler: should schedule a task with a valid interval", async () => {
    const scheduler = new IntervalScheduler();
    const task = new Task("test", "test", () => {}, new Date(Date.now() + 1000));
  
    scheduler.schedule(task);
  
    // Test if the task is scheduled and running
    // You can add more assertions or checks based on your implementation
  
    // Cleanup
    scheduler.unschedule(task.id);
  });
  
  Deno.test("IntervalScheduler: should throw an error for an invalid interval", () => {
    const scheduler = new IntervalScheduler();
    const task = new Task("test", "test", () => {}, new Date(Date.now() - 1000));
  
    assertThrows(
      () => {
        scheduler.schedule(task);
      },
      Error,
      "Invalid interval" // Update the expected error message here
    );
  });
  Deno.test("IntervalScheduler: should schedule and run a task with a valid interval", async () => {
    const scheduler = new IntervalScheduler();
    let counter = 0;
    const task = new Task("test", "test", () => {
      console.log("1")
      counter++;
    }, new Date(Date.now() + 1000), 1000); // Add interval parameter here
  
    scheduler.schedule(task);
  
    await new Promise((resolve) => setTimeout(resolve, 3500));
    assertEquals(counter, 3);
  
    // Cleanup
    scheduler.unschedule(task.id);
  });
  Deno.test("IntervalScheduler: should unschedule a task", () => {
    const scheduler = new IntervalScheduler();
    const task = new Task("test", "test", () => {}, new Date(Date.now() + 1000));
  
    scheduler.schedule(task);
    scheduler.unschedule(task.id);
  
    // Test if the task is unscheduled and not running
    // You can add more assertions or checks based on your implementation
  });