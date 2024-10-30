import { useEffect, useState } from 'react';
import { Question, VoteData } from '../types';
import useUserContext from './useUserContext';

/**
 * Custom hook to handle voting logic for a question.
 * It manages the current vote count, user vote status (upvoted, downvoted),
 * and handles real-time vote updates via socket events.
 *
 * @param question - The question object for which the voting is tracked.
 *
 * @returns count - The urrent vote count (upVotes - downVotes)
 * @returns setCount - The function to manually update vote count
 * @returns voted - The user's vote status
 * @returns setVoted - The function to manually update user's vote status
 */

const useVoteStatus = ({ question }: { question: Question }) => {
  const { user, socket } = useUserContext();
  const [count, setCount] = useState<number>(0);
  const [voted, setVoted] = useState<number>(0);

  useEffect(() => {
    const getVoteValue = () => {
      if (user.username && question?.upVotes?.includes(user.username)) {
        return 1;
      }
      if (user.username && question?.downVotes?.includes(user.username)) {
        return -1;
      }
      return 0;
    };

    // Set the initial count and vote value
    setCount((question.upVotes || []).length - (question.downVotes || []).length);
    setVoted(getVoteValue());

    // Handle vote updates from the socket
    const handleVoteUpdate = (voteData: VoteData) => {
      if (voteData.qid === question._id) {
        setCount(voteData.upVotes.length - voteData.downVotes.length);

        // Update vote status for the current user
        let voteValue: number = 0;

        if (voteData.upVotes.includes(user.username)) {
          voteValue = 1;
        } else if (voteData.downVotes.includes(user.username)) {
          voteValue = -1;
        }

        setVoted(voteValue);
      }
    };

    socket.on('voteUpdate', handleVoteUpdate);

    return () => {
      socket.off('voteUpdate', handleVoteUpdate);
    };
  }, [question, user.username, socket]);

  return {
    count,
    setCount,
    voted,
    setVoted,
  };
};

export default useVoteStatus;
