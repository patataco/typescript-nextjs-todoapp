import Layout from '@/components/Layout';
import TaskSchemaTable from '@/components/TaskSchemaTable';
import TestSpecGroup from '@/components/TestSpecGroup';
import TestSpecList from '@/components/TestSpecList';

const Home = () => {
  return (
    <TestSpecGroup>
      <TaskSchemaTable />
      <TestSpecList />
    </TestSpecGroup>
  );
};

export default Home;
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
