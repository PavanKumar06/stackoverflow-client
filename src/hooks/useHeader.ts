import { ChangeEvent, useState, KeyboardEvent } from 'react';

/**
 * Custom hook to manage the state and logic for a header search input.
 * It handles input changes and triggers a search action on 'Enter' key press.
 *
 * @param search - the initial search query.
 * @param setQuestionPage - function to trigger a search and set the question page based on the query and title.
 *
 * @returns val - the current value of the input.
 * @returns setVal - function to update the value of the input.
 * @returns handleInputChange - function to handle changes in the input field.
 * @returns handleKeyDown - function to handle 'Enter' key press and trigger the search.
 */
const useHeader = ({
  search,
  setQuestionPage,
}: {
  search: string;
  setQuestionPage: (query: string, title: string) => void;
}) => {
  const [val, setVal] = useState<string>(search);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, 'Search Results');
    }
  };

  return {
    val,
    setVal,
    handleInputChange,
    handleKeyDown,
  };
};

export default useHeader;
