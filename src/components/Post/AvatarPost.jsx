import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function AvatarPost({ author }) {
  return (
    <div className="relative size-9">
      <Avatar className="relative">
        <AvatarImage src={author.avatarUrl} />
        {/* trường hợp không render được ảnh thì lấy tên 2 chữ cái đầu */}
        <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
      </Avatar>

      <Button
        size="icon"
        className="absolute right-0 bottom-0 size-4 cursor-pointer rounded-full border-2 border-white bg-black hover:scale-110 dark:border-black dark:bg-white"
      >
        <Plus className="size-2 stroke-3 text-white dark:text-black" />
      </Button>
    </div>
  );
}

export default AvatarPost;
