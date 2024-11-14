const LoadingSpinner = () => {
  return (
    <div className="flex justify-center mt-4" role="status">
      <div className="h-8 w-8 animate-spin rounded-full text-blue-500 border-b-2 border-current" />
    </div>
  );
};

export default LoadingSpinner;
