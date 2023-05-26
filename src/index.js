import './styles/main.scss';
import { userPlaysNotes } from './scripts/events.js';

document.addEventListener("DOMContentLoaded", () => {
    let body = document.querySelector('body');
    userPlaysNotes() // from events.js

});
