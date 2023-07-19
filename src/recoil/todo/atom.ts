import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';

import { Task } from '@/type/type';

const localStorageEffect: (key: string) => AtomEffect<Task[]> = (
  key: string
) => {
  return ({ onSet }) => {
    if (typeof window !== 'undefined') {
      onSet((newValue: Task[]) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
};

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects: [localStorageEffect('tasks')],
});

export const tasksServer = atom<Task[]>({
  key: 'tasksServer',
  default: [],
});
