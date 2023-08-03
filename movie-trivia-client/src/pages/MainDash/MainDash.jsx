import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Maindash.css";
import dash from "../../Global/GlobalImages/dash.png";

const MainDash = () => {
  const navigate = useNavigate();
  const [Dialogbool, setDialogbool] = useState("dash");
  const [roomId, setroomId] = useState(null);
  const [playerName, setplayerName] = useState(null);

  async function isRoomValid() {
    var state;
    await axios
      .post("https://movie-trivia-deployement.vercel.app//api/checkroom", {
        room: roomId,
      })
      .then((res) => {
        state = res.data;
      });
    return state;
  }

  async function handleJoinRoom(e) {
    if (playerName === null) {
      alert("first enter the player name");
      return;
    }
    if (roomId != null) {
      const result = await isRoomValid();
      if (result === true) {
        sessionStorage.setItem("admin", false);
        navigate(`/game/${roomId}`);
      } else {
        alert("Room id dosen't exist Enter a valid one");
      }
    }
  }

  async function handleCreateRoom() {
    if (playerName === null) {
      alert("first enter the player name");
      return;
    }
    const result = await isRoomValid();

    if (result === true) {
      alert("Room id already exist Enter another one");
    } else {
      axios
        .post("https://movie-trivia-deployement.vercel.app//api/addroom", {
          room: roomId,
          players: [
            {
              player: playerName,
            },
          ],
        })
        .then((res) => {
          // console.log(res);
          sessionStorage.setItem("admin", true);
          navigate(`/game/${roomId}`);
        });
    }
  }

  function dialogBoxbuttonHandler(e) {
    setDialogbool(e.target.name);
  }

  return (
    <div className="mainDashContainer">
      {Dialogbool == "dash" ? (
        <>
          <div className="grid-comp-maindash">
            <h1>
              Play Dumbsharads with <span>Your</span> <br /> Friends in Real
              Time
            </h1>
            <h2>
              Challange Your friends in a timed game of
              <br /> dumbsharads and chat with them in real time.
            </h2>
            <div className="button_container_MianDash">
              <button
                className="maindashcreate"
                name="create"
                onClick={dialogBoxbuttonHandler}
              >
                Create Room
              </button>
              <button
                className="maindashjoin"
                name="join"
                onClick={dialogBoxbuttonHandler}
              >
                Join Room
              </button>
            </div>
          </div>
        </>
      ) : Dialogbool == "create" ? (

        <div className="create_mainDash dash_next_menu">
          <h1>
            Create a Room to play with friends.
          </h1>
          <input
            type="text"
            placeholder="enter you name"
            onChange={(e) => {
              sessionStorage.setItem("playerName", e.target.value);
              setplayerName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter the room name"
            onChange={(e) => {
              setroomId(e.target.value);
            }}
          />
          <div className="button_container_MianDash">
            <button onClick={handleCreateRoom} className="maindashcreate-btn">
              create Room
            </button>
            <button
              className="maindashjoin-btn"
              name="dash"
              onClick={(e) => {
                e.preventDefault();
                dialogBoxbuttonHandler(e);
              }}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="joinMainDash dash_next_menu">
          <h1>
            Enter the Room id To join the Room
          </h1>
          <input
            type="text"
            placeholder="enter you name"
            onChange={(e) => {
              sessionStorage.setItem("playerName", e.target.value);
              setplayerName(e.target.value);
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setroomId(e.target.value);
            }}
            placeholder="Enter Room Id"
          />
          <div className="button_container_MianDash">
            <button onClick={handleJoinRoom} className="maindashcreate-btn">
              Join Room
            </button>
            <button
              className="maindashjoin-btn"
              name="dash"
              onClick={(e) => {
                e.preventDefault();
                dialogBoxbuttonHandler(e);
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div className="grid-pic-maindash">
        <img src={dash} />
      </div>
      <>
        {/* <div>
        <input
          type="text"
          placeholder="enter you name"
          onChange={(e) => {
            sessionStorage.setItem("playerName", e.target.value);
            setplayerName(e.target.value);
          }}
          />
          </div>
          {Dialogbool && (
            <div className="dialogBox">
          <input
          type="text"
          onChange={(e) => {
            setroomId(e.target.value);
          }}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      )}
      {!Dialogbool && (
        <div className="createRoomDialogBox">
          <input type="text" placeholder="Enter the room name" onChange={(e) => {
              setroomId(e.target.value);
            }}/>
            <button onClick={handleCreateRoom}>create a Room</button>
            <button
            onClick={(e) => {
              e.preventDefault();
              setDialogbool(true);
            }}
            >
            join a room
            </button>
        </div>
      )} */}
      </>
    </div>
  );
};

export default MainDash;
