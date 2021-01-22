import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Typography, TextField, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';
import { Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function CreateRoomPage({guestCanPause, update, updateCallback}) {
  let history = useHistory();
  let { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // const [roomCode, setRoomCode] = useState(roomCodeParams);

  function handleVotesChange(e) {
    setVotesToSkip(e.target.value);
  }

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value === 'true' ? true : false);
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
      .then((data) => history.push(`/room/${data.code}`));
  }

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room Updated")
        } else {
          setError("Error Updating Room")
        }
      });
    updateCallback();
  }

  function renderCreateButtons() {
    return (<>
      {/* <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={(e) => setRoomCode(e.target.value)}
        />
      </Grid>  */}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onChange={(e) => setRoomCode(e.target.value)} onClick={handleRoomButtonPressed}>
          Create A Room
  </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
  </Button>
      </Grid>
    </>
    )
  }

  function renderUpdateButtons() {
    return (
    <>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onChange={(e) => setRoomCode(e.target.value)} onClick={handleUpdateButtonPressed}>
          Update Room
        </Button>
      </Grid>
    </>
    )
  }

  const title = update ? "Update Room" : "Create Room"

  // 12 is max grid spaces, xs fills up the grid
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
      <Collapse in={ error != "" || successMsg != ""}>
        {successMsg != "" ? (<Alert severity="success" onClose={()=> setSuccessMsg("")}>{successMsg}</Alert>) : (<Alert severity="error" onClose={()=> setError("")}>{error}</Alert>)}
      </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component='fieldset'>
          <FormHelperText>
            <div align='center'>
              Guest Control of Playback State
          </div>
          </FormHelperText>
          <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
            <FormControlLabel value='true' control={<Radio color="primary" />} label="Play/Pause" labelPlacement="Bottom" />
            <FormControlLabel value='false' control={<Radio color="secondary" />} label="No Control" labelPlacement="Bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} type="number" defaultValue={votesToSkip} inputProps={{ min: 1, style: { textAlign: "center" } }} onChange={handleVotesChange} />
          <FormHelperText>
            <div align="center">
              Votes Required to Skip Song: { votesToSkip }
          </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  )
}
