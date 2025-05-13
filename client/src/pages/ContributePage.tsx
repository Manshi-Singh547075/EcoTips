import { Helmet } from 'react-helmet';
import TipForm from '@/components/TipForm';

const ContributePage = () => {
  return (
    <div id="contribute" className="bg-gray-100 py-16">
      <Helmet>
        <title>Contribute Eco-Friendly Tips | EcoTips</title>
        <meta name="description" content="Share your sustainability tips with our community. Submit your ideas and help others adopt eco-friendly practices for a greener future." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-6">Share Your Sustainability Tip</h2>
            <p className="text-gray-600 mb-6">Have a great idea for sustainable living that you'd like to share with our community? Submit your tip below and help inspire others to live more eco-friendly lives.</p>
            
            <img 
              src="https://images.unsplash.com/photo-1605600659453-259e326a6d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Eco-friendly lifestyle items and products" 
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <TipForm />
        </div>
      </div>
    </div>
  );
};

export default ContributePage;
