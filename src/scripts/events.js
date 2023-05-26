import * as Tone from 'tone';
import { playNote } from './sound';


// exported to index.js
export function userPlaysNotes() {
    const synth = new Tone.Synth().toDestination();

    const noteDivs = document.querySelectorAll(".piano-container .white-key, .piano-container .black-key");
    noteDivs.forEach(noteDiv => {
        noteDiv.addEventListener("click", () => {
            const note = noteDiv.id;
            playNote(note);
            // handleNotePlayed(note);
        });
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
        if (keyMap[e.key]) {
            playNote(keyMap[e.key].note);
            // handleNotePlayed(keyMap[e.key].note)
            keyMap[e.key].div.classList.add("active");
            setTimeout(() => keyMap[e.key].div.classList.remove('active'), 200);
        }
    })
};
