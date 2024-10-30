/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';

import HomePageClass from '../components/main/routing/home';
import TagPageClass from '../components/main/routing/tag';
import AnswerPageClass from '../components/main/routing/answer';
import NewQuestionPageClass from '../components/main/routing/newQuestion';
import NewAnswerPageClass from '../components/main/routing/newAnswer';
import { OrderType } from '../types';

/**
 * Interface representing the props for the useMainPage custom hook.
 *
 * - search - an optional search query used to filter content on the page.
 * - title - the title of the current page.
 * - setQuestionPage - the function to set the current page based on the optional search query
 *                     and optional title.
 */
interface MainProps {
  search?: string;
  title: string;
  setQuestionPage: (search?: string, title?: string) => void;
}

/**
 * Custom hook to manage the page rendering logic and routing within the main component.
 * It handles different pages such as the home page, tag page, answer page, and new
 * question/answer pages.
 *
 * @param search - an optional search query used to filter content on the page.
 * @param title - the title of the current page.
 * @param setQuestionPage - the function to set the current page based on the search and title.
 *
 * @returns pageInstance - the current instance of the page being displayed.
 * @returns handleQuestions - the function to switch to the questions page.
 * @returns handleTags - the function to switch to the tags page.
 * @returns handleAnswer - the function to switch to the answer page for a specific question.
 * @returns clickTag - the function to switch to the tag view for a specific tag.
 */
const useMainPage = ({ search = '', title, setQuestionPage }: MainProps) => {
  const [questionOrder, setQuestionOrder] = useState<OrderType>('newest');
  const [qid, setQid] = useState<string>('');

  const handleQuestions = () => {
    setQuestionPage();
    setPageInstance(
      new HomePageClass({
        search,
        title: 'All Questions',
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleTags = () => {
    setPageInstance(
      new TagPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleAnswer = (questionID: string) => {
    setQid(questionID);
    setPageInstance(
      new AnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid: questionID,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const clickTag = (tname: string) => {
    setQuestionPage(`[${tname}]`, tname);
    setPageInstance(
      new HomePageClass({
        search,
        title: tname,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewQuestion = () => {
    setPageInstance(
      new NewQuestionPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewAnswer = () => {
    setPageInstance(
      new NewAnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const [pageInstance, setPageInstance] = useState(
    new HomePageClass({
      search,
      title,
      setQuestionPage,
      questionOrder,
      setQuestionOrder,
      qid,
      handleQuestions,
      handleTags,
      handleAnswer,
      clickTag,
      handleNewQuestion,
      handleNewAnswer,
    }),
  );

  pageInstance.search = search;
  pageInstance.questionOrder = questionOrder;
  pageInstance.qid = qid;

  return { pageInstance, handleQuestions, handleTags, handleAnswer, clickTag };
};

export default useMainPage;
