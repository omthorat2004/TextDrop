import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import socket from '../socket/socket';

import 'react-toastify/dist/ReactToastify.css';
import './Room.css'; // CSS file for advanced styling

const Room = () => {
  const [message, setMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);
  const { id } = useParams();
  const hasJoinedRoom = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Message cannot be empty!');
      return;
    }
    socket.emit('sendMessage', { message, room: id });
    setMessage(''); // Clear input after sending
  };

  const handleCopy = (messageToCopy) => {
    navigator.clipboard.writeText(messageToCopy)
      .then(() => {
        toast.success('Text copied to clipboard!');
        setIncomingMessage(null); // Close the popup
      })
      .catch(() => {
        toast.error('Failed to copy text.');
      });
  };

  useEffect(() => {
    socket.on('getUsers', (users) => {
      console.log('Users in room:', users);
    });

    socket.on('message', (data) => {
      setIncomingMessage(data); // Set the incoming message to show the popup
      console.log('New message:', data);
    });

    hasJoinedRoom.current = true;
    socket.emit('joinRoom', id);
    console.log(`Joining room: ${id}`);

    return () => {
      socket.off('getUsers');
      socket.off('message');
      console.log(`Left room: ${id}`);
    };
  }, [id]);

  return (
    <div className="room-container">
      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          className="message-input"
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {incomingMessage && (
        <div className="popup">
          <div className="popup-content">
            <p className="popup-message">{incomingMessage.slice(0,100)}</p>
            <div className="popup-buttons">
              <button onClick={() => handleCopy(incomingMessage)} className="popup-button copy">
                Copy
              </button>
              <button onClick={() => setIncomingMessage(null)} className="popup-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Room;
