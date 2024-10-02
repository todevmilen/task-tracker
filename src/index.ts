const args = process.argv;

enum EOptions {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
  INPROGESS = 'mark-in-progress',
  DONE = 'mark-done',
  LIST = 'list',
}

const option = args[2] as EOptions;

const handleAdd = (task: string) => {
  console.log(task);
};

const handleUpdate = (id: number, task: string) => {
  console.log('id', id, 'task', task);
};

const handleDelete = (id: number) => {
  console.log('DELETE', id);
};

const handleListTasks = () => {
  console.log('LIST ALL TASKS');
};

const handleDone = (id: number) => {
  console.log('DONE', id);
};

const handleInProgress = (id: number) => {
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
    handleListTasks();
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
