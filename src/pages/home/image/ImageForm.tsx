import { ChangeEventHandler, FormEventHandler } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { PrimaryButton } from "../../../domains/button/PrimaryButton";
import { NiceText } from "../../../domains/input/NiceText";
import { Container } from "../../../domains/layout/Container";
import { VStack } from "../../../domains/layout/VStack";

export interface ImageFormProps {
  data: ImageFormData;
  onChange: (data: ImageFormData) => void;
  onSubmit: (data: ImageFormData) => void;
}

export interface ImageFormData {
  prompt: string;
}

export function ImageForm({
  data,
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
    <form className="ImageForm p-4" onSubmit={onFormSubmit}>
      <Container>
        <VStack>
          <NiceText onChange={onPromptChange} value={data.prompt} />
          <div className="flex flex-row-reverse justify-between">
            <PrimaryButton>Generate image</PrimaryButton>
            <NiceButton disabled>Tools...</NiceButton>
          </div>
        </VStack>
      </Container>
    </form>
  );
}
