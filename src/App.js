// Core
import React, { useState } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import ProceedIcon from '@material-ui/icons/Forward';

// Others
import axios from 'axios';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [textToBeTranslated, setTextToBeTranslated] = useState('');

  const turnTextIntoAudio = () => {
    if (textToBeTranslated) {
      setLoading(true);
      let data = {
        audioConfig: {
          pitch: 0,
          speakingRate: 0.85,
          audioEncoding: 'MP3',
        },
        input: { text: textToBeTranslated },
        voice: {
          languageCode: "pt-BR",
          name: "pt-BR-Standard-A",
        }
      }

      axios.post('https://texttospeech.googleapis.com/v1/text:synthesize', data, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': `*`})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => setLoading(false))
    } else {
      alert('O texto é obrigatório!');
    }
  }

  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="center"
    >
      <Typography style={{ margin: '20px auto' }}>
        (Google) Text to Speech Studies
      </Typography>
      <Grid
        container
        item
        md={3}
        justify="center"
        alignItems="center"
      >
        <TextField
          multiline
          variant="outlined"
          disabled={isLoading}
          label="Digite o texto:"
          value={textToBeTranslated}
          style={{ marginRight: 15 }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setTextToBeTranslated(e.target.value)}
        />
        {!isLoading && (
          <IconButton
            color="primary"
            disabled={isLoading}
            onClick={() => turnTextIntoAudio()}
          >
            <ProceedIcon />
          </IconButton>
        )}
        {isLoading && (
          <CircularProgress color="primary" />
        )}
      </Grid>
    </Grid>
  );
}

export default App;
