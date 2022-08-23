import { RefreshIcon } from "@heroicons/react/outline";

const Feed = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text=xl fpnt-bold">Home</h1>
        <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
    </div>
  );
};

export default Feed;
