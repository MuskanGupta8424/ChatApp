const { connect } = require("mongoose");

const io = require( "socket.io" )();
const socketapi = {
    io: io
};
var connections=0;
var userId=[];
var username=[];

io.on( "connection", function( socket ) {
io.emit("allusers",username);
console.log("a user connected")


socket.on("typing",function(){
var uname= username[userId.indexOf(socket.id)]
    socket.broadcast.emit("typing",uname);
})
socket.on("naamMila",function(data){
userId.push(socket.id);
username.push(data);
io.emit("naamMila",username)
io.emit("allusers",username);

console.log(userId,username)
})
socket.on("msg",function(data){
    var userkanaam=username[userId.indexOf(socket.id)]
    io.emit("reply",{username:userkanaam,msg:data,id:socket.id});
})

socket.on("disconnect",function(data){
    let index =userId.indexOf(socket.id);
    userId.splice(index,1);
    username.splice(index,1);
io.emit("allusers",username);
})
});

module.exports = socketapi;