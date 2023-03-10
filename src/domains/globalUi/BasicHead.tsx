import Head from "next/head";
import { appTitle } from "../app/static";
import { AppFavicon } from "./AppFavicon";

export interface BasicHeadProps {
  description?: string;
  title?: string;
}

export function BasicHead({ description, title }: BasicHeadProps): JSX.Element {
  return (
    <Head>
      <title>{title ? `${title} - ${appTitle}` : appTitle}</title>
      {description && <meta name="description" content={description} />}
      <AppFavicon />
    </Head>
  );
}
