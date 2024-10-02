declare const args: string[];
declare enum EOptions {
    ADD = "add",
    UPDATE = "update",
    DELETE = "delete",
    INPROGESS = "mark-in-progress",
    DONE = "mark-done",
    LIST = "list"
}
declare const option: EOptions;
declare const handleAdd: (task: string) => void;
declare const handleUpdate: (id: number, task: string) => void;
