

const initialize = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasksInStorage = localStorage.get('tasks');

if (tasksInStorage) {
  const newTasks: Task[] = JSON.parse(tasksInStorage);
}
