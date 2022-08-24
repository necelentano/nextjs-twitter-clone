import { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";

const TweetBox = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex space-x-2 p-5">
      <div className="relative mt-4 h-14 w-14 rounded-full object-cover overflow-hidden">
        <Image
          src="https://links.papareact.com/gll"
          alt="User image placeholder"
          layout="fill"
        />
      </div>
      <div className="flex flex-1 pl-2 items-center">
        <form className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's Happening?"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input}
              className="bg-twitter px-5 py-2 text-white font-bold rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
