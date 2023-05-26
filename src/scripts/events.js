import * as Tone from 'tone';
import { playNote } from './sound';
// import { handleNotePlayed } from './game.js';


export function attachEventListeners(game) {
    const synth = new Tone.Synth().toDestination();

    const piano = document.getElementById("piano")
        piano.addEventListener("click", (e) => {
            e.stopPropagation();
            const note = e.target.id;
            console.log(note)
            playNote(note);
            if (game) {
                game.handleNotePlayed(note);
            }
        });


    const keyMap = {
        "a": { note: "C4", div: document.querySelector('#C4') },
        "w": { note: "Db4", div: document.querySelector('#Db4') },
        "s": { note: "D4", div: document.querySelector('#D4') },
        "e": { note: "Eb4", div: document.querySelector('#Eb4') },
        "d": { note: "E4", div: document.querySelector('#E4') },
        "f": { note: "F4", div: document.querySelector('#F4') },
        "t": { note: "Gb4", div: document.querySelector('#Gb4') },
        "g": { note: "G4", div: document.querySelector('#G4') },
        "y": { note: "Ab4", div: document.querySelector('#Ab4') },
        "h": { note: "A4", div: document.querySelector('#A4') },
        "u": { note: "Bb4", div: document.querySelector('#Bb4') },
        "j": { note: "B4", div: document.querySelector('#B4') },
        "k": { note: "C5", div: document.querySelector('#C5') }
    };

    window.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (keyMap[e.key]) {
            console.log(keyMap[e.key].note)
            playNote(keyMap[e.key].note);
            keyMap[e.key].div.classList.add("active");
            setTimeout(() => keyMap[e.key].div.classList.remove('active'), 200);
            if (game) {
                game.handleNotePlayed(keyMap[e.key].note);
            }
        }
    })
};
