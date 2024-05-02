// plugins/confetti.js
import confetti from 'canvas-confetti';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('confetti', confetti);
});
