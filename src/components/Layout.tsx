import { PropsWithChildren } from 'react';

import Nav from './Nav';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Nav />
      <div className="mx-auto h-screen max-w-5xl p-4">{children}</div>
    </div>
  );
};

export default Layout;
