import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [room,setRoom] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e)=>{
      e.preventDefault()
        navigate(`/${room}`)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={room} name='room' onChange={(e)=>setRoom(e.target.value)}/>
          <button type='submit'>Join</button>
        </form>

    </div>
  );
}

export default Home;
