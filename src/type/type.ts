export type TaskStatus =
  | 'notStarted'
  | 'inProgress'
  | 'completed'
  | 'waitingOnOthers'
  | 'deferred';

export interface Task {
  id: string;
  title: string;
  content: string | null;
  categories?: string[];
  status: TaskStatus;
  startDateTime: Date | null;
  dueDateTime: Date | null;
  createdDateTime: Date;
  lastModifiedDateTime: Date;
}

export interface DrawerProps {
  isOpen: boolean;
}

export interface NavProps {
  onClick: () => void;
}
