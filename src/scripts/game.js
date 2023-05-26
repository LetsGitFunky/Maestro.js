import { playMelody } from './sound.js';

const melodies = [
    ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    ["C4", "C5", "B4", "G4", "A4", "B4", "C5"]
]

// will pull random melody from melodies array and call newGameRound on that melody
// function startNewGame() {
//     let randomIndex = Math.floor(Math.random() * melodies.length);
//     newGameRound(melodies[randomIndex]);
// }


// let currentMelody = [];
// let userMedody = [];
// let currentStreak = 0;

// export function newGameRound(melody) {
//     currentMelody = melody;
//     userMedody = [];
//     currentStreak = 0;
// }

// export function handleNotePlayed(note) {
//     userMedody.push(note);

//     for (let i = 0; i < userMedody.length; i++) {
//         if (userMedody[i] !== currentMelody[i]) {
//             currentStreak = 0;
//             userMedody = [];
//             playMelody(currentMelody);
//             // repeat current melody to player
//         }
//         if (userMedody.length === currentMelody.length) {
//             currentStreak ++;
//             userMedody = [];
//             // currentMelody.push(nextNoteFromMelody)
//             // playMelody(currentMelody)
//             // move on to next round
//         }
//     }
// }
