import { DrawerProps } from '@/type/type';

import Drawermenu from './Drawermenu';

const Drawer = ({ isOpen }: DrawerProps) => {
  // Use a hook to manage the modal state

  return (
    <div
      className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} ${
        isOpen ? 'block' : 'hidden'
      }  w-[300px] bg-slate-100`}
    >
      <div className="flex h-12 items-center justify-center bg-slate-50">
        완벽한 Todo App 만들기 프로젝트
      </div>

      <ul className="flex w-full flex-col hover:cursor-pointer">
        {MENU_LIST.map((menu) => {
          return <Drawermenu key={menu.id} menu={menu} />;
        })}
      </ul>
    </div>
  );
};

export type Menu = {
  id: number;
  path?: string;
  title: string;
  children?: Menu[];
};

export const MENU_LIST: Menu[] = [
  { id: 1, path: '/', title: 'Why Todo App?' },
  { id: 2, path: '/BDD', title: 'BDD 개발' },
  { id: 3, path: '/scenario', title: 'Test Scenario' },
  {
    id: 4,
    title: 'Todo List 만들기',
    children: [
      { id: 5, path: '/todo/v1', title: 'Context API를 활용한 상태관리' },
      { id: 6, path: '/todo/v2', title: 'Recoil을 활용한 상태관리' },
      { id: 7, path: '/todo/v3', title: 'REST API를 활용한 Data Fetching' },
      { id: 8, path: '/todo/v4', title: 'React Query를 활용한 Data Fetching' },
    ],
  },
];
export default Drawer;
