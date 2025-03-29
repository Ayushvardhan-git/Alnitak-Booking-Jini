import { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import {
  CalendarIcon,
  ImageIcon,
  ShareIcon,
  TrendingUpIcon,
  PlusIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for demo purposes
const DEMO_STATS = {
  posts: 12,
  impressions: 2467,
  engagement: 321,
  clicks: 89,
};

// Sample recent posts for demo purposes
const DEMO_RECENT_POSTS = [
  {
    id: "1",
    title: "Happy Independence Day",
    image: "https://images.unsplash.com/photo-1556804335-2fa563e93aae",
    date: "2023-08-15",
    likes: 42,
    platform: "instagram",
  },
  {
    id: "2",
    title: "Diwali Celebrations",
    image:
      "https://www.creativehatti.com/wp-content/uploads/edd/2022/09/Banner-template-for-happy-diwali-festival-24-large.jpg",
    date: "2023-11-12",
    likes: 67,
    platform: "facebook",
  },
  {
    id: "3",
    title: "Winter Holiday Package",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570",
    date: "2023-12-05",
    likes: 24,
    platform: "instagram",
  },
];

// Sample upcoming occasions for demo purposes
const DEMO_UPCOMING_OCCASIONS = [
  {
    id: "1",
    name: "Valentine's Day",
    date: "2024-02-14",
    description: "Create romantic posts for couples' packages",
  },
  {
    id: "2",
    name: "Women's Day",
    date: "2024-03-08",
    description: "Celebrate women travelers and staff",
  },
  {
    id: "3",
    name: "Earth Day",
    date: "2024-04-22",
    description: "Highlight your eco-friendly initiatives",
  },
];

export default function Dashboard() {
  const [timeOfDay, setTimeOfDay] = useState("");
  const userName = "Hotel Manager"; // Default name since we're skipping login

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Good {timeOfDay}, {userName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your social media posts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {DEMO_STATS.posts}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+3</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Impressions
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {DEMO_STATS.impressions}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUpIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Engagement</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {DEMO_STATS.engagement}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ShareIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Website Clicks
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {DEMO_STATS.clicks}
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+5%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Posts
                </h2>
                <Link
                  to="/posts"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  View all
                </Link>
              </div>
              <div className="divide-y divide-border">
                {DEMO_RECENT_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center p-4 hover:bg-gray-50"
                  >
                    <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {post.likes} likes
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs capitalize text-gray-500">
                          {post.platform}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Occasions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Occasions
                </h2>
              </div>
              <div className="divide-y divide-border">
                {DEMO_UPCOMING_OCCASIONS.map((occasion) => (
                  <div key={occasion.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900">
                        {occasion.name}
                      </h3>
                      <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full">
                        {new Date(occasion.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {occasion.description}
                    </p>
                    <div className="mt-3">
                      <Link
                        to={`/create?occasion=${encodeURIComponent(
                          occasion.name
                        )}`}
                        className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Create post for this occasion
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link
                  to="/create"
                  className="btn-primary flex items-center justify-center w-full"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create New Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
