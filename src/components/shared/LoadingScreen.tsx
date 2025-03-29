
import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-primary rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl font-semibold text-primary">Loading...</h2>
    </div>
  );
}
