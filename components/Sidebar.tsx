import Image from "next/image";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react";

const Sidebar = () => {
  return (
    <div>
      <div className="relative h-10 w-10">
        <Image
          src="https://links.papareact.com/drq"
          alt="Twitter logo"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default Sidebar;
