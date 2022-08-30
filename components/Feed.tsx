import { RefreshIcon } from "@heroicons/react/outline";
import { Tweet } from "../types";
import TweetBox from "./TweetBox";
import TweetComponent from "./Tweet";

interface Props {
  tweets: Tweet[];
}

const Feed = ({ tweets }: Props) => {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text=xl fpnt-bold">Home</h1>
        <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
      <div>
        <TweetBox />
      </div>
      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
