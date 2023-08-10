import Layout from '@/components/Layout';
import Title from '@/components/Title';

export default function Home() {
  return (
    <>
      <Title />
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
