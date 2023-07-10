import {
  useGetProductCommentQuery,
  usePostCommentMutation,
} from '@/redux/features/product/productApi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { FiSend } from 'react-icons/fi';
import { FormEvent } from 'react';
import { Input } from './ui/input';

export default function ProductReview({ id }: { id: string }) {
  const { data: comments } = useGetProductCommentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [postComment] = usePostCommentMutation();

  const handlePostComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentInput = e.currentTarget['comment'] as HTMLInputElement;
    const value = commentInput.value;

    if (!value.trim()) return;

    const options = {
      id: id,
      data: { comment: value },
    };
    postComment(options);

    commentInput.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form onSubmit={handlePostComment} className="flex gap-5 items-center">
        <Input
          type="text"
          name="comment"
          placeholder="Write a comment..."
          autoComplete="off"
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          {<FiSend />}
        </Button>
      </form>
      <div className="mt-10">
        {comments &&
          comments?.comments?.map((comment: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
