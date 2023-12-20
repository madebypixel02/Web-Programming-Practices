import { GameApp } from './modules/GameApp.js';

const trackSelector = '.js-track';
const carSelector = '.js-car';
const livesSelector = '.js-lives';
const game = new GameApp(trackSelector, carSelector, livesSelector);