#!/usr/bin/env node

const http = require('http'),
	 app = require('../app')

const server = http.createServer(app);
const socketIO = require("socket.io")(server, {
		cors: {
			origin: '*',
			allowedHeaders: ['Content-Type'],
		  }
});

let users = []

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	// Get the count of all connected sockets
	const socketCount = socketIO.sockets.sockets.size;
	console.log('Connected sockets count:', socketCount);

	const msg = {user_id:"admin", product_id:"", message:"Welcome To Clo4", type:"alert"}
	socketIO.to(socket.id).emit('message', msg)

	socket.on("login", (data) => {
		console.log("login:", data);
		users.push(data)
	});

	socket.on("message", async(data) => {
		console.log("message:", data);
	});

	socket.on("read", async(data) => { 
		console.log("read:", data);
	})

	socket.on("typing", (data)=>{
		console.log("typing:", data)
		socket.broadcast.emit("typing", data)
	})

	socket.on("disconnect", () => {
		users = users.filter(user => user.socket !== socket.id)
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});

});

const sendingToUser = (data) => {
	try{
		console.log(data)
		socketIO.sockets.emit("product", data);
	}catch(err){
		console.log(err)
	}
}
 
exports.sendingToUser = sendingToUser

module.exports = {socketIO, server, app};
