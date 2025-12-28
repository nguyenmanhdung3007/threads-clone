import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Ellipsis, Ghost, Plus } from "lucide-react";
import { Link } from "react-router";
import PostCardContent from "./PostCardContent";
import Metric from "./Metric";
import AvatarPost from "./AvatarPost";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import PostCard from "./PostCard";
import { randomMetrics, randomTimeAgo } from "@/lib/mockData";

function  ({ post, comments, onOpenCommentModal }) {
  const { author, body, metrics, created, id } = post;
  const commentsData = comments;
  console.log(commentsData);
  console.log({ author, body, metrics, created, id });

  return (
    <>
      {/* renderPost */}
      <div className="flex w-full flex-col items-start gap-2 border-b p-3">
        {/* Post info */}

        <div className="flex w-full gap-3">
          {/* Avatar */}
          <AvatarPost author={author} />
          {/* Post header */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/:username" className="font-semibold">
                {author.name}
              </Link>
              <span className="text-gray-400">{created}</span>
            </div>

            <Button variant="ghost" className="flex-none rounded-full">
              <Ellipsis />
            </Button>
          </div>
        </div>
        {/* Post content */}
        <div className="border-b">
          {/* <Link to={`/${author.username}/post/${id}`}> */}
          <div className="">
            <PostCardContent content={body} />
          </div>
          <Metric metrics={metrics} onCommentClick={onOpenCommentModal} />
          {/* </Link> */}
        </div>

        {/* Post Header */}

        <div className="flex w-full justify-between">
          <div>
            <Select className="border-none shadow-none outline-none">
              <SelectTrigger className="focus-visible:ring-ring/0 border-none shadow-none outline-none focus-visible:border-none *:data-[slot=select-value]:text-base *:data-[slot=select-value]:font-semibold *:data-[slot=select-value]:text-black">
                <SelectValue
                  className="*:data-[slot=select-value]:font-semibold"
                  placeholder="Top"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Select className="border-none shadow-none outline-none">
            <SelectTrigger className="focus-visible:ring-ring/0 border-none shadow-none outline-none focus-visible:border-none *:data-[slot=select-value]:text-base *:data-[slot=select-value]:font-normal [&_svg]:rotate-270">
              <SelectValue className="" placeholder="View activity" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      {/* renderComments */}
      <div>
        {commentsData.map((comment) => {
          const commentData = {
            ...comment,
            author: {
              name: comment.email.split("@")[0],
              username: comment.email.split("@")[0],
              avatarUrl: "https://avatar.iran.liara.run/public",
            },
            metrics: {
              comments: randomMetrics().comments, // dùng từ API
              likes: randomMetrics().likes,
              shares: randomMetrics().shares,
            },
            created: randomTimeAgo(),
          };

          return <PostCard key={commentData.id} post={commentData} />;
        })}
      </div>
    </>
  );
}

export default  ;
