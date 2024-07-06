import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { AppBar, Copyright } from './MiscElements';
import Editor from './Editor';
import { EditorTypeSelect, EditorFormalitySelect } from './Selection';
import { EditorTitleInput } from './TitleInput';
import { types, formalities } from '../utils/const';
import { AIActionCall } from '../utils/utils';
import AIMessageDisplay from './Display';
import MySnackbar from './Prompt';

const defaultTheme = createTheme();

export default function Background() {
  const open = false;
  const [text, setText] = useState("");
  const [type, setType] = useState(0);
  const [title, setTitle] = useState("");
  const [formality, setFormality] = useState(0);
  const [aiResponse, setAIResponse] = useState("");
  const [openPrompt, setOpenPrompt] = useState(false);
  const [promptMsg , setPromptMsg] = useState("");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              AI Writing Assistant
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={20} md={8} lg={9}>
                <EditorTitleInput 
                  filename={title}
                  setFilename={setTitle}
                />
              </Grid>
              {/* Context */}
              <Grid item xs={20} md={8} lg={9}>
                <EditorTypeSelect 
                  type={type} 
                  setType={setType} 
                  typeList={types} />
              </Grid>
              <Grid item xs={20} md={8} lg={9}>
                <EditorFormalitySelect 
                  formality={formality}
                  setFormality={setFormality}
                  formalityList={formalities}
                />
              </Grid>
              {/* Editor */}
              <Grid item xs={20} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <Editor text={text} setText={setText} /><br />
                  <Button 
                  variant='contained'
                  onClick={async () => {
                    const data = {
                      "name" : title,
                      "article_type" : type,
                      "formality" : formality,
                      "body" : text
                    }
                    const res = await AIActionCall(data)
                      .then(r => r.json())
                      .then(out => {
                        const f = out["AIResponse"];
                        setPromptMsg("AI Response is loaded");
                        setOpenPrompt(true);
                        return f;
                      })
                      .catch((err) => {
                        setPromptMsg("Fail to load AI resources")
                        setOpenPrompt(true);
                        throw new Error(err);
                      })
                    console.log(res);
                    setAIResponse(res);
                  }}>
                    Submit
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={20} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <AIMessageDisplay aiResponse={aiResponse}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <MySnackbar 
        open={openPrompt} 
        setOpen={setOpenPrompt}
        message={promptMsg}
      />
    </ThemeProvider>
  );
}