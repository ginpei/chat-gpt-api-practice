import { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
import { PrimaryButton } from "../../../domains/button/PrimaryButton";
import { NiceText } from "../../../domains/input/NiceText";
import { Container } from "../../../domains/layout/Container";

export interface ImageFormProps {
  asideContent: ReactNode;
  data: ImageFormData;
  disabled: boolean;
  onChange: (data: ImageFormData) => void;
  onSubmit: (data: ImageFormData) => void;
}

export interface ImageFormData {
  prompt: string;
}

export function ImageForm({
  asideContent,
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

  return (
    <div className="ImageForm [&>*]:h-full">
      <Container>
        <div className="grid grid-rows-[auto_min-content] h-full grid-cols-2 gap-2">
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
          <div className="row-start-2">{asideContent}</div>
        </div>
      </Container>
    </div>
  );
}
