import Layout from '@/components/Layout';
import Projectguide from '@/components/Projectguide';

const GuideHome = () => {
  return <Projectguide />;
};

export default GuideHome;
GuideHome.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
