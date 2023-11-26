import { EditorState, convertFromRaw } from "draft-js";
import { useState } from "react";

export const useInitEditorState = () => {
  const [editorState, setEditorState] = useState(() => {
    const localStorageContent = localStorage.getItem("editorContent") || "";
    if (localStorageContent?.length) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(localStorageContent))
      );
    }

    return EditorState.createEmpty();
  });

  return [editorState, setEditorState];
};
