

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

let players:string[] = []; 

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
  socket.send(nameInput.value);
  jointBtn.style.display = "none";
  nameInput.style.display = "none";
  h1.style.display = "none";
  hName.style.display = "none";
  hAvatar.style.display = "none";
  inpAvatar.style.display = "none";
  playersDiv.style.display = "block";
});