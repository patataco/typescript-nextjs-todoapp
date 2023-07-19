import { PropsWithChildren, useState } from 'react';

import Drawer from './Drawer';
import Nav from './Nav';

const Layout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="flex w-screen">
        <Drawer isOpen={isOpen} />
        <div className="flex-1">
          <Nav onClick={handleMenuOpen} />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
