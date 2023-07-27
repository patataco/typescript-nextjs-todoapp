import Link from 'next/link';

import { Menu } from './Drawer';

const Drawermenu = ({ menu }: { menu: Menu }) => {
  return (
    <>
      {menu.path ? (
        <Link href={menu.path}>
          <li
            className="w-full list-inside list-disc p-3 hover:bg-gray-300"
            key={menu.id}
          >
            {menu.title}
          </li>
        </Link>
      ) : (
        <li
          className="w-full list-inside list-disc p-3 hover:bg-gray-300"
          key={menu.id}
        >
          {menu.title}
        </li>
      )}

      {menu.children && (
        <ul className="flex flex-col">
          {menu.children.map((child) => {
            if (child.path) {
              return (
                <Link href={child.path} key={child.id}>
                  <li className="list-inside list-[square] py-2 pl-8 text-sm hover:bg-gray-300">
                    {child.title}
                  </li>
                </Link>
              );
            }
            return null;
          })}
        </ul>
      )}
    </>
  );
};

export default Drawermenu;
