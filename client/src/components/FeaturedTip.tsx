import { useQuery } from "@tanstack/react-query";
import { Tip } from "@shared/schema";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const FeaturedTip = () => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  const { data: featuredTip, isLoading, error } = useQuery<Tip>({ 
    queryKey: ['/api/tips/featured'],
  });

  const handleLikeClick = async () => {
    if (!featuredTip) return;
    
    try {
      const action = liked ? 'unlike' : 'like';
      await apiRequest('PATCH', `/api/tips/${featuredTip.id}/like`, { action });
      setLiked(!liked);
      toast({
        description: liked ? "Removed like from tip" : "Added like to tip",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update like status",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark">Today's Featured Tip</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex animate-pulse">
          <div className="md:flex-shrink-0 md:w-1/2 bg-gray-300 h-60 md:h-80"></div>
          <div className="p-8 md:p-10 md:w-1/2 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !featuredTip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark">Today's Featured Tip</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600">Could not load featured tip. Please try again later.</p>
        </div>
      </div>
    );
  }

  const formattedDate = featuredTip.createdAt 
    ? format(new Date(featuredTip.createdAt), 'MMMM d, yyyy')
    : 'Recent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark">Today's Featured Tip</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          <img 
            src={featuredTip.imageUrl || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"} 
            alt={featuredTip.title} 
            className="h-60 w-full object-cover md:h-full"
          />
        </div>
        
        <div className="p-8 md:p-10 md:w-1/2">
          <div className="flex items-center">
            <Badge variant="category">{featuredTip.categoryId}</Badge>
            <span className="ml-3 text-sm text-gray-500">{formattedDate}</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-neutral-dark">{featuredTip.title}</h3>
          <p className="mt-4 text-gray-600">{featuredTip.content}</p>
          <div className="mt-6 flex justify-between items-center">
            {featuredTip.authorName && (
              <div className="flex items-center">
                {featuredTip.authorAvatar && (
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={featuredTip.authorAvatar} 
                    alt={`${featuredTip.authorName} avatar`}
                  />
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-neutral-dark">{featuredTip.authorName}</p>
                  {featuredTip.authorTitle && (
                    <p className="text-xs text-gray-500">{featuredTip.authorTitle}</p>
                  )}
                </div>
              </div>
            )}
            <button 
              className={`flex items-center space-x-1 ${liked ? 'text-accent' : 'text-gray-400'}`}
              onClick={handleLikeClick}
              aria-label={liked ? "Unlike this tip" : "Like this tip"}
            >
              <Heart className={`${liked ? 'fill-current' : ''} h-5 w-5`} />
              <span>{featuredTip.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTip;
