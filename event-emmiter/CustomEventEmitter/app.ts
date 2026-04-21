import CustomEventEmitter from "./CustomEventEmitter.js";

const service = new CustomEventEmitter();

service
    .on("start", (user) => {
        console.log(`Service started for ${user}.`);
    })
    .on("dataLoaded", (dataCount) => {
        console.log(`Loaded ${dataCount} records.`);
    });

service.emit("start", "Admin");
service.emit("dataLoaded", 42);
