import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage";

export default function Homepage(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  let history = useHistory()
  let params = useParams()
  
  const roomCode = params['roomCode']
  
  useEffect(() => getRoomDetails())

  function getRoomDetails() {
    fetch('/api/get-room?code=' + params['roomCode']).then((response) => response.json()).then((data) => {

      setVotesToSkip(data.votes_to_skip)
      setGuestCanPause(data.guest_can_pause)
      setIsHost(data.is_host)
    });
  };

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }
    fetch('/api/leave-room', requestOptions).then((_response) => {
      history.push("/")
    });
  };

  function updateShowSettings(value) {
    setShowSettings(value);
  };


  function renderSettingsButton() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button variant="contained"
            color="primary"
            onClick={() => updateShowSettings(true)}
          >
            Settings
        </Button>
        </Grid>
      </Grid>
    );
  };

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <CreateRoomPage 
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={() => { }}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowSettings(false)}
          >
            Close
        </Button>
        </Grid>
      </Grid>
    );
  };

  if (showSettings) return renderSettings();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {params['roomCode']}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost}
        </Typography>
      </Grid>
      {isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  )
};
