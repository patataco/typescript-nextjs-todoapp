import { PropsWithChildren } from 'react';

const TestSpecGroup = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col items-center gap-16">{children}</div>;
};

export default TestSpecGroup;
