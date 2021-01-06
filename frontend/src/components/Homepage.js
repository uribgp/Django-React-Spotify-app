import React from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

export default function Homepage(props) {

  return(
    <BrowserRouter>
      <Switch>
        <Route path='/join' component={RoomJoinPage} />
        <Route path='/create' component={CreateRoomPage} />
        <Route exact path='/'><p>this is the homepage</p></Route>
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </BrowserRouter>
  )
}
