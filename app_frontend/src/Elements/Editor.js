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
import Box from "@mui/material/Box"
import React, { useRef, useState } from "react";

export default function Editor() {
  const rteRef = useRef(null);
  const [text, setText] = useState("");
  return (
    <React.Fragment>
      <Box>
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
        Save
      </Button>
      </Box>
    </React.Fragment>
  );
}