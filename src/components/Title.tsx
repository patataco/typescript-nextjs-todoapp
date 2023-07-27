import Projectguide from './Projectguide';

const Title = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 pt-7">
      <h1>Why Todo App?</h1>
      <ul className="flex flex-col gap-6 text-lg">
        <li className="flex items-start">
          <span className="mr-2">✔</span>
          <span>
            프론트엔드 개발을 시작하면, 다양한 기술 스택을 배우게 됩니다. 그리고
            이때 일반적으로 연습을 위해 Todo List 애플리케이션을 만들게 됩니다.
            그래서인지 우리가 만든 Todo App은 늘 어딘가 아쉬운 습작으로 남게
            됩니다.
          </span>
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
            경험을 통해, 효과적인 개발 방법론을 실제로 적용하고 그 장점을
            체험하였습니다.
          </span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">✔</span>
          <span>
            이 프로젝트의 목표는 기본적인 Todo 앱에서 출발하여 점진적으로 기술
            스택을 확장하고 최적화하는 과정을 통해 모던 웹 개발의 효율성과
            실용성을 체험하고 이해하는 것입니다. Context API, Recoil, REST API,
            그리고 React Query 등의 다양한 기술과 라이브러리를 도입하면서,
            이들이 애플리케이션의 성능을 어떻게 향상시키는지 직접 경험하고 그
            결과를 비교 분석했습니다. 이를 통해 특정 상황에서 어떤 기술이나
            라이브러리를 선택하면 좋을지에 대한 인사이트를 얻을 수 있었습니다.
          </span>
        </li>
      </ul>
      <Projectguide />
    </div>
  );
};

export default Title;
