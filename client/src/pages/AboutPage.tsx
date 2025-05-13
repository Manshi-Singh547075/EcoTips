import { Helmet } from 'react-helmet';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>About EcoTips | Our Mission for Sustainable Living</title>
        <meta name="description" content="Learn about EcoTips' mission to promote sustainable living through community-shared practical tips and ideas that help reduce environmental impact." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">About EcoTips</h1>
          <div className="w-20 h-1 bg-primary mx-auto mt-2 mb-6"></div>
          <p className="text-xl text-gray-600">Our mission is to make sustainable living accessible to everyone.</p>
        </div>
        
        <div className="prose prose-green lg:prose-lg mx-auto">
          <p>
            EcoTips was founded in 2020 with a simple idea: that small, everyday actions can collectively make a big difference for our planet. We believe that sustainable living shouldn't be complicated or expensive—it should be practical, accessible, and even enjoyable.
          </p>
          
          <h2>Our Values</h2>
          <ul>
            <li><strong>Community-Driven:</strong> We believe in the power of shared knowledge. Every tip on our platform comes from people like you who are passionate about sustainable living.</li>
            <li><strong>Practicality:</strong> We focus on actionable tips that anyone can implement, regardless of where they live or their budget.</li>
            <li><strong>Impact:</strong> We prioritize tips that have the most significant environmental benefit.</li>
            <li><strong>Inclusivity:</strong> Sustainability is for everyone. We strive to make our content accessible and relevant to people from all walks of life.</li>
          </ul>
          
          <h2>How It Works</h2>
          <p>
            EcoTips is a platform where users can both discover and share sustainability ideas. Users can browse tips by category, save their favorites, and contribute their own knowledge to the community. All tips are vetted to ensure they provide genuine environmental benefits.
          </p>
          
          <h2>Join Our Community</h2>
          <p>
            Whether you're just starting your sustainability journey or you're looking to share your expertise, we invite you to become part of our growing community. Together, we can create a more sustainable future, one small tip at a time.
          </p>
          
          <blockquote>
            "Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has." — Margaret Mead
          </blockquote>
          
          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you. Reach out to our team at <a href="mailto:hello@ecotips.com" className="text-primary hover:underline">hello@ecotips.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
