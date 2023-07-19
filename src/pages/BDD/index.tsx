const BDD = () => {
  return (
    <div>
      <h1>BDD란?</h1>
      <div>Behavior Driven Development, 행위 주도 개발</div>
      <ul>
        <li>
          TDD에서 파생된 개발 방법론으로 테스트 케이스 작성이 선행되는 테스트
          주도 개발 방법론이라는 점은 TDD와 동일하나, 사용자의 행위 관점으로
          작성된 시나리오가 테스트 케이스가 된다는 점이 BDD의 특징입니다.
        </li>
        <li>
          따라서 BDD의 시나리오는 메소드보다는 사용자의 행위와 요구사항을
          중심으로 기술되어야 합니다.
        </li>
      </ul>
    </div>
  );
};

export default BDD;
