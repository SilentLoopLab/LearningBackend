import TaskManager from "./task-manager.js";
const manager = new TaskManager();

manager.on("taskAdded", (name: any) => {
    console.log(`NEW: Task "${name}" is now pending.`);
});

manager.on("taskCompleted", (name: any[], total: number) => {
    console.log(`DONE: Task "${name}" finished. Total completed: ${total}.`);

    if (total === 3) {
        console.log("--- Milestone Achieved: Three tasks finished! ---");
    }
});

manager.addTask("Setup Database");
manager.addTask("Write API Endpoint");
manager.addTask("Design UI Mockups");

manager.completeTask("Setup Database");
manager.completeTask("Write API Endpoint");
manager.completeTask("Design UI Mockups");
