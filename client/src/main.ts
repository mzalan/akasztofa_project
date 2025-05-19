import IMessageProtocol from './IMessageProtocol';
import './style.css'

let ws: WebSocket
let id:number
let users: {userId:number,userName:string}[] = []

const connection = () =>{
  ws = new WebSocket('ws://193.225.219.202:8081');

  ws.onopen = () =>{
    console.log('Connected to server');
    const msg: IMessageProtocol = {
      type:'init',
      userId:0,
      userName: (document.querySelector('#name') as HTMLInputElement).value
    }
    ws.send(JSON.stringify(msg))
  }

  ws.onmessage = (event) =>{
     console.log(event);
    const msg: IMessageProtocol = JSON.parse(event.data)
    console.log(msg);

    if (msg.type == 'init'){
      id = msg.userId
    }
    if (msg.type=='message') {
      const messages = document.querySelector('#messages') as HTMLDivElement
      const newMessage = document.createElement('p')
      newMessage.textContent = `Küldő: ${msg.userName}, Üzenet: ${msg.text}`
      messages.append(newMessage)
    }
    if (msg.type == 'userlist'){
      console.log(msg.userList);

      users = msg.userList || []
      const select = document.querySelector('#userlist') as HTMLSelectElement
      select.innerHTML=''
      users.forEach(u=>{
        const option = document.createElement('option')
        option.value = u.userId.toString()
        option.innerText = u.userName
        select.append(option)
      })
    }
  }

  ws.onclose = () =>{
    console.log('Disconnect from server');
    
  }

}

(document.querySelector('#login') as HTMLButtonElement).addEventListener('click',()=>{
  connection()
});

(document.querySelector('#logout') as HTMLButtonElement).addEventListener('click',()=>{
  const msg: IMessageProtocol = {
    type:'disconnect',
    userId:id,
  }
  ws.send(JSON.stringify(msg))
});

(document.querySelector('#send') as HTMLButtonElement).addEventListener('click',()=>{
  const msg: IMessageProtocol = {
    type:'message',
    userId:id,
    userName:(document.querySelector('#name') as HTMLInputElement).value,
    text: (document.querySelector('#message') as HTMLInputElement).value,
  }
  ws.send(JSON.stringify(msg));
  (document.querySelector('#message') as HTMLInputElement).value = ''
});

(document.querySelector('#send2') as HTMLButtonElement).addEventListener('click',()=>{
  const inputMessage = document.querySelector('#message2') as HTMLInputElement
  const msg: IMessageProtocol = {
    type:'private-message',
    userId: id,
    userName: (document.querySelector('#name') as HTMLInputElement).value,
    text: inputMessage.value,
    to: Number( (document.querySelector('#userlist') as HTMLSelectElement).value )
  }
  ws.send(JSON.stringify(msg))
  inputMessage.value=''
})