import React, { useEffect, useState } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';

export default function Homepage(props) {
  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
    fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => setRoomCode(data.code))
    });

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join A room
          </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create A room
          </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/join' component={RoomJoinPage} />
        <Route path='/create' component={CreateRoomPage} />
        <Route path="/room/:roomCode" component={Room} />
        <Route path='/' render={() => { return roomCode ? <Redirect to={`/room/${roomCode}`} /> : renderHomePage() }} />
      </Switch>
    </BrowserRouter>
  );

};
