import React, { ChangeEvent, useRef, useState } from "react";

export interface UseFormInputResult {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setValue: (value: string) => void;
  validate: () => boolean;
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  showErrorMessage: (message: string) => void;
}

interface UseFormInputProps {
  initialValue?: string;
  validateFn?: (value: string) => string;
  maxLength?: number;
}

export const useFormInput = ({
  initialValue = "",
  maxLength,
  validateFn = (value) => value,
}: UseFormInputProps = {}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (inputRef.current) {
      inputRef.current.setCustomValidity("");
    }

    const length = event.target.value.length;

    if (maxLength && length >= maxLength) {
      showErrorMessage(`글자수를 ${maxLength} 이하로 입력해주세요.`);
    }

    setValue(event.target.value);
  };

  const validate = () => {
    const validationError = validateFn(value);

    showErrorMessage(validationError);

    return !validationError;
  };

  const showErrorMessage = (message: string) => {
    if (!inputRef.current) return;

    inputRef.current.setCustomValidity(message);
    inputRef.current.reportValidity();
  };

  const resetInputValue = () => {
    setValue("");

    if (inputRef.current) {
      inputRef.current.setCustomValidity("");
    }
  };

  return {
    value,
    onChange,
    resetInputValue,
    setValue,
    validate,
    inputRef,
    showErrorMessage,
  };
};
