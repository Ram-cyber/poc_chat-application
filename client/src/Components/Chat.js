import React, { useEffect, useState } from 'react';
import  queryString  from 'query-string';
import { useLocation } from "react-router-dom";
import io from "socket.io-client"

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';



import './Chat.css';

let socket;


const Chat = () =>{
    const location = useLocation();
    const [name,setName] = useState('');
    const [room,setRoom] = useState('')
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);

    const END_POINT = 'localhost:5000';

    useEffect(() =>{
        const {name,room} = queryString.parse(location.search);

        socket = io(END_POINT, { transports : ['websocket'] }); //for some reason the default transportation method is not always allowed by all servers.So specified a neutral transportation method at the client side, like this: { transports : ['websocket'] }
        // source: https://stackoverflow.com/questions/44628363/socket-io-access-control-allow-origin-error
        setName(name);
        setRoom(room);

        socket.emit('join',{ name , room}, ()=>{
        });

        return () =>{
            socket.emit('disconnected');

            socket.off();
        }

    },[END_POINT,location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message]);
        })
    },[messages])

    //function for sending text message

    const sendMessage = (event) =>{
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }
    }

    console.log(messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>  
        </div>
    );
}

export default Chat;