import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Ellipsis, Ghost, Plus } from "lucide-react";
import { Link } from "react-router";
import PostCardContent from "./PostCardContent";
import Metric from "./Metric";
import AvatarPost from "./AvatarPost";

function PostCard({ post }) {
  const { author, body, metrics, created, id } = post;

  return (
    <div className="flex w-full items-start gap-2 border-b p-3">
      {/* Avatar */}
      <AvatarPost author={author} />

      {/* Post info */}

      <div className="w-full">
        {/* Post header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/${author.username}`} className="font-semibold">
              {author.name}
            </Link>
            <span className="text-gray-400">{created}</span>
          </div>

          <Button variant="ghost" className="flex-none rounded-full">
            <Ellipsis />
          </Button>
        </div>

        {/* Post content */}
        <Link to={`/${author.username}/post/${id}`}>
          <div className="">
            <PostCardContent content={body} />
          </div>
          <Metric metrics={metrics} />
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
