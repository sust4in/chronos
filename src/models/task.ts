// src/models/task.ts

export class Task {
    constructor(
      public id: string,
      public name: string,
      public action: () => void,
      public dueTime: Date,
      public interval?: number, // Add this line
    ) {}
  
  
    async execute(): Promise<void> {
      await this.action();
    }
  }
  
  export function createTask(
    id: string,
    execute: () => Promise<void> | void,
    dueTime: Date,
    interval?: number, // Add this line
  ): Task {
    return new Task(id, id, execute, dueTime, interval); // Update this line
  }