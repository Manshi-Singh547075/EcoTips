import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-cover bg-center h-[500px]" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Daily Tips for Sustainable Living</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Join our community sharing practical ideas to help the planet, one small action at a time.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tips">
              <Button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 h-auto">
                Browse Tips
              </Button>
            </Link>
            <Link href="/contribute">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 h-auto">
                Share Your Ideas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
