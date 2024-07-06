import { Button } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor
} from "mui-tiptap";
import { useRef, useState } from "react";

export default function Editor() {
  const rteRef = useRef(null);
  const [text, setText] = useState("");
  return (
    <div>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]}
        content=""
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
          </MenuControlsContainer>
        )}
      />

      <Button onClick={() => {
        setText(rteRef.current?.editor?.getText());
        console.log(text)
      }}>
        Log HTML
      </Button>
    </div>
  );
}