import Pong from './pong';

window.onload = function() {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  new Pong(canvas, context);
}