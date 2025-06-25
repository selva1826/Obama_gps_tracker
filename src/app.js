const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.set("view engine", "ejs")
app.set(express.static(path.join(__dirname, "views")))


app.get("/", function (req, res){
        res.render("index")
})

io.on('location-update', (socket) => {
        console.log('new user connected!')

        socket.on('location-update', (data) => {
                io.emit('location-update', data)
        })

        socket.on('disconnected', () => {
                console.log("A device disconnected")
        })
})


app.listen(8000, () => console.log("Server Up Baby"))
