import LoadingSpinner from "@/components/shared/LoadingSpinner";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingOverlay;
