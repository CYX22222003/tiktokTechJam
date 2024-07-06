import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export function EditorTitleInput({
  filename,
  setFilename
}) {
  return (
    <React.Fragment>
      <Box
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 500,
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3, minWidth: 500 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="Filename"
                required
                fullWidth
                id="Filename"
                label="Filename"
                autoFocus
                onChange={(e) => {
                    setFilename(e.target.value);
                    console.log(filename);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
