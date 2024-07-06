//import { Button } from "@mui/material";
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
import React, { useRef } from "react"

export default function Editor({text, setText}) {
  const rteRef = useRef(null);
  
  return (
    <React.Fragment>
      <Box>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]}
        content={text}
        onUpdate={(data) => {
          setText(data?.editor.getText() ?? text)
        }}
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
          </MenuControlsContainer>
        )}
      />
      </Box>
    </React.Fragment>
  );
}