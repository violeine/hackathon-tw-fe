import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { useChat } from "./hooks";
import "./index.css";

function App() {
  const [room, setRoom] = useState();
  const [input, setInput] = useState();
  const [username, setUsername] = useState();
  useEffect(() => {
    console.log(window.location.pathname);
    setUsername(localStorage.get("username"));
    const room = window.location.pathname.substr(1);
    if (room != "") {
      setRoom(room);
    }
  });
  return (
    <div className="bg-red-50 w-full h-screen p-1">
      {!room && (
        <div className=" w-1/2 pt-6 mt-6 flex items-center mx-auto">
          <input
            className="w-64 rounded block shadow-lg p-4 mr-2"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            className="w-64 rounded block shadow-lg p-4 mr-2"
            type="number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <a
            className="bg-green-500 px-2 py-2 shadow-lg inline-block rounded-lg"
            onClick={() => {
              setRoom(input);
            }}
          >
            Join
          </a>
        </div>
      )}
      {room && <Chat roomId={room} />}
    </div>
  );
}

function Chat({ roomId }) {
  const { messages, sendMessage } = useChat(roomId);
  const [input, setInput] = useState();
  return (
    <div className="bg-green-50 w-96 h-96 mt-6 ml-6">
      <div className="h-80 bg-red-100">
        {messages &&
          messages.map(({ body, ownedByCurrentUser }) => (
            <p className={`w-6 ${ownedByCurrentUser ? "ml-auto" : "mr-auto"}`}>
              {body}
            </p>
          ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="w-full mr-2 mt-2 p-3"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <a
          className="bg-green-500 px-2 py-2 shadow-lg inline-block rounded-lg"
          onClick={() => {
            sendMessage(input);
          }}
        >
          send
        </a>
      </div>
    </div>
  );
}
export default App;
