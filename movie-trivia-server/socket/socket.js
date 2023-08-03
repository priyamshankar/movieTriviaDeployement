const {Server} = require("socket.io");

// const app = express()
module.exports = (server) =>{

    const io = new Server (server,{
        cors:true,
    })
    // server.listen(5000);
    io.on("connection",(socket)=>{
        console.log(socket.id);

        socket.on("joinRoom",(data)=>{
            socket.join(data.Room);
            socket.to(data.Room).emit("someoneJoined",{name:data.name,Room:data.Room});
            console.log(`${data.name} joined the room: ${data.Room}`);
        });

        socket.on('leaveRoom', (roomName) => {
            socket.leave(roomName);
            console.log(`Client left room: ${roomName}`);
        });

        socket.on("sendmessage",(data)=>{
            socket.to(data.Room).emit("getMessage",{message :data.message, name : data.name});
        });

        socket.on("guessedit",(data)=>{
            socket.to(data.Room).emit("guessitBack",`${data.name} guessed it`);
        });

        socket.on("startRoundbtn",(data)=>{
            socket.to(data.Room).emit("startGame",{room:data.Room,round:data.Round});
        });
        socket.on("scoreEmit",(data)=>{
            const Room = data.Room;
            const name = data.name;
            const score = data.score;
            socket.to(data.Room).emit("scoreFetch",{name,score});
        });
    })
}