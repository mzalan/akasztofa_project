// import IMessageProtocol from './IMessageProtocol';
import './style.css';

const alphabetDiv = document.querySelector('#alphabet-container') as HTMLDivElement;
const alphabet = [
    'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H',
    'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö',
    'Ő', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű',
    'V', 'W', 'X', 'Y', 'Z'
  ];

alphabet.forEach(letter => {
    let button = document.createElement("button") as HTMLButtonElement;
    button.innerText = letter;
    alphabetDiv.appendChild(button);
    console.log("ffef");
})