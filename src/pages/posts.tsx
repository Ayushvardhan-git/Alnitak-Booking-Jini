
import { useState } from 'react';
import Layout from '@/components/shared/Layout';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { toast } from 'sonner';

// Sample data for demo purposes
const DEMO_POSTS = [
  {
    id: '1',
    title: 'Independence Day Special',
    image: 'https://images.unsplash.com/photo-1556804335-2fa563e93aae',
    createdAt: '2023-08-10T12:00:00Z',
    status: 'published',
    platforms: ['instagram', 'facebook'],
    stats: {
      likes: 42,
      comments: 7,
      shares: 3
    }
  },
  {
    id: '2',
    title: 'Diwali Celebrations',
    image: 'https://images.unsplash.com/photo-1604423481621-0e90893a7a43',
    createdAt: '2023-11-01T14:30:00Z',
    status: 'published',
    platforms: ['instagram', 'facebook', 'twitter'],
    stats: {
      likes: 67,
      comments: 12,
      shares: 8
    }
  },
  {
    id: '3',
    title: 'Christmas Room Package',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    createdAt: '2023-12-01T09:15:00Z',
    status: 'draft',
    platforms: [],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
  {
    id: '4',
    title: 'New Year\'s Eve Party',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176',
    createdAt: '2023-12-20T16:45:00Z',
    status: 'scheduled',
    scheduledFor: '2023-12-29T18:00:00Z',
    platforms: ['instagram', 'facebook', 'linkedin'],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  },
  {
    id: '5',
    title: 'Valentine\'s Day Special',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
    createdAt: '2024-01-25T11:20:00Z',
    status: 'draft',
    platforms: [],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  }
];

type PostStatus = 'all' | 'published' | 'scheduled' | 'draft';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus>('all');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const filteredPosts = DEMO_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (postId: string) => {
    setIsDeleting(true);
    
    try {
      // In a real app, this would call an API to delete the post
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Post deleted successfully!');
      // In a real app, we would update the state to remove the deleted post
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className="h-4 w-4 text-gray-600" />;
      case 'facebook':
        return <FacebookIcon className="h-4 w-4 text-gray-600" />;
      case 'twitter':
        return <TwitterIcon className="h-4 w-4 text-gray-600" />;
      case 'linkedin':
        return <LinkedinIcon className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, scheduledFor?: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Scheduled for {scheduledFor ? formatDate(scheduledFor) : 'future'}
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Layout title="My Posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Posts
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track all your social media posts
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/create"
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Post
            </Link>
          </div>
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
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PostStatus)}
                className="input-field text-sm"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium text-gray-900 truncate">{post.title}</h2>
                  <div className="flex">
                    {post.platforms.map((platform) => (
                      <div key={platform} className="ml-1">
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  {getStatusBadge(post.status, post.scheduledFor)}
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>Created on {formatDate(post.createdAt)}</span>
                </div>
                {post.status === 'published' && (
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">{post.stats.likes} likes</span>
                      <span className="mr-2">{post.stats.comments} comments</span>
                      <span>{post.stats.shares} shares</span>
                    </div>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Link
                    to={`/editor?id=${post.id}`}
                    className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  {post.status === 'draft' && (
                    <Link
                      to={`/share?id=${post.id}`}
                      className="flex-1 text-center px-3 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                      Publish
                    </Link>
                  )}
                  {(post.status === 'published' || post.status === 'scheduled') && (
                    <Link
                      to={`/analytics?id=${post.id}`}
                      className="flex-1 text-center px-3 py-2 bg-blue-50 text-primary rounded-md text-sm font-medium hover:bg-blue-100"
                    >
                      Analytics
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-border">
              <div className="bg-gray-100 rounded-full p-3">
                <SearchIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No posts found</h3>
              <p className="mt-1 text-gray-500">
                {searchQuery 
                  ? `No posts match your search for "${searchQuery}"`
                  : statusFilter !== 'all'
                    ? `You don't have any ${statusFilter} posts yet`
                    : "You haven't created any posts yet"
                }
              </p>
              <Link
                to="/create"
                className="mt-6 btn-primary flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
