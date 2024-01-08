import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Title = () => {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <div className="flex flex-col gap-5 pt-10 sm:gap-10">
        <h2 className="self-center text-sky-700">Why Todo App?</h2>
        <ul className="flex flex-col gap-4 text-sm sm:text-base">
          <li className="flex items-start">
            <span className="mr-2 text-neutral-700">✔</span>
            <div>
              프론트엔드 개발을 시작하면, 다양한 기술 스택을 배우게 됩니다.
              그리고 이때 일반적으로 연습을 위해 Todo List 애플리케이션을 만들게
              됩니다. 그래서인지 우리가 만든 Todo App은 늘 어딘가 아쉬운
              습작으로 남게 됩니다.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✔</span>
            <span>
              이번 프로젝트는 이와 같은 한계를 뛰어 넘고 기술적으로 완벽한 Todo
              App을 만들어보기 위해 시작되었습니다.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✔</span>
            <span>
              유저의 행동을 기반으로 작성된 시나리오를 바탕으로 BDD 개발을
              진행하였습니다. 애플리케이션의 동작을 명확히 정의하고 테스트하는
              경험을 통해, 개발 방법론을 실제로 적용하고 장단점을
              체험하였습니다.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✔</span>
            <span>
              이 프로젝트의 목표는 기본적인 Todo 앱에서 출발하여 점진적으로 기술
              스택을 확장하고 최적화하는 과정을 통해 모던 웹 개발의 효율성과
              실용성을 체험하고 이해하는 것입니다.
              <br />
              <br />
              다양한 기술과 라이브러리를 도입하면서, 이들이 애플리케이션의
              성능을 어떻게 향상시키는지 직접 경험하고 그 결과를 비교
              분석했습니다.
            </span>
          </li>
        </ul>
      </div>
      <TodoPageCardList />
    </div>
  );
};

export default Title;

const TodoPageCardList = () => {
  return (
    <div className="mx-auto grid max-w-[480px] grid-cols-2 gap-4 sm:gap-10">
      {TODO_VERSION.map((item) => {
        return (
          <TodoPageCard
            path={item.path}
            version={item.version}
            key={item.version}
            name={item.name}
          />
        );
      })}
    </div>
  );
};

type TodoPageCardProps = {
  version: string;
  name: string;
  path: string;
};
const TodoPageCard = ({ version, name, path }: TodoPageCardProps) => {
  return (
    <Card className="aspect-square transition duration-500 hover:scale-110 sm:p-6">
      <CardHeader className="p-3">
        <Link href={path}>
          <div className="flex flex-row items-center gap-1 sm:text-lg">
            <span>
              <LinkIcon className="w-4" />
            </span>
            <span className="font-bold text-sky-700">{version}</span>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-3 text-sm sm:text-base">{name}</CardContent>
    </Card>
  );
};
const TODO_VERSION = [
  { path: '/todo/v1', version: 'v1', name: 'Context API를 활용한 상태관리' },
  { path: '/todo/v2', version: 'v2', name: 'Recoil을 활용한 상태관리' },
  { path: '/todo/v3', version: 'v3', name: 'REST API를 활용한 Data Fetching' },
  {
    path: '/todo/v4',
    version: 'v4',
    name: 'React Query로 Optimistic Updates구현하기',
  },
];
