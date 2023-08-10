export type TaskStatus =
  | 'notStarted'
  | 'inProgress'
  | 'completed'
  | 'waitingOnOthers'
  | 'deferred';

export interface Task {
  id: string | null;
  title: string;
  content: string | null;
  categories?: string[];
  status: TaskStatus;
  startDateTime: Date | null;
  dueDateTime: Date | null;
  createdDateTime: Date;
  lastModifiedDateTime: Date;
  clientId: string;
}

export interface DrawerProps {
  isOpen: boolean;
}

export interface NavProps {
  onClick: () => void;
}

export type TaskWithoutId = Omit<Task, 'id'>;
