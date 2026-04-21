import EventEmitter from "node:events";

export default class TaskManager extends EventEmitter {
    private completedTasks = 0;
    public constructor() {
        super();
    }
    public addTask(...taskName:any[]):void {
        console.log(`Task "${taskName} added to the system"`);

        this.emit('taskAdded', taskName);
    }
    public completeTask(taskName:string):void {
        this.completedTasks++;
        this.emit('taskCompleted', taskName, this.completeTask);
    }
}


