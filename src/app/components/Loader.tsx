import React from "react";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

        {message && (
          <p className="text-white text-lg font-semibold mt-4 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
