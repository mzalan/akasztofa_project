

const socket = new WebSocket("ws://127.0.0.1:8081");
let players:string[] = []; 
socket.onopen = () => {
  console.log("Connected to WebSocket server");
  players = [];
};
socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};

socket.onclose = () => {
  console.warn("WebSocket closed");
};


socket.onmessage = (event) => {
  players.push(event.data);
  console.log(players);
  players.forEach(msg => {
    let div = document.createElement("div") as HTMLDivElement;
    div.innerText = msg;
    playersDiv.appendChild(div);
  });
};


const nameInput = document.getElementById("name_input") as HTMLInputElement;
const playersDiv = document.getElementById("players") as HTMLDivElement;
const jointBtn = document.getElementById("join_btn") as HTMLAnchorElement;
const h1 = document.getElementById('h1') as HTMLHeadingElement;
const hName = document.getElementById('h_name') as HTMLHeadingElement;
const hAvatar = document.getElementById('h_avatar') as HTMLHeadingElement;
const inpAvatar = document.getElementById('inp_avatar') as HTMLInputElement;

document.getElementById("join_btn")?.addEventListener('click', () => {
   if (socket.readyState === WebSocket.OPEN && nameInput.value.trim()) {
    socket.send(nameInput.value);
    // nameInput.value = "";
  }
  jointBtn.style.display = "none";
  nameInput.style.display = "none";
  h1.style.display = "none";
  hName.style.display = "none";
  hAvatar.style.display = "none";
  inpAvatar.style.display = "none";
  playersDiv.style.display = "block";
});

const playerOutput = document.getElementById("playerOutput") as HTMLParagraphElement;
(document.getElementById("showPlayers") as HTMLButtonElement).addEventListener('click', ()=>{

  players.forEach(player => {
    console.log("fed");
    let p = document.createElement("p") as HTMLParagraphElement;
    p.innerHTML = player;
    playerOutput.appendChild(p);
  })
})



// const socket = new WebSocket("ws://localhost:8081");

// const playersDiv = document.getElementById("players") as HTMLDivElement;
// let username: string | null = null;

// socket.onopen = () => {

//   username = prompt("Enter your username:");
//   if (username) {
//     socket.send(username);
//   }
// };

// socket.onmessage = (event) => {
//   // socket.send("__RESET__");
//   let msg;
//   if(JSON.parse(event.data).type != Blob) {
//     msg = JSON.parse(event.data);
//   }


//   if (msg.type === "players") {
//     // Clear and update the player list
//     playersDiv.innerHTML = "";
//     msg.players.forEach((name: string) => {
//       const div = document.createElement("div");
//       div.innerText = name;
//       playersDiv.appendChild(div);
//     });
//   }
// };

// socket.onclose = () => {
//   console.log("Socket closed");
// };

// socket.onerror = (err) => {
//   console.error("Socket error", err);
// };
