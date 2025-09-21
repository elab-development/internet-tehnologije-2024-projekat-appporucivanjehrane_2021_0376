import { Spinner } from "flowbite-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner color="failure" size="xl" />
    </div>
  );
};

export default LoadingSpinner;
