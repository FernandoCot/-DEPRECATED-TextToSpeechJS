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
import testAudio from '../src/audioTest.mp3';
import AudioPlayer from 'material-ui-audio-player';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [formattedAudio, setFormattedAudio] = useState(testAudio);
  const [textToBeTranslated, setTextToBeTranslated] = useState('');

  const turnTextIntoAudio = () => {
    if (textToBeTranslated) {
      console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      setLoading(true);
      setFormattedAudio(null);
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

      axios.post('https://texttospeech.googleapis.com/v1/text:synthesize', data, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        .then((response) => {
          console.log(response);
          // setFormattedAudio(response);
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
        style={{ marginBottom: 30 }}
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
      {formattedAudio && (
        <Grid
          container
          item
          md={3}
          justify="center"
          alignItems="center"
        >
          <AudioPlayer
            elevation={1}
            width="400px"
            download={true}
            variation="primary"
            src={formattedAudio}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
