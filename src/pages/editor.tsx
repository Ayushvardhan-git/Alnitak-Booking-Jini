
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { fabric } from 'fabric';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Download, Share } from 'lucide-react';

export default function EditorPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('id');
  
  const [step, setStep] = useState(1);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Example post data that would normally come from an API
  const postData = {
    title: 'Independence Day Special',
    occasion: 'Independence Day',
    colors: ['#FF9933', '#FFFFFF', '#138808'],
    description: 'Celebrate the spirit of freedom with our special Independence Day offer. Enjoy a 20% discount on all bookings.',
    images: [
      'https://images.unsplash.com/photo-1556804335-2fa563e93aae',
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c'
    ]
  };

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 800,
        backgroundColor: '#ffffff'
      });
      
      setCanvas(fabricCanvas);
      
      // Add initial elements to canvas
      const text = new fabric.Text('Create Your Post', {
        left: 400,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 40,
        fill: '#333333',
        originX: 'center',
        originY: 'center'
      });
      
      fabricCanvas.add(text);
      fabricCanvas.renderAll();
      setIsLoading(false);
      
      // Cleanup function
      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvasRef, canvas]);
  
  // Add template elements when canvas is ready
  useEffect(() => {
    if (canvas && postId) {
      try {
        setIsLoading(true);
        
        // Clear canvas
        canvas.clear();
        canvas.backgroundColor = postData.colors[1];
        
        // Add header
        const header = new fabric.Rect({
          width: 800,
          height: 100,
          fill: postData.colors[0],
          top: 0,
          left: 0
        });
        
        const title = new fabric.Text(postData.title, {
          left: 400,
          top: 50,
          fontFamily: 'Arial',
          fontSize: 30,
          fill: '#FFFFFF',
          originX: 'center',
          originY: 'center'
        });
        
        // Add main content
        const mainText = new fabric.Text(postData.description, {
          left: 400,
          top: 200,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#333333',
          originX: 'center',
          textAlign: 'center',
          width: 600
        });
        
        // Add image
        if (postData.images.length > 0) {
          fabric.Image.fromURL(postData.images[0], (img) => {
            img.scaleToWidth(400);
            img.set({
              left: 400,
              top: 400,
              originX: 'center',
              originY: 'center'
            });
              
            canvas.add(img);
            canvas.renderAll();
          }, { 
            crossOrigin: 'anonymous' 
          });
        }
        
        // Add footer
        const footer = new fabric.Rect({
          width: 800,
          height: 100,
          fill: postData.colors[2],
          top: 700,
          left: 0
        });
        
        // Add logo text as placeholder
        const logo = new fabric.Text('HOTEL LOGO', {
          left: 400,
          top: 750,
          fontFamily: 'Arial',
          fontSize: 20,
          fill: '#FFFFFF',
          originX: 'center',
          originY: 'center'
        });
        
        canvas.add(header, title, mainText, footer, logo);
        canvas.renderAll();
        setIsLoading(false);
      } catch (error) {
        console.error('Error setting up canvas:', error);
        toast.error('Failed to load template. Please try again.');
        setIsLoading(false);
      }
    }
  }, [canvas, postId, postData]);
  
  const handleSave = async () => {
    if (!canvas) return;
    
    setIsSaving(true);
    try {
      // Generate data URL from canvas
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      
      // In a real app, you would save this to the server
      console.log('Image data:', dataUrl.substring(0, 100) + '...');
      
      toast.success('Post saved successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDownload = () => {
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    
    const link = document.createElement('a');
    link.download = 'social-media-post.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = () => {
    // This would open a share dialog in a real app
    toast.success('Post ready to share!');
    window.location.href = '/posts';
  };

  return (
    <Layout title="Post Editor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {postId === 'new' ? 'Create New Post' : 'Edit Post'}
          </h1>
          
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-secondary"
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={handleDownload}
              className="btn-secondary"
            >
              <Download className="h-5 w-5 mr-2" />
              Download
            </button>
            
            <button
              onClick={handleShare}
              className="btn-primary"
            >
              <Share className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between">
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded text-sm font-medium ${
                  step === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setStep(1)}
              >
                Design
              </button>
              <button
                className={`px-3 py-1 rounded text-sm font-medium ${
                  step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setStep(2)}
              >
                Caption
              </button>
              <button
                className={`px-3 py-1 rounded text-sm font-medium ${
                  step === 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setStep(3)}
              >
                Schedule
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                onClick={() => setStep(step < 3 ? step + 1 : 3)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {step === 1 && (
              <div className="flex">
                <div className="w-3/4 flex justify-center items-center bg-gray-50 rounded-lg p-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-[800px] w-full">
                      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <canvas ref={canvasRef} />
                  )}
                </div>
                
                <div className="w-1/4 pl-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Design Tools</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Background Color
                        </label>
                        <div className="flex space-x-2">
                          {['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA'].map(color => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                if (canvas) {
                                  canvas.backgroundColor = color;
                                  canvas.renderAll();
                                }
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Add Elements
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            className="p-2 bg-gray-100 rounded text-xs font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() => {
                              if (canvas) {
                                const text = new fabric.Text('Text', {
                                  left: 400,
                                  top: 400,
                                  fontFamily: 'Arial',
                                  fontSize: 20,
                                  fill: '#333333'
                                });
                                canvas.add(text);
                                canvas.setActiveObject(text);
                                canvas.renderAll();
                              }
                            }}
                          >
                            Text
                          </button>
                          <button
                            className="p-2 bg-gray-100 rounded text-xs font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() => {
                              if (canvas) {
                                const rect = new fabric.Rect({
                                  left: 400,
                                  top: 400,
                                  width: 100,
                                  height: 100,
                                  fill: 'rgba(0,0,0,0.1)',
                                  originX: 'center',
                                  originY: 'center'
                                });
                                canvas.add(rect);
                                canvas.setActiveObject(rect);
                                canvas.renderAll();
                              }
                            }}
                          >
                            Shape
                          </button>
                          <button
                            className="p-2 bg-gray-100 rounded text-xs font-medium text-gray-700 hover:bg-gray-200"
                            onClick={() => {
                              // This would open an image selector in a real app
                              toast.info('Image upload functionality would be implemented in a real app');
                            }}
                          >
                            Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Templates</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map(id => (
                        <div
                          key={id}
                          className="aspect-square bg-gray-100 rounded cursor-pointer hover:opacity-80"
                          onClick={() => {
                            toast.info(`Template ${id} would be applied`);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Write Caption</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                        Main Caption
                      </label>
                      <textarea
                        id="caption"
                        rows={6}
                        className="input-field"
                        placeholder="Write your caption here..."
                        defaultValue={postData.description}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-1">
                        Hashtags
                      </label>
                      <input
                        id="hashtags"
                        type="text"
                        className="input-field"
                        placeholder="e.g., #hotel #travel #vacation"
                        defaultValue="#independence #freedom #specialoffer"
                      />
                    </div>
                    
                    <button
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      onClick={() => {
                        toast.success('Caption suggestions generated!');
                      }}
                    >
                      Generate AI suggestions
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        H
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Your Hotel Name</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    
                    <div className="aspect-square bg-gray-100 rounded-lg">
                      {/* This would show the canvas preview in a real app */}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-800">
                        {postData.description}
                      </p>
                      <p className="text-sm text-primary mt-1">
                        #independence #freedom #specialoffer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Post</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="postDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        id="postDate"
                        type="date"
                        className="input-field"
                        defaultValue={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="postTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        id="postTime"
                        type="time"
                        className="input-field"
                        defaultValue="09:00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Platforms
                      </label>
                      <div className="space-y-2">
                        {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map(platform => (
                          <div key={platform} className="flex items-center">
                            <input
                              id={platform}
                              type="checkbox"
                              defaultChecked={platform === 'Instagram' || platform === 'Facebook'}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={platform} className="ml-2 block text-sm text-gray-700">
                              {platform}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        className="btn-primary w-full"
                        onClick={() => {
                          toast.success('Post scheduled successfully!');
                          window.location.href = '/posts';
                        }}
                      >
                        Schedule Post
                      </button>
                      <button
                        className="btn-secondary w-full mt-2"
                        onClick={() => {
                          toast.success('Post published immediately!');
                          window.location.href = '/posts';
                        }}
                      >
                        Publish Now
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Best Posting Times</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-800">
                      Based on your audience analytics, here are the best times to post:
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="text-sm">
                        <span className="font-medium">Instagram:</span> Weekdays 12-1 PM or 7-8 PM
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Facebook:</span> Weekdays 1-4 PM
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">Twitter:</span> Weekdays 8 AM - 4 PM
                      </li>
                      <li className="text-sm">
                        <span className="font-medium">LinkedIn:</span> Tuesday-Thursday 9 AM - 12 PM
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">
                      These times are specific to your audience and may vary based on seasonal factors.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
