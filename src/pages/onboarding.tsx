
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [hotelName, setHotelName] = useState('');
  const [hotelUrl, setHotelUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { updateProfile } = useAuth();

  const handleNext = () => {
    if (step === 1 && !hotelName) {
      toast.error('Please enter your hotel name');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile({ hotelName, hotelUrl, logo });
      toast.success('Profile updated successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Set up your hotel profile
        </h2>
        <div className="mt-2 text-center text-sm text-gray-600">
          <p>Let's get your hotel set up for amazing social media posts</p>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <>
              <div className="space-y-6">
                <div>
                  <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">
                    Hotel Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="hotelName"
                      name="hotelName"
                      type="text"
                      required
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="input-field"
                      placeholder="e.g. Sunrise Beach Resort"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <span>Continue</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-6">
                <div>
                  <label htmlFor="hotelUrl" className="block text-sm font-medium text-gray-700">
                    Hotel Website or Booking URL (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      id="hotelUrl"
                      name="hotelUrl"
                      type="url"
                      value={hotelUrl}
                      onChange={(e) => setHotelUrl(e.target.value)}
                      className="input-field"
                      placeholder="https://example.com or booking.com URL"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    This helps us extract information about your hotel
                  </p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary w-1/2"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-1/2 flex items-center justify-center"
                >
                  <span>Continue</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Hotel Logo (optional)
                  </label>
                  <div className="mt-1 flex items-center justify-center flex-col">
                    <div 
                      className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden"
                    >
                      {logo ? (
                        <img src={logo} alt="Hotel Logo" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-gray-400 text-sm text-center px-2">
                          Upload your hotel logo
                        </span>
                      )}
                    </div>
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('logo')?.click()}
                      className="mt-4 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
                    >
                      {logo ? 'Change Logo' : 'Upload Logo'}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Your logo will be used in social media posts
                  </p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary w-1/2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-1/2 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Complete Setup'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
