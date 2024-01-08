import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TaskSchemaTable = () => {
  return (
    <Table className="max-w-[480px]">
      <TableCaption className="pb-4 text-lg">Task Schema</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>필드명</TableHead>
          <TableHead>설명</TableHead>
          <TableHead>타입</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SPEC_PROPERTY.map((item) => {
          return (
            <TableRow key={item.field}>
              <TableCell>{item.field}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default TaskSchemaTable;

const SPEC_PROPERTY = [
  { field: 'title', description: 'Task 제목', type: 'string' },
  { field: 'content', description: 'Task 상세 내용', type: 'string' },
  { field: 'categories', description: '카테고리', type: 'string[]' },
  {
    field: 'status',
    description: 'Task 진행 상태',
    type: 'inProgress | completed',
  },
  { field: 'startDateTime', description: '시작 시간', type: '?Date' },
  { field: 'dueDateTime', description: '마감 시간', type: '?Date' },
  { field: 'createdDateTime', description: '생성 시간', type: 'Date' },
  {
    field: 'lastModifiedDateTime',
    description: '마지막 수정 시간',
    type: 'Date',
  },
];
