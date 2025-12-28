import { Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { Button } from "../ui/button";

function Metric({ metrics, onCommentClick }) {
  return (
    <div className="mt-1.5 flex h-9 items-center text-gray-600">
      <Button variant="ghost" variant="ghost" className="flex gap-1">
        <Heart className="w-5" />
        {metrics.likes}
      </Button>
      <Button
        variant="ghost"
        className="flex gap-1"
        onClick={(e) => {
          e.preventDefault();
          onCommentClick();
        }}
      >
        <MessageCircle className="w-5" />
        {metrics.comments}
      </Button>
      <Button variant="ghost" className="flex gap-1">
        <Repeat className="w-5" />
        {metrics.reposts}
      </Button>
      <Button variant="ghost" className="flex gap-1">
        <Send className="w-5" />
      </Button>
    </div>
  );
}

export default Metric;
