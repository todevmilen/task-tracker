"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const args = process.argv;
var EOptions;
(function (EOptions) {
    EOptions["ADD"] = "add";
    EOptions["UPDATE"] = "update";
    EOptions["DELETE"] = "delete";
    EOptions["INPROGESS"] = "mark-in-progress";
    EOptions["DONE"] = "mark-done";
    EOptions["LIST"] = "list";
})(EOptions || (EOptions = {}));
const option = args[2];
const handleAdd = (task) => {
    const tasks = handleListTasks(false);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
    const newTask = {
        id: maxId + 1,
        description: task,
        status: 'TODO',
        createdAt: new Date(),
    };
    tasks.push(newTask);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};
const handleUpdate = (id, taskDescription) => {
    const tasks = handleListTasks(false);
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                description: taskDescription,
            };
        }
        return task;
    });
    fs.writeFileSync('tasks.json', JSON.stringify(updatedTasks, null, 2));
};
const handleDelete = (id) => {
    const tasks = handleListTasks(false);
    const newTasks = tasks.filter(task => task.id !== id);
    fs.writeFileSync('tasks.json', JSON.stringify(newTasks, null, 2));
};
const handleListTasks = (shouldLog) => {
    try {
        const tasks = fs.readFileSync('tasks.json', 'utf8');
        if (shouldLog) {
            console.log(tasks);
        }
        return JSON.parse(tasks);
    }
    catch (error) {
        const nodeErr = error;
        if (nodeErr.code === 'ENOENT') {
            console.log('File not found. Creating a new one.');
            fs.writeFileSync('tasks.json', '');
            return [];
        }
        else {
            throw error;
        }
    }
};
const handleDone = (id) => {
    console.log('DONE', id);
};
const handleInProgress = (id) => {
    console.log('INPROGRESS', id);
};
switch (option) {
    case EOptions.ADD:
        handleAdd(args[3]);
        break;
    case EOptions.UPDATE:
        handleUpdate(parseInt(args[3]), args[4]);
        break;
    case EOptions.DELETE:
        handleDelete(parseInt(args[3]));
        break;
    case EOptions.LIST:
        handleListTasks(true);
        break;
    case EOptions.DONE:
        handleDone(parseInt(args[3]));
        break;
    case EOptions.INPROGESS:
        handleInProgress(parseInt(args[3]));
        break;
    default:
        break;
}
//# sourceMappingURL=index.js.map