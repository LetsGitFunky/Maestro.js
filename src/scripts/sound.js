import * as Tone from 'tone';
import { Player } from 'tone';

let triumphSound = new Player("./src/sounds/triumphantSound.wav").toDestination();


export function playTriumphSound() { triumphSound.start() };
export const synth = new Tone.Synth().toDestination();


// patch for double note error
// export async function playNote(note) {
//     // If the synth is already playing a note, release it
//     if (synth.state === 'started') {
//         await synth.triggerRelease();
//     }
//     // Then start the new note
//     synth.triggerAttack(note);
//     // And schedule the release of this note after 500 ms
//     setTimeout(() => synth.triggerRelease(), 500);
// }

export function playNote(note) {
    // If the synth is already playing a note, release it
    if (synth.state === 'started') {
        synth.triggerRelease();
    }
    // Then start the new note
    Tone.Transport.scheduleOnce((time) => {
        synth.triggerAttack(note, time);
    }, "+0.1");
    // And schedule the release of this note after 500 ms
    setTimeout(() => synth.triggerRelease(), 500);
}

export function playMelody(melody, game) {
    return new Promise(resolve => {
        melody.forEach((note, index) => {
            setTimeout(() => {
                // get notes
                const keyElement = document.querySelector(`#${note}`);
                if (!game.isEarTrainingMode) {
                    // create computer class so notes light up when cpu plays
                    keyElement.classList.add('computer-active');
                }
                // play note
                playNote(note);
                // remove active class
                if (!game.isEarTrainingMode) {
                    setTimeout(() => keyElement.classList.remove('computer-active'), 200);
                }
                // We're done playing the melody, so resolve the promise
                if (index === melody.length - 1) {
                    resolve();
                }
            }, 750 + (index * 750));
        });
    });
};

// function youWinSnippet(songName) {  // function to replace triumphSound with melody specific winning song.
//     let clip = new Player(`../assets/sounds/${songName}.wav`).toDestination();
//     clip.start();
// }
