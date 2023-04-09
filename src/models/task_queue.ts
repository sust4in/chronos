import { Task } from "./task.ts";

export class TaskQueue {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasks.sort((a, b) => a.dueTime.getTime() - b.dueTime.getTime());
  }
  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getNextTask(): Task | undefined {
    return this.tasks.shift();
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  isEmpty(): boolean {
    return this.tasks.length === 0;
  }
}