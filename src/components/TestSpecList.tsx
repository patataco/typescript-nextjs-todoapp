import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const TestSpecList = () => {
  return (
    <div className="w-full max-w-[480px] md:max-w-[600px]">
      <div className="text-lg text-muted-foreground">
        BDD로 작성해 본 Test Spec 예시
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="items-start text-sm md:text-base">
            <div className="text-sky-700">Scenario:</div>
            <div>
              유저는 입력영역에 해야되는 일들을 입력하고 리스트에 추가한다.
            </div>
          </AccordionTrigger>
          <AccordionContent className="md:text-base">
            <div>
              <span className="text-sky-700">given</span>: 유저가 입력영역에
              입력하려고 할 때
            </div>
            <ul className="flex flex-col gap-3 px-4">
              <li className="list-disc pt-2">
                <div>
                  <span className="text-sky-700">when</span>: 유저가 입력영역에
                  아무것도 입력하지 않았으면,
                </div>
                <div className="pl-4 pt-1">
                  <span className="text-sky-700">then</span>: 추가 버튼은
                  비활성화됩니다.
                </div>
              </li>
              <li className="list-disc">
                <div>
                  <span className="text-sky-700">when</span>: 유저가 입력영역에
                  텍스트를 입력했으면,
                </div>
                <div className="pl-4 pt-1">
                  <span className="text-sky-700">then</span>: 추가 버튼은
                  활성화됩니다.
                </div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex items-start text-sm md:text-base">
            <div className="text-sky-700">Scenario:</div>
            <div>유저가 Task 내용을 편집한다.</div>
          </AccordionTrigger>
          <AccordionContent className="md:text-base">
            <div>
              <span className="text-sky-700">given</span>: 대기리스트에 Task 가
              존재할 때
            </div>
            <ul className="flex flex-col gap-3 px-4">
              <li className="list-disc pt-2">
                <div>
                  <span className="text-sky-700">when</span>: Tasks 중에 내용을
                  변경하고 싶은 Task의 라벨을 클릭하면,
                </div>
                <div className="pl-4 pt-1">
                  <span className="text-sky-700">then</span>: input창으로
                  변경된다.
                </div>
                <div className="pl-4 pt-1">
                  <span className="text-sky-700">and</span>: input창에 변경하고
                  싶은 내용을 적을 수 있게 되는데, input창에는 기존 테스크
                  내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
                </div>
              </li>
              <li className="list-disc">
                <div>
                  <span className="text-sky-700">when</span>: input창에 변경
                  내용을 적고 input 외 영역을 클릭하면,
                </div>
                <div className="pl-4 pt-1">
                  <span className="text-sky-700">then</span>: 입력한 내용으로
                  테스크가 변경되고, input창이 없어진다.
                </div>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default TestSpecList;
