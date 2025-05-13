import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: "destructive",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-neutral-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">Stay Updated with Weekly Tips</h2>
          <p className="text-gray-600 mb-8">Get our latest sustainability tips delivered straight to your inbox. No spam, just practical eco-friendly advice.</p>
          
          <form className="sm:flex justify-center" onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto mb-3 sm:mb-0 rounded-l-lg sm:rounded-r-none" 
            />
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-medium rounded-r-lg sm:rounded-l-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
