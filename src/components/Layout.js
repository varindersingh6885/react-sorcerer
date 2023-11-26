import { Header } from "./Header";
import MyEditor from "./MyEditor";

export const AppLayout = () => {
  return (
    <div className="bg-ui-black h-[100vh] w-[100vw] p-4 gap-3 flex flex-col">
      <div className="basis">
        <Header headingText={"Demo Editor by Varinder Singh"} />
      </div>
      <div className="grow overflow-auto">
        <MyEditor />
      </div>
    </div>
  );
};
