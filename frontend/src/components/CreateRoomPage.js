import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';


export default function CreateRoomPage(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(true);

  function handleVotesChange(e){
    setVotesToSkip(e.target.value);
  }

  function handleGuestCanPauseChange(e){
    setGuestCanPause(e.target.value == 'true' ? true : false);
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  // 12 is max grid spaces, xs fills up the grid
  return (
  <Grid container spacing={1}>
    <Grid item xs={12} align="center">
      <Typography component='h4' variant='h4'>
        Create a Room
      </Typography>
    </Grid>
    <Grid item xs={12} align="center">
      <FormControl component='fieldset'>
        <FormHelperText>
          <div align='center'>
            Guest Control of Playback State
          </div>
        </FormHelperText>
        <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
          <FormControlLabel value='true' control={<Radio color="primary" />} label="Play/Pause" labelPlacement="Bottom" />
          <FormControlLabel value='false' control={<Radio color="secondary" />} label="No Control" labelPlacement="Bottom" />
        </RadioGroup>
      </FormControl>
    </Grid>
    <Grid item xs={12} align="center">
      <FormControl>
        <TextField required={true} type="number" defaultValue={votesToSkip} inputProps={{min: 1, style: {textAlign: "center"}}} onChange={handleVotesChange}/>
        <FormHelperText>
          <div align="center">
            Votes Required to Skip Song: 2
          </div>
        </FormHelperText>
      </FormControl>
    </Grid>
    <Grid item xs={12} align="center">
      <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
    </Grid>
    <Grid item xs={12} align="center">
      <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
    </Grid>
  </Grid>
  )
}
