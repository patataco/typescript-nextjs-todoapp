const Projectguide = () => {
  const table = (
    <table className="w-[360px] border">
      <thead>
        <tr className="border-b">
          <th className="border-r p-3">Attribute</th>
          <th className="p-3">Domain</th>
        </tr>
      </thead>
      <tbody>
        {SPEC_DATA.map((row, rowIndex) => (
          <tr className="border-b" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td className="border-r p-3" key={cellIndex}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col gap-10 pt-6">
      <h2>프로젝트 진행 순서</h2>
      <div>
        <ul className="ml-4 flex list-decimal flex-col gap-4">
          {PROJECT_ORDER.map((item) => {
            if (item.id !== 5) {
              return (
                <li key={item.id}>
                  {item.title}
                  {item.children && (
                    <ul className="ml-6 flex list-disc flex-col gap-4 pt-2">
                      {item.children.map((child) => {
                        return <li key={child.id}>{child.title}</li>;
                      })}
                    </ul>
                  )}
                </li>
              );
            }
            return (
              <li key={item.id}>
                {item.title}
                {
                  <ul className="ml-6 flex list-disc flex-col gap-4 pt-2">
                    {item.children.map((child) => {
                      return <li key={child.id}>{child.title}</li>;
                    })}
                  </ul>
                }
                {/* <div className="pt-4 ml-6">{table}</div> */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Projectguide;

export const PROJECT_ORDER = [
  {
    id: 1,
    title: '프로젝트 환경설정',
    children: [
      { id: 1, title: 'Next.js + Typescript 프로젝트 초기화' },
      { id: 2, title: 'Linter 및 Formatter 설정' },
      { id: 3, title: 'UI 라이브러리 설정(Tailwind 사용)' },
    ],
  },
  {
    id: 2,
    title: 'UI 컴포넌트 만들기',
    children: [
      {
        id: 1,
        title: '재사용 가능한 UI컴포넌트를 만드는 것이 중요합니다.',
        grandchildren: [
          { id: '1', title: 'input' },
          { id: '2', title: 'button' },
          { id: '3', title: 'checkbox' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'BDD 형식으로 Spec 작성하기',
    children: [
      {
        id: 1,
        title: 'BDD 형식으로 Spec을 작성하여 프로젝트 명세를 구체화합니다.',
      },
    ],
  },
  {
    id: 4,
    title: '테스트코드 작성(Unit test & E2E test)',
    children: [
      { id: 1, title: 'BDD 형식의 Spec 기반으로 테스트코드를 작성합니다.' },
    ],
  },
  {
    id: 5,
    title: '데이터 모델링',
    children: [
      {
        id: 1,
        title:
          '데이터 모델링을 수행하여 앱에서 사용되는 데이터를 정의합니다. 이를 통해 데이터를 구조화하고 데이터베이스와의 상호 작용을 용이하게 합니다.',
      },
    ],
  },
  {
    id: 6,
    title: 'Todo List 만들기',
    children: [
      {
        id: 1,
        title:
          '동일한 기능의 애플리케이션에 다양한 기술이 어떻게 적용될 수 있는지, 그리고 그 결과가 어떻게 다르게 나타나는지를 실제로 경험하고 비교하는 것을 목표로 합니다.',
      },
    ],
  },
];

export const SPEC_DATA = [
  ['id', 'string'],
  ['title(Task제목)', 'string'],
  ['content(Task내용)', 'string'],
  ['categories', 'string[]'],
  ['status', 'notStarted, inProgress, completed, waitingOnOthers, deferred'],
  ['startDateTime', 'timestamp'],
  ['dueDateTime', 'timestamp'],
  ['createdDateTime', 'timestamp'],
  ['lastModifiedDateTime', 'timestamp'],
];
