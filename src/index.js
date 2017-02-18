import './app.css';
import 'babel-polyfill';
import GLInstance from './gl';

let gl;

window.addEventListener('load', () => {
  // Get our extended GL Context Object
  gl = GLInstance('glcanvas').fSetSize(500, 500).fClear();
});
