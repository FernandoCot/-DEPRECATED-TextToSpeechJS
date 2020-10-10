// Core
import React, { useState } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// Icons
import ProceedIcon from '@material-ui/icons/Forward';

// Others
import axios from 'axios';

const App = () => {
  const [textToBeTranslated, setTextToBeTranslated] = useState('');

  const turnTextIntoAudio = () => {
    if (textToBeTranslated) {
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
      <Grid item md={4}>
        <TextField
          label="Digite o texto:"
          value={textToBeTranslated}
          onChange={(e) => setTextToBeTranslated(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <IconButton
          color="primary"
          onClick={() => turnTextIntoAudio()}
        >
          <ProceedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default App;
