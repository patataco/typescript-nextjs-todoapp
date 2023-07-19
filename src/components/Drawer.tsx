import Link from 'next/link';

import { DrawerProps } from '@/type/type';

const Drawer = ({ isOpen }: DrawerProps) => {
  // Use a hook to manage the modal state

  return (
    <div
      className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} ${
        isOpen ? 'block' : 'hidden'
      }  w-[300px] bg-slate-100`}
    >
      <div className="h-12 bg-slate-50" />
      <ul>
        {Outline.map((menu, index) => {
          return (
            <li key={index}>
              <Link href={menu.path}>{menu.title}</Link>
            </li>
          );
        })}
      </ul>
      <ul>
        {MENU_LIST.map((menu, index) => {
          return (
            <li key={index}>
              <Link href={menu.path}>{menu.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type Menu = {
  path: string;
  title: string;
};

const Outline: Menu[] = [
  {
    path: '/',
    title: '완벽한 Todo App 만들기 프로젝트',
  },
  {
    path: '/BDD',
    title: 'BDD 개발',
  },
  {
    path: '/scenario',
    title: 'Test Scenario',
  },
];

const MENU_LIST: Menu[] = [
  {
    path: '/todo/v1',
    title: 'Context API를 활용한 상태관리',
  },
  {
    path: '/todo/v2',
    title: 'Recoil을 활용한 상태관리',
  },
  {
    path: '/todo/v3',
    title: 'REST API를 활용한 Data Fetching',
  },
];
export default Drawer;
