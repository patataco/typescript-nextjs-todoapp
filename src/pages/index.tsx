import { RecoilRoot } from 'recoil';

import Title from '@/components/Title';

export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Title />
      </RecoilRoot>
    </>
  );
}
