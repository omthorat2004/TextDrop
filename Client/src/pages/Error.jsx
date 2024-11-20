import React, { useEffect } from 'react';

const Error = () => {
    console.log(1)

    useEffect(()=>{
        console.log(2)
        return()=>{
            console.log(3)
        }
    })
  return (
    <div>
       Error
    </div>
  );
}

export default Error;
