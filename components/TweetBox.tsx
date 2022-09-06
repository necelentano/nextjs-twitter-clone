import { useState, useRef } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

const TweetBox = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlIsOpen, setImageUrlIsOpen] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <div className="relative mt-4 h-14 w-14 rounded-full object-cover overflow-hidden">
        <Image
          src={session?.user?.image || "https://links.papareact.com/gll"}
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
              <PhotographIcon
                onClick={() => setImageUrlIsOpen(!imageUrlIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 text-white font-bold rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image URL ..."
                className="flex-1 bg-transparent p-2 text-white placeholder:text-white outline-none"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              alt="Uploaded image"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
