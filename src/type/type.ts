interface Task {
  id: string;
  title: string;
  content?: string;
  categories?: string[];
  status: Status;
  startDateTime?: Date;
  dueDateTime?: Date;
  createdDateTime?: Date;
  lastModifiedDateTime?: Date;
}

type Status =
  | 'notStarted'
  | 'inProgress'
  | 'completed'
  | 'waitingOnOthers'
  | 'deferred';
