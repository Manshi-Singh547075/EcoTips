import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import FeaturedTip from '@/components/FeaturedTip';
import TipsPage from '@/pages/TipsPage';
import Stats from '@/components/Stats';
import Newsletter from '@/components/Newsletter';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EcoTips - Share & Discover Sustainable Living Ideas</title>
        <meta name="description" content="Join our community sharing practical ideas for sustainable living. Browse eco-friendly tips and contribute your own to help the planet, one small action at a time." />
        <meta property="og:title" content="EcoTips - Sustainable Living Made Simple" />
        <meta property="og:description" content="Browse and share eco-friendly tips and ideas for more sustainable daily living." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Hero />
      <FeaturedTip />
      <TipsPage showAll={false} />
      <Stats />
      <Newsletter />
    </>
  );
};

export default Home;
