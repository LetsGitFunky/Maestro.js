import * as Tone from 'tone';
import { Player } from 'tone';

let triumphSound = new Player("../../assets/sounds/triumphantSound.wav").toDestination();

export function playTriumphSound() {
    triumphSound.start();
}

export const synth = new Tone.Synth().toDestination();

export function playNote(note) {
    if (synth.state !== 'started') {
        synth.triggerAttack(note);
        setTimeout(() => synth.triggerRelease(), 500);
    }
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


//  ATTEMPTING EAR TRAINING MODE
// export function playMelody(melody, game) {
//     return new Promise(resolve => {
//         melody.forEach((note, index) => {
//             setTimeout(() => {
//                 const keyElement = document.querySelector(`#${note}`);
//                 if (!game.earTrainingMode) {
//                     keyElement.classList.add('computer-active');
//                 }
//                 playNote(note);
//                 if (!game.earTrainingMode) {
//                     setTimeout(() => keyElement.classList.remove('computer-active'), 200);
//                 }
//                 if (index === melody.length - 1) {
//                     resolve();
//                 }
//             }, 750 + (index * 750));
//         });
//     });
// };
