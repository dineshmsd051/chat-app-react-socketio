import React, { useState } from 'react';
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");


function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)


  const joinRoom = (event) => {
    event.preventDefault()

    if(!username || !room) {
      alert('username and room id is mandatory!')
      return
    }

    socket.emit('join_room', room)
    setShowChat(true)
  }

  return (
    <div className="App">
      {!showChat ? 
        <div className="joinChatContainer">
          <h3 className='main-logo'>YOU AND ME <span color='#305fd7'>!</span></h3>
          <h4><u>Join a Private Chat</u></h4>
          <input type="text" id='username' value={username} placeholder='Enter the username...' onChange={(event) => setUsername(event.target.value)}/>

          <input type="text" id='room' value={room} placeholder='Enter the passkey...' onChange={(event) => setRoom(event.target.value)}/>
          <button type="submit" onClick={joinRoom}>Submit</button>
            <br />
          <div style={{border: '1px solid black', borderRadius: '20px', paddingInline: '30px'}}>
            <p><b>Note:</b></p>
            <p><b> Share a entered room passkey to your friends or whom to chat with</b></p>
            <p><b>Messages will only visible to member who is in same Room passkey</b></p>
          </div>
          <p>Just a simple app made with react, nodejs and socket.io</p>
          <p>credits to <a href="https://youtu.be/NU-HfZY3ATQ" target='_blank' rel="noopener noreferrer"><b style={{color: 'red'}}>Pedro Tech</b></a></p>
        </div>
      : <Chat socket={socket} username={username} room={room} /> }
    </div>
  );
}

export default App;
