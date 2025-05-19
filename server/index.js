import { WebSocketServer } from "ws";

const server = new WebSocketServer({
    port:8081,
    host: '193.225.219.202'
})

let clientId = 0
const clients = []

server.on('connection', (socket)=>{
    console.log('Client connect');
    
    socket.on('message', (message, isBinary) =>{
        const msg = JSON.parse(message)
        console.log(msg);
        if (msg.type == 'init'){
            clientId++
            clients.push({
                'socket' : socket,
                'userId' : clientId,
                'userName': msg.userName
            })
            console.log(clients);
            socket.send(JSON.stringify({
                type:'init',
                userId: clientId
            }))
            let userList = []
            clients.forEach(client =>{
                userList.push(
                    {
                        userId: client.userId,
                        userName: client.userName
                    }
                )
            })
            clients.forEach(client =>{
                client.socket.send(
                    JSON.stringify(
                        {
                            type:'userlist',
                            userList
                        }
                    )
                )
            })
        }
        if (msg.type == 'disconnect'){
            const index = clients.findIndex(client => client.userId==msg.userId)
            clients[index].socket.close() // kapcsolat botás -> "close" esemény, mindkét oldal
           
        }
        if (msg.type == 'message'){
            clients.forEach(client =>{
                client.socket.send(message, {binary: isBinary})
            })
        }
        if (msg.type == 'private-message'){
            const client = clients.find(client => client.userId == msg.to)
            if (client){
                msg.type='message'
                client.socket.send(JSON.stringify(msg))
            } else {
                console.log('Client not found!');
                
            }
        }
    })
})

server.on('close', ()=>{
    const index = clients.findIndex(client => client.userId==msg.userId)
    clients.splice(index,1)
    console.log(clients);
})

server.on('error',(error)=>{ 
    console.log(error.message);
   
    
})

console.log('Websocket server is running on ws:\\localhost:8081');

// npx nodemon index.js

// node index.js ->kész program