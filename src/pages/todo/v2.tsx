import { useEffect, useState } from 'react';

import TodoListView from '@/components/TodoListView';

export default function V2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient && <TodoListView />}</>;
}
