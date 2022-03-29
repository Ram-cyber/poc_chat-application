import React from "react";

import sendIcon from '../images/send-icon.png';

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      <img src={sendIcon} width="50" height="50" alt="send-icon"/>
    </button>
  </form>
);

export default Input;
