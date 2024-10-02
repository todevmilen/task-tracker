import * as fs from 'fs';

const args = process.argv;

enum EOptions {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
  INPROGESS = 'mark-in-progress',
  DONE = 'mark-done',
  LIST = 'list',
}

interface Task {
  id: number;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
  updatedAt?: Date;
}

const option = args[2] as EOptions;

const handleAdd = (task: string): void => {
  const tasks: Task[] = handleListTasks(false);

  const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;

  const newTask: Task = {
    id: maxId + 1,
    description: task,
    status: 'TODO',
    createdAt: new Date(),
  };

  tasks.push(newTask);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

const handleUpdate = (id: number, taskDescription: string): void => {
  const tasks: Task[] = handleListTasks(false);

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

const handleDelete = (id: number): void => {
  const tasks: Task[] = handleListTasks(false);

  const newTasks = tasks.filter(task => task.id !== id);

  fs.writeFileSync('tasks.json', JSON.stringify(newTasks, null, 2));
};

const handleListTasks = (shouldLog: boolean): Task[] => {
  try {
    const tasks = fs.readFileSync('tasks.json', 'utf8');
    if (shouldLog) {
      console.log(tasks);
    }
    return JSON.parse(tasks);
  } catch (error: any) {
    const nodeErr: NodeJS.ErrnoException = error;
    if (nodeErr.code === 'ENOENT') {
      console.log('File not found. Creating a new one.');
      fs.writeFileSync('tasks.json', '');
      return [];
    } else {
      throw error;
    }
  }
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
