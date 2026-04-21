import EventEmitter from "node:events";
export default class TaskManager extends EventEmitter {
    private completedTasks;
    constructor();
    addTask(...taskName: any[]): void;
    completeTask(taskName: string): void;
}
//# sourceMappingURL=task-manager.d.ts.map