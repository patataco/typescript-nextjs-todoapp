import { PropsWithChildren, useState } from 'react';

import Drawer from './Drawer';
import Nav from './Nav';

const Layout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleMenuOpen = () => {
    const view = isOpen ? false : true;
    setIsOpen(view);
  };
  return (
    <>
      <div className="flex h-screen">
        <Drawer isOpen={isOpen} />
        <div className="flex h-full grow flex-col">
          <Nav onClick={handleMenuOpen} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
