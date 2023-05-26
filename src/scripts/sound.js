import * as Tone from 'tone';

export const synth = new Tone.Synth().toDestination();


// playNote used in ./events : userPlaysNotes,
// will also be used in game.js when computer plays melody back to user
// export function playNote(note) {
//     synth.triggerAttackRelease(note, '8n');
// }

// export function playNote(note) {
//     // Check if the synth is currently making sound
//     if (synth.state === 'started') {
//         // If it is, schedule the new note to start as soon as the synth stops
//         synth.triggerAttackRelease(note, '8n', '+1');
//     } else {
//         // If not, start the new note immediately
//         synth.triggerAttackRelease(note, '8n');
//     }
// }

export function playNote(note) {
    synth.triggerAttackRelease(note, '8n', Tone.now() + 0.1);
    // console.log(note)
    // synth.triggerAttackRelease(note, '8n');

}



// to be used in ./game.js at the start of each round
export function playMelody(melody) {
    melody.forEach((note, index) => {
        setTimeout(() => {
            playNote(note);
        }, index * 500);
    });
};

// export function playMelody(melody) {
//     const now = Tone.now();
//     melody.forEach((note, index) => {
//         Tone.Transport.schedule(() => playNote(note), now + index * 0.5);
//     });
// }
