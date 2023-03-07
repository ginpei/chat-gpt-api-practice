import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";

export interface ChatFormProps {
  input: string;
  onInputChange: (input: string) => void;
  onSubmit: (input: string) => void;
}

export function ChatForm({
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
      <input
        className="border"
        onChange={(v) => onInputChange(v.currentTarget.value)}
        type="text"
        value={input}
      />
      <NiceButton>Send</NiceButton>
    </form>
  );
}
