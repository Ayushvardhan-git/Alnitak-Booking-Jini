
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowRight, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

// Sample occasions for the dropdown
const OCCASIONS = [
  "Independence Day",
  "Republic Day",
  "Diwali",
  "Holi",
  "Christmas",
  "New Year",
  "Eid",
  "Women's Day",
  "Earth Day",
  "Valentine's Day",
  "Halloween",
  "Thanksgiving",
  "Hotel Anniversary",
  "Seasonal Promotion",
  "Weekend Special",
  "Custom Event"
];

export default function CreatePost() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryOccasion = queryParams.get('occasion');
  
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [occasion, setOccasion] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [includeHotelLogo, setIncludeHotelLogo] = useState(true);
  const [includeHotelName, setIncludeHotelName] = useState(true);
  
  useEffect(() => {
    if (queryOccasion) {
      setOccasion(queryOccasion);
    }
  }, [queryOccasion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!occasion) {
      toast.error('Please select an occasion');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Simulate generation delay for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call an API to generate the post
      window.location.href = '/editor?id=new';
    } catch (error) {
      console.error('Error generating post:', error);
      toast.error('Failed to generate post. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout title="Create Post">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create a New Social Media Post
          </h1>
          <p className="text-gray-600 mt-1">
            Let AI help you create stunning posts for your hotel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side - Creation form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Tell us about the post you want to create
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                      Occasion or Event
                    </label>
                    <select
                      id="occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Select an occasion</option>
                      {OCCASIONS.map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description or Special Message (optional)
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="input-field"
                      placeholder="e.g., We're offering a special 20% discount on all bookings during Diwali..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience (optional)
                    </label>
                    <input
                      id="targetAudience"
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="input-field"
                      placeholder="e.g., Families, couples, business travelers..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Color Scheme (optional)
                    </label>
                    <input
                      id="colorScheme"
                      type="text"
                      value={colorScheme}
                      onChange={(e) => setColorScheme(e.target.value)}
                      className="input-field"
                      placeholder="e.g., Blue and gold, vibrant colors, earthy tones..."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Branding Options</label>
                    
                    <div className="flex items-center">
                      <input
                        id="includeHotelLogo"
                        type="checkbox"
                        checked={includeHotelLogo}
                        onChange={(e) => setIncludeHotelLogo(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="includeHotelLogo" className="ml-2 block text-sm text-gray-700">
                        Include hotel logo
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="includeHotelName"
                        type="checkbox"
                        checked={includeHotelName}
                        onChange={(e) => setIncludeHotelName(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="includeHotelName" className="ml-2 block text-sm text-gray-700">
                        Include hotel name
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isGenerating || !occasion}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Post
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right side - Tips & Information */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-gray-900">Tips for Great Posts</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Be Specific</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    The more details you provide, the better the AI can generate a post that matches your needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Include Promotions</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Mention any special offers or discounts related to the occasion for better engagement.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Consider Your Audience</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Think about who you're targeting and what would resonate with them.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Maintain Brand Consistency</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Use colors and messaging that align with your hotel's brand identity.
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-blue-50">
                <h3 className="text-sm font-medium text-primary">Did You Know?</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Posts with vibrant images and concise text typically get 2.3x more engagement than text-heavy posts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
