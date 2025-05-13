import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, MessageSquare } from 'lucide-react';
import { Tip, Category } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { format } from 'date-fns';

interface TipCardProps {
  tip: Tip;
  categories: Category[];
}

const TipCard = ({ tip, categories }: TipCardProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  const category = categories.find(cat => cat.id === tip.categoryId);
  
  const formattedDate = tip.createdAt 
    ? format(new Date(tip.createdAt), 'MMMM d, yyyy')
    : 'Recent';

  const handleLike = async () => {
    try {
      const action = liked ? 'unlike' : 'like';
      await apiRequest('PATCH', `/api/tips/${tip.id}/like`, { action });
      
      setLiked(!liked);
      queryClient.invalidateQueries({ queryKey: ['/api/tips'] });
      
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.content,
        url: window.location.href,
      })
      .then(() => {
        toast({
          description: "Shared successfully!",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        toast({
          variant: "destructive",
          description: "Failed to share",
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Link copied to clipboard!",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
      {tip.imageUrl && (
        <img 
          src={tip.imageUrl} 
          alt={tip.title} 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Badge variant="category">{category?.name || 'Uncategorized'}</Badge>
          <span className="ml-3 text-xs text-gray-500">{formattedDate}</span>
        </div>
        <h3 className="text-xl font-bold text-neutral-dark mb-2">{tip.title}</h3>
        <p className="text-gray-600 mb-4">{tip.content}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button 
              className="text-gray-500 hover:text-primary text-sm flex items-center"
              onClick={handleShare}
              aria-label="Share tip"
            >
              <Share2 className="h-4 w-4 mr-1" /> Share
            </button>
            <button className="text-gray-500 hover:text-primary text-sm flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" /> Comments
            </button>
          </div>
          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-accent' : 'text-gray-400'}`}
            onClick={handleLike}
            aria-label={liked ? "Unlike this tip" : "Like this tip"}
          >
            <Heart className={`${liked ? 'fill-current' : ''} h-5 w-5`} />
            <span>{tip.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCard;
