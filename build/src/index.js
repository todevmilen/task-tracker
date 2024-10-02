"use strict";
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
    console.log(task);
};
const handleUpdate = (id, task) => {
    console.log('id', id, 'task', task);
};
switch (option) {
    case EOptions.ADD:
        handleAdd(args[3]);
        break;
    case EOptions.UPDATE:
        handleUpdate(parseInt(args[3]), args[4]);
        break;
    default:
        break;
}
//# sourceMappingURL=index.js.map