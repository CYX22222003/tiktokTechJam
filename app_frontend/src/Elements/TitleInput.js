import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";

export function EditorTitleInput({
  filename,
  setFilename
}) {
  return (
    <React.Fragment>
      <Box
        sx={{
          m: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "justified",
          minWidth: 300,
        }}
      >
        <Box component="form" noValidate sx={{minWidth: 300 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
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
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
