import '../polyfill/requestAnimationFrame.js';

function AnimationTime() {

};

AnimationTime.time = 0;

AnimationTime.update = function() {
  AnimationTime.time = Date.now();
};

AnimationTime.get = function() {
  return AnimationTime.time;
};

AnimationTime.startTime = function() {
  AnimationTime.time = Date.now();
  return AnimationTime.time;
};

export default AnimationTime;
