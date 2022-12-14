import { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { Tweet } from "../types";
import TweetBox from "./TweetBox";
import TweetComponent from "./Tweet";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Feed = ({ tweets: tweetProps }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProps);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing ...");
    const tweets = await fetchTweets();

    setTweets(tweets);
    toast.success("Feed updated ...", {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text=xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      {/* Feed */}
      <div className="scroll-y">
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
