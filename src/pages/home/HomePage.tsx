import dynamic from "next/dynamic";
import { BasicHead } from "../../domains/globalUi/BasicHead";
import { HeadLine } from "../../domains/globalUi/HeadLine";
import { ContextsProvider } from "./ContextsProvider";

// to access localStorage in rendering
const ChatSection = dynamic(
  () => import("./ChatSection").then((mod) => mod.ChatSection),
  {
    ssr: false,
  }
);

export function HomePage(): JSX.Element {
  return (
    <ContextsProvider>
      <BasicHead />
      <style>{
        /*css*/ `
          html,
          body,
          #__next {
            height: 100%;
          }
        `
      }</style>
      <div className="HomePage h-full flex flex-col [html]:h-full">
        <HeadLine />
        <div className="overflow-hidden flex-grow [&>*]:h-full">
          <ChatSection />
        </div>
      </div>
    </ContextsProvider>
  );
}
