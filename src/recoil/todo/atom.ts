import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';

import { Task } from '@/type/type';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem('tasks');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue: Task[]) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: [],
  effects: [localStorageEffect('tasks')],
});
