import { Editor, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import {
  handleKeyCommand,
  myBlockStyleFn,
  removeStyle,
  styleMap,
  toggleCurrentBlockTypeAndStyle,
} from "../shared/utils";

import { useInitEditorState } from "../hooks/useInitEditorState";

function MyEditor() {
  const [editorState, setEditorState] = useInitEditorState();

  const handleOnChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const text = currentBlock.getText();

    if (text.startsWith("#r ")) {
      return removeStyle(text.substring(3), editorState, setEditorState);
    } else if (text.startsWith("# ")) {
      toggleCurrentBlockTypeAndStyle(
        text.substring(2),
        "header-one",
        "",
        editorState,
        setEditorState
      );

      return "handled";
    }
    if (text.startsWith("*** ")) {
      toggleCurrentBlockTypeAndStyle(
        text.substring(4),
        "unstyled",
        "UNDERLINE",
        editorState,
        setEditorState
      );

      return "handled";
    }
    if (text.startsWith("** ")) {
      toggleCurrentBlockTypeAndStyle(
        text.substring(3),
        "unstyled",
        "RED_LINE",
        editorState,
        setEditorState
      );

      return "handled";
    }
    if (text.startsWith("* ")) {
      toggleCurrentBlockTypeAndStyle(
        text.substring(2),
        "unstyled",
        "BOLD",
        editorState,
        setEditorState
      );

      return "handled";
    }
    if (text.startsWith("``` ")) {
      toggleCurrentBlockTypeAndStyle(
        text.substring(4),
        "code-block",
        "",
        editorState,
        setEditorState
      );

      return "handled";
    }
    setEditorState(editorState);
  };

  const onSave = () => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div className="h-full flex flex-col overflow-auto ">
      <div className="grow overflow-auto border border-ui-gray p-2 bg-ui-gray rounded-md">
        <Editor
          editorState={editorState}
          placeholder="Enter your content here"
          onChange={handleOnChange}
          handleKeyCommand={(command, editorState) =>
            handleKeyCommand(command, editorState, setEditorState)
          }
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
        />
      </div>
      <div className="basis my-2 flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 font-semibold bg-green-500 rounded-lg hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default MyEditor;
