// Core
import React, { useState } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// Icons
import ProceedIcon from '@material-ui/icons/Forward';

const App = () => {
  const [textToBeTranslated, setTextToBeTranslated] = useState('');

  const turnTextIntoAudio = () => {
    if (textToBeTranslated) {
      alert('Dale');
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
