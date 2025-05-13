import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Tip, Category } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TipCard from '@/components/TipCard';
import { Search } from 'lucide-react';
import { Link } from 'wouter';

interface TipsPageProps {
  showAll?: boolean;
}

const TipsPage = ({ showAll = true }: TipsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [displayLimit, setDisplayLimit] = useState<number>(6);

  const { data: tips, isLoading: tipsLoading } = useQuery<Tip[]>({
    queryKey: ['/api/tips'],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  useEffect(() => {
    if (!tips) return;
    
    let filtered = [...tips];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryId = parseInt(selectedCategory);
      filtered = filtered.filter(tip => tip.categoryId === categoryId);
    }
    
    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tip => 
        tip.title.toLowerCase().includes(query) || 
        tip.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredTips(filtered);
  }, [tips, selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + 6);
  };

  const isLoading = tipsLoading || categoriesLoading;
  const displayedTips = filteredTips.slice(0, displayLimit);
  const hasMoreTips = filteredTips.length > displayLimit;

  return (
    <div id="tips" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Eco-Friendly Tips - Browse Sustainable Living Ideas | EcoTips</title>
        <meta name="description" content="Explore our collection of sustainable living tips categorized by home, food, fashion, energy, and transport. Find practical ideas to reduce your environmental footprint." />
      </Helmet>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark">Explore Sustainability Tips</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 mb-6"></div>
        
        {isLoading ? (
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories?.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id.toString() ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search tips..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-lg"
            />
            <Search className="absolute right-3 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTips.map(tip => (
            <TipCard key={tip.id} tip={tip} categories={categories || []} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-xl font-medium text-gray-600">No tips found matching your criteria</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or category filter</p>
        </div>
      )}
      
      {hasMoreTips && (
        <div className="mt-12 text-center">
          <Button 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6"
            onClick={handleLoadMore}
          >
            Load More Tips
          </Button>
        </div>
      )}
      
      {!showAll && (
        <div className="mt-12 text-center">
          <Link href="/tips">
            <Button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6">
              View All Tips
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TipsPage;
