
import { useState } from 'react';
import Layout from '@/components/shared/Layout';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon } from 'lucide-react';

// Sample templates for demo purposes
const DEMO_TEMPLATES = [
  {
    id: '1',
    name: 'Independence Day Special',
    thumbnail: 'https://images.unsplash.com/photo-1556804335-2fa563e93aae',
    category: 'holiday',
    occasion: 'Independence Day',
    popularity: 'high'
  },
  {
    id: '2',
    name: 'Diwali Celebration',
    thumbnail: 'https://images.unsplash.com/photo-1604423481621-0e90893a7a43',
    category: 'festival',
    occasion: 'Diwali',
    popularity: 'high'
  },
  {
    id: '3',
    name: 'Christmas Offer',
    thumbnail: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    category: 'holiday',
    occasion: 'Christmas',
    popularity: 'medium'
  },
  {
    id: '4',
    name: 'New Year Celebration',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176',
    category: 'holiday',
    occasion: 'New Year',
    popularity: 'high'
  },
  {
    id: '5',
    name: 'Valentine\'s Day Special',
    thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
    category: 'holiday',
    occasion: 'Valentine\'s Day',
    popularity: 'medium'
  },
  {
    id: '6',
    name: 'Holi Festival Colors',
    thumbnail: 'https://images.unsplash.com/photo-1592989708839-cd36f33148da',
    category: 'festival',
    occasion: 'Holi',
    popularity: 'medium'
  },
  {
    id: '7',
    name: 'Weekend Getaway',
    thumbnail: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    category: 'promotion',
    occasion: 'Weekend',
    popularity: 'low'
  },
  {
    id: '8',
    name: 'Summer Holiday',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'seasonal',
    occasion: 'Summer',
    popularity: 'medium'
  },
  {
    id: '9',
    name: 'Women\'s Day Celebration',
    thumbnail: 'https://images.unsplash.com/photo-1485111075554-28cc7a1f7875',
    category: 'holiday',
    occasion: 'Women\'s Day',
    popularity: 'medium'
  }
];

// Filter types
type CategoryFilter = 'all' | 'holiday' | 'festival' | 'seasonal' | 'promotion';
type PopularityFilter = 'all' | 'high' | 'medium' | 'low';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [popularityFilter, setPopularityFilter] = useState<PopularityFilter>('all');
  
  const filteredTemplates = DEMO_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.occasion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    const matchesPopularity = popularityFilter === 'all' || template.popularity === popularityFilter;
    return matchesSearch && matchesCategory && matchesPopularity;
  });

  const handleTemplateSelect = (templateId: string) => {
    // In a real app, this would navigate to the create post page with the template ID
    toast.success(`Template selected: ${templateId}`);
  };

  return (
    <Layout title="Templates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Templates Gallery
          </h1>
          <p className="text-gray-600 mt-1">
            Choose from our professionally designed templates for your social media posts
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search templates by name or occasion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="input-field text-sm"
              >
                <option value="all">All Categories</option>
                <option value="holiday">Holidays</option>
                <option value="festival">Festivals</option>
                <option value="seasonal">Seasonal</option>
                <option value="promotion">Promotions</option>
              </select>
            </div>
            <div>
              <select
                value={popularityFilter}
                onChange={(e) => setPopularityFilter(e.target.value as PopularityFilter)}
                className="input-field text-sm"
              >
                <option value="all">All Popularity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="object-cover w-full h-40"
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-900 truncate">{template.name}</h3>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {template.occasion}
                  </span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {template.category}
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/create?template=${template.id}`}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTemplates.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-border">
              <div className="bg-gray-100 rounded-full p-3">
                <SearchIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No templates found</h3>
              <p className="mt-1 text-gray-500">
                {searchQuery 
                  ? `No templates match your search for "${searchQuery}"`
                  : categoryFilter !== 'all'
                    ? `No templates found in the "${categoryFilter}" category`
                    : "Try adjusting your filters"
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setPopularityFilter('all');
                }}
                className="mt-6 text-primary hover:text-primary/80 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
