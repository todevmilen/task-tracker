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

type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt?: Date;
}

const option = args[2] as EOptions;

const handleAdd = (task: string): void => {
  const tasks: Task[] = handleListTasks(false);

  const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
  const ID = maxId + 1;

  const newTask: Task = {
    id: ID,
    description: task,
    status: 'TODO',
    createdAt: new Date(),
  };

  tasks.push(newTask);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  console.log(`Task added successfully (ID: ${ID})`);
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

const handleListTasks = (shouldLog: boolean, status?: Status): Task[] => {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    const tasks: Task[] = JSON.parse(data);
    if (shouldLog) {
      if (status) {
        console.log(
          tasks.filter(
            task => task.status === status.replace('-', '_').toUpperCase()
          )
        );
        return [];
      }
      console.log(tasks);
    }
    return tasks;
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

const handleUpdateStatus = (id: number, status: Status) => {
  const tasks: Task[] = handleListTasks(false);

  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      return {
        ...task,
        status: status,
      };
    }
    return task;
  });

  fs.writeFileSync('tasks.json', JSON.stringify(updatedTasks, null, 2));
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
    handleListTasks(true, args[3] as Status);
    break;
  case EOptions.DONE:
    handleUpdateStatus(parseInt(args[3]), 'DONE');
    break;
  case EOptions.INPROGESS:
    handleUpdateStatus(parseInt(args[3]), 'IN_PROGRESS');
    break;
  default:
    console.log(
      `Cannot find a flag: ${option}\nPlease use one of the following:`
    );
    for (const [key, value] of Object.entries(EOptions)) {
      console.log(`==> ${value}`);
    }
    break;
}
