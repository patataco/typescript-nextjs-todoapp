import Image from 'next/image';

import { NavProps } from '@/type/type';

const Nav = ({ onClick }: NavProps) => {
  return (
    <div className="h-12 bg-slate-100">
      <div className="mx-auto flex h-12 items-center justify-between px-4">
        <div>
          <button className="appearance-none border-none" onClick={onClick}>
            <Image alt="menu" src="/menusvg.svg" width={16} height={16} />
          </button>
        </div>
        <div>title</div>
        <div>
          <button>git</button>
          <button>blog</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
