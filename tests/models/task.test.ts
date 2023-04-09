import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { Task } from "../../src/models/task.ts";

Deno.test("Task should be initialized correctly", () => {
    const task = new Task("test", "test", () => {}, new Date("2023-01-01T00:00:00Z"));
    assertEquals(task.id, "test");
    assertEquals(task.name, "test");
    assertEquals(task.dueTime, new Date("2023-01-01T00:00:00Z"));
  });