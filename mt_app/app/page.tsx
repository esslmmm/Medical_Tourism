import { Suspense } from 'react';
import HomePageContent from './HomePageContent';

const HomePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;
