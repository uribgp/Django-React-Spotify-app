import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

export default function RoomJoinPage(props) {
  let history = useHistory()
  const [roomCode, setRoomCode ] = useState("")
  const [error, setError ] = useState("")

  function roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        code: roomCode
      })
    };
    fetch('/api/join-room', requestOptions).then((response) => {
      if (response.ok) {
        history.push(`/room/${roomCode}`)
      } else {
        setError('Room not found')
      }
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" align="center">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField 
          error={error} 
          label="Code" 
          placeholder="Enter a Room Code" 
          value={roomCode} 
          helperText={error} 
          variant="outlined"
          onChange={(e) =>   setRoomCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
      <Button variant="contained" color="primary"  onChange={(e) =>   setRoomCode(e.target.value)} onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
      <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )
}
