import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { PrimaryButton } from "../../domains/button/PrimaryButton";
import { NiceText } from "../../domains/input/NiceText";

export interface ChatFormProps {
  disabled?: boolean;
  input: string;
  onInputChange: (input: string) => void;
  onSubmit: (input: string) => void;
  onToolsClick: () => void;
}

export function ChatForm({
  disabled,
  input,
  onInputChange,
  onSubmit,
  onToolsClick,
}: ChatFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <form className="ChatForm" onSubmit={onFormSubmit}>
      <fieldset className="flex flex-col gap-1" disabled={disabled}>
        <NiceText
          className="flex-grow"
          onChange={(v) => onInputChange(v.currentTarget.value)}
          placeholder="What is the HTML?"
          value={input}
        />
        <div className="flex flex-row-reverse gap-1 justify-between">
          <PrimaryButton type="submit">📨 Send</PrimaryButton>
          <NiceButton onClick={onToolsClick} type="button">
            🛠️ Tools...
          </NiceButton>
        </div>
      </fieldset>
    </form>
  );
}
