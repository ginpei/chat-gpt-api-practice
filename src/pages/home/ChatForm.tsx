import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { NiceInput } from "../../domains/input/NiceInput";
import { HStack } from "../../domains/layout/HStack";

export interface ChatFormProps {
  disabled?: boolean;
  input: string;
  onInputChange: (input: string) => void;
  onSubmit: (input: string) => void;
}

export function ChatForm({
  disabled,
  input,
  onInputChange,
  onSubmit,
}: ChatFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <form className="ChatForm" onSubmit={onFormSubmit}>
      <fieldset className="contents" disabled={disabled}>
        <HStack>
          <NiceInput
            className="flex-grow"
            onChange={(v) => onInputChange(v.currentTarget.value)}
            placeholder="What is the HTML?"
            type="text"
            value={input}
          />
          <NiceButton>Send</NiceButton>
        </HStack>
      </fieldset>
    </form>
  );
}
