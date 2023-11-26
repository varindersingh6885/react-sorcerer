import {
  ContentBlock,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

export const styleMap = {
  RED_LINE: {
    color: "red",
  },
  UNDERLINE: {
    textDecoration: "underline",
  },
};

export const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === "code-block") {
    return "highlightedCodeBlock";
  }
};

export const handleKeyCommand = (command, editorState, setEditorState) => {
  const newState = RichUtils.handleKeyCommand(editorState, command);

  if (newState) {
    setEditorState(newState);
    return "handled";
  }

  return "not-handled";
};

export const toggleCurrentBlockTypeAndStyle = (
  newText,
  blockType,
  blockStyle,
  editorState,
  setEditorState
) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const currentBlock = contentState.getBlockForKey(selection.getStartKey());

  // const newBlock = new ContentBlock();
  //  .clear();
  const newBlock = currentBlock.merge({
    text: "",
    type: blockType,
  });

  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(selection.getStartKey(), newBlock),
  });

  let newEditorState = EditorState.createWithContent(
    // editorState,
    newContentState
    // "change-block-data"
  );

  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: 0,
  });
  newEditorState = EditorState.forceSelection(newEditorState, newSelection);
  setEditorState(RichUtils.toggleInlineStyle(newEditorState, blockStyle));
  // RichUtils.toggleInlineStyle(newEditorState, blockStyle)
};

export const removeStyle = (newText, editorState, setEditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectionKey = selection.getStartKey();

  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: 0,
  });

  const rawState = convertToRaw(contentState);
  rawState.blocks = rawState?.blocks?.map((block) =>
    block.key === selectionKey
      ? { ...block, text: newText, type: "unstyled", inlineStyleRanges: [] }
      : block
  );

  const newContent = convertFromRaw(rawState);

  let newEditorState = EditorState.createWithContent(newContent);
  newEditorState = EditorState.forceSelection(newEditorState, newSelection);

  setEditorState(newEditorState);
};
