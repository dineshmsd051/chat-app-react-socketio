import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ( { socket, username, room } ) => {

  const [currentMessage, setCurrentMessage] = useState('')
  const [messagesList, setMessagesList] = useState('')


  useEffect(() => {
    socket.on('receive_message', (data) => {
      //enable this to save chats
      setMessagesList((prevList) => [...prevList, data])
      // setMessagesList(data)
    })
  }, [socket])
  
  const sendMessage = async () => {
    if(currentMessage !=='') {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }
      await socket.emit('send_message', messageData)
      setMessagesList((prevList) => [...prevList, messageData]);
      setCurrentMessage("");
    }
  }

  return (  
    <div>
      <div style={{border: '1px solid black', borderRadius: '20px', paddingInline: '30px'}}>
        <p><b>Note:</b></p>
        <p><b>Messages will only visible to member who is in same Room passkey</b></p>
        <p><b>We are not saving messages everywhere</b></p>
        <p><b>Leaving or Refreshing will delete everything</b></p>
      </div>
      <div className='chat-window'>
        <div className="chat-header"> <p>Private Chat</p> </div>
        <div className="chat-body">
          <ScrollToBottom className='message-container'>
            {messagesList && messagesList.map((eachMessage) => {
              return <div>
                <div className="message" id={username === eachMessage.user ? 'other' : 'you'}>
                  <div>
                    <div className="message-content">{eachMessage.message}</div>
                    <div className="message-meta"> 
                      <p id='time'>{eachMessage.time}</p> 
                      <p id='author'>{eachMessage.user}</p>  
                    </div>
                  </div>
                </div>
              </div>
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input type="text" placeholder='Type something ...' value={currentMessage} onChange={(event) => {setCurrentMessage(event.target.value)}} 
            onKeyDown={(e) => (e.key === 'Enter') && sendMessage()} />
          <button type="submit" onClick={sendMessage} style={{backgroundColor: '#6495ed', color: '#ffffff'}}>&#11166;</button>
        </div>
      </div>
      <p>Just a simple app made with react, nodejs and socket.io</p>
      <p>credits to <a href="https://youtu.be/NU-HfZY3ATQ" target='_blank' rel="noopener noreferrer"><b>Pedro Tech</b></a></p>
    </div>
  )
}

export default Chat