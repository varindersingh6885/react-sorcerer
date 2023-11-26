import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./Header";
import MyEditor from "./MyEditor";

export const AppLayout = () => {
  return (
    <>
      <div className="bg-ui-black h-[100vh] w-[100vw] p-4 gap-3 flex flex-col">
        <div className="basis">
          <Header headingText={"Demo Editor by Varinder Singh"} />
        </div>
        <div className="grow overflow-auto">
          <MyEditor />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
