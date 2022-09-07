import { useEffect, useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import toast from "react-hot-toast";
import { Comment, CommentBody, Tweet } from "../types";

import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweet;
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    console.log("WOOHOO we made it", result);
    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  };

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt={tweet.username}
          className="h-10 w-10 rounded-full object-cover overflow-hidden"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/, "").toLocaleLowerCase()}
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt={tweet.username}
              className="max-h-60 w-full m-5 ml-0 mb-1 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className=" mt-5 flex justify-between">
        <div
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Box logic */}

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleCommentSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment ..."
            className="flex-1 rounded-lg bg-gray-200 p-2 outline-none"
          />
          <button
            className="text-twitter disabled:text-gray-200"
            type="submit"
            disabled={!input}
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-5 mt-2 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="flex space-x-2 relative">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <div className="relative mt-2 h-7 w-7 rounded-full object-cover overflow-hidden">
                <Image
                  src={comment.profileImg}
                  alt={comment.username}
                  layout="fill"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-400 lg:inline">
                    {" "}
                    @{comment.username.replace(/\s+/, "").toLocaleLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
