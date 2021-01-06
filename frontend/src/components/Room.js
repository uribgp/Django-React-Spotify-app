import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Homepage(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  let params = useParams()
  console.log(params)
  useEffect(() => getRoomDetails())

  function getRoomDetails(){
    fetch('/api/get-room?code=' + params['roomCode']).then((response) => response.json()).then((data) => {
      console.log(data)
      setVotesToSkip(data.votes_to_skip)
      setGuestCanPause(data.guest_can_pause)
      setIsHost(data.is_host)
    });
  };

  return(
    <div>
      <h3>{params['roomCode']}</h3>
      <p>votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause}</p>
      <p>Host: {isHost}</p>
    </div>
  )
};