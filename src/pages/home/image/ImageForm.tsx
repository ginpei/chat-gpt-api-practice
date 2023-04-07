import { ChangeEventHandler, FormEventHandler } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { PrimaryButton } from "../../../domains/button/PrimaryButton";
import { NiceText } from "../../../domains/input/NiceText";
import { Container } from "../../../domains/layout/Container";
import { VStack } from "../../../domains/layout/VStack";

export interface ImageFormProps {
  data: ImageFormData;
  disabled: boolean;
  onChange: (data: ImageFormData) => void;
  onSubmit: (data: ImageFormData) => void;
}

export interface ImageFormData {
  prompt: string;
}

export function ImageForm({
  data,
  disabled,
  onChange,
  onSubmit,
}: ImageFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  const onPromptChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const prompt = event.currentTarget.value;
    onChange({ ...data, prompt });
  };

  const onToolsClick = () => {
    // TODO
    console.log(`# onToolsClick`);
  };

  return (
    <Container>
      <div className="ImageForm grid grid-rows-2 grid-cols-2 gap-2">
        <form className="contents" onSubmit={onFormSubmit}>
          <fieldset className="contents" disabled={disabled}>
            <div className="col-span-full grid">
              <NiceText onChange={onPromptChange} value={data.prompt} />
            </div>
            <div className="col-start-2 text-right">
              <PrimaryButton>Generate image</PrimaryButton>
            </div>
          </fieldset>
        </form>
        <div className="row-start-2">
          <NiceButton onClick={onToolsClick}>Tools...</NiceButton>
        </div>
      </div>
    </Container>
  );
}
