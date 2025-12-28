import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function CommentModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bài post ở đây</DialogTitle>
          <DialogDescription>Thêm comment ở đây</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CommentModal;
