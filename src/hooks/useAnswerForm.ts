import { useState } from 'react';
import { validateHyperlink } from '../tool';
import addAnswer from '../services/answerService';
import useUserContext from './useUserContext';
import { Answer } from '../types';

/**
 * Interface representing the props for the userAnswerForm custom hook.
 *
 * - qid - question ID to which the answer is being posted
 * - handleAnswer - a callback function to handle updates after an answer is posted
 */
interface UseAnswerFormProps {
  qid: string;
  handleAnswer: (qid: string) => void;
}

/**
 * Custom hook for managing the state and logic of an answer submission form.
 *
 * @param qid question ID to which the answer is being posted
 * @param handleAnswer a callback function to handle updates after an answer is posted
 *
 * @returns text - the current text input for the answer.
 * @returns textErr - the error message related to the text input.
 * @returns setText - the function to update the answer text input.
 * @returns postAnswer - the function to submit the answer after validation.
 */
const useAnswerForm = ({ qid, handleAnswer }: UseAnswerFormProps) => {
  const { user } = useUserContext();
  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');

  const postAnswer = async () => {
    let isValid = true;

    if (!text) {
      setTextErr('Answer text cannot be empty');
      isValid = false;
    }

    // Hyperlink validation
    if (!validateHyperlink(text)) {
      setTextErr('Invalid hyperlink format.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const answer: Answer = {
      text,
      ansBy: user.username,
      ansDateTime: new Date(),
      comments: [],
    };

    const res = await addAnswer(qid, answer);
    if (res && res._id) {
      handleAnswer(qid);
    }
  };

  return {
    text,
    textErr,
    setText,
    postAnswer,
  };
};

export default useAnswerForm;
