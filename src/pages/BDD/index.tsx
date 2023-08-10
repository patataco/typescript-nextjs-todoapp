import Layout from '@/components/Layout';

const BDD = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 pt-7">
      <h1>BDD란?</h1>
      <div className="text-xl">Behavior Driven Development, 행위 주도 개발</div>
      <ul className="flex flex-col gap-6 text-base">
        <li className="flex items-start">
          <span className="mr-2">✔</span>
          <span>
            TDD에서 파생된 개발 방법론으로, 테스트 케이스 작성이 선행되는 테스트
            주도 개발 방법론이라는 점은 TDD와 동일하나, 사용자의 행위 관점으로
            작성된 시나리오가 테스트 케이스가 된다는 점이 BDD의 특징입니다.
          </span>
        </li>
        <li>
          <div className="flex items-start">
            <span className="mr-2">✔</span>
            <span className="whitespace-nowrap font-bold">
              사용자 중심의 테스트 케이스 작성
            </span>
          </div>
          <p className="pl-6 pt-2">
            BDD의 시나리오는 사용자의 행동과 요구사항을 중심으로 작성되기
            때문에, 실제 사용자가 앱을 사용할 때 발생할 수 있는 다양한
            시나리오를 더욱 정확하게 반영할 수 있습니다. 이로 인해, 실제
            사용자의 행동 패턴에 가까운 테스트를 진행할 수 있습니다.
          </p>
        </li>
        <li>
          <div className="flex items-start">
            <span className="mr-2">✔</span>
            <span className="whitespace-nowrap font-bold">
              명확한 요구사항 이해
            </span>
          </div>
          <p className="pl-6 pt-2">
            BDD는 개발자와 비개발자 모두가 이해할 수 있는 통일된 언어를 사용하여
            테스트 케이스를 작성합니다. 이를 통해 요구사항에 대한 이해도를
            높이고, 모호성을 줄일 수 있습니다.
          </p>
        </li>
        <li>
          <div className="flex items-start">
            <span className="mr-2">✔</span>
            <span className="whitespace-nowrap font-bold">
              자동화된 테스트와 문서화
            </span>
          </div>
          <p className="pl-6 pt-2">
            여러 Test Tool들은 테스트 케이스를 자동화하여 실행할 수 있는 기능을
            제공하며, 테스트 케이스를 문서로도 활용할 수 있습니다. 이렇게 작성된
            테스트 케이스는 요구사항의 변화에 따라 쉽게 업데이트하고 관리할 수
            있습니다.
          </p>
        </li>
        <li>
          <div className="flex items-start">
            <span className="mr-2">✔</span>
            <span className="whitespace-nowrap font-bold">
              통합 테스트와 유닛 테스트의 간극을 줄임
            </span>
          </div>
          <p className="pl-6 pt-2">
            BDD는 사용자의 행동을 중심으로 시나리오를 작성하기 때문에, 단순한
            유닛 테스트에서 벗어나 시스템 전체를 테스트하는 통합 테스트에
            가깝습니다. 이로 인해 통합 테스트와 유닛 테스트 사이의 간극을 줄일
            수 있습니다.
          </p>
        </li>
        <li>
          <div className="flex items-start">
            <span className="mr-2">✔</span>
            <span className="whitespace-nowrap font-bold">
              리팩토링과 유지보수의 용이성
            </span>
          </div>
          <p className="pl-6 pt-2">
            BDD의 테스트 케이스가 있으면, 코드의 리팩토링이나 기능의 추가/변경이
            있을 때, 기존 기능이 제대로 동작하는지 검증하는 데 큰 도움이 됩니다.
            이는 안정적인 코드 유지보수를 돕습니다.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BDD;

BDD.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
