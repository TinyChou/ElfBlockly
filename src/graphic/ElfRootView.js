import Utils from '../core/Utils.js';
import '../polyfill/requestAnimationFrame.js';
import AnimationTime from './AnimationTime.js';

function ElfRootView(canvas) {
  this.flags |= ElfRootView.FLAG_INITIALIZED;
  this.canvas2dContext = canvas.getContext('2d');

  this.onWindowResizeListener = Utils.close(this, this.onWindowResize);
  window.addEventListener('resize', this.onWindowResizeListener);
  this.onWindowResize(); // we should mock a resize to layout the root view for the first time.
};

ElfRootView.TAG = 'ElfRootView';

ElfRootView.DEBUG_FPS = true;
ElfRootView.prototype.frameCount = 0; // 帧数计数
ElfRootView.prototype.frameCountingStart = 0; // 计数开始millis

ElfRootView.DEBUG_INVALIDATE = true;
ElfRootView.prototype.invalidateColor = 0;

ElfRootView.DEBUG_DRAWING_STAT = true;

ElfRootView.DEBUG_PROFILE = true;
ElfRootView.DEBUG_PROFILE_SLOW_ONLY = true;

ElfRootView.FLAG_INITIALIZED = 1;
ElfRootView.FLAG_NEED_LAYOUT = 2;

ElfRootView.prototype.canvas2dContext = null;
ElfRootView.prototype.contentElfView = null;
ElfRootView.prototype.flags = ElfRootView.FLAG_NEED_LAYOUT;
ElfRootView.prototype.renderRequested = false;
ElfRootView.prototype.animations = [];
ElfRootView.prototype.idleListeners = [];
ElfRootView.prototype.lastDrawFinishTime = 0;
ElfRootView.prototype.inDownState = false;

ElfRootView.prototype.renderPid = 0;
ElfRootView.prototype.onWindowResizeListener = null;

ElfRootView.prototype.dispose = function() {
  if (this.renderPid) {
    cancelAnimationFrame(this.renderPid);
    this.renderPid = 0;
  }
  if (this.onWindowResizeListener) {
    window.removeEventListener('resize', this.onWindowResizeListener);
    this.onWindowResizeListener = null;
  }
  var canvas = this.canvas2dContext.canvas;
  if (canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  this.canvas2dContext = null;
  this.contentElfView.dispose();
  this.contentElfView = null;
  this.animations.length = 0;
  this.idleListeners.length = 0;
};

ElfRootView.prototype.registerLaunchedAnimation = function(animation) {
  // Register the newly launched animation so that we can set the start
  // time more precisely. (Usually, it takes much longer for first
  // rendering, so we set the animation start time as the time we
  // complete rendering)
  this.animations.push(animation);
};

ElfRootView.prototype.addOnIdleListener = function(listener) {
  this.idleListeners.push(listener);
};

ElfRootView.prototype.setContentPane = function(content) {
  if (this.contentElfView === content) return;

  if (this.contentElfView !== null) {
    if (this.inDownState) {
      var cancelEvent = new TouchEvent('touchcancel');
      this.contentElfView.dispatchTouchEvent(cancelEvent);
      this.inDownState = false;
    }
    this.contentElfView.detachFromRoot();
  }

  this.contentElfView = content;
  if (content) {
    content.attachToRoot(this);
    this.requestLayoutContentPane();
  }
};

ElfRootView.prototype.requestRender = function() {
  if (ElfRootView.DEBUG_INVALIDATE) {
    console.trace(ElfRootView.TAG, 'invalidate: ');
  }
  if (this.renderRequested) return;
  this.renderRequested = true;
  this.renderPid = requestAnimationFrame(this.onDrawFrame);
};

ElfRootView.prototype.requestLayoutContentPane = function() {
  if (this.contentElfView === null || (this.flags & ElfRootView.FLAG_NEED_LAYOUT) !== 0) return;
  if ((this.flags & ElfRootView.FLAG_INITIALIZED) === 0) return;

  this.flags |= ElfRootView.FLAG_NEED_LAYOUT;
  this.requestRender();
};

ElfRootView.prototype.layoutContentPane = function() {
  this.flags &= ~ElfRootView.FLAG_NEED_LAYOUT;

  var w = this.getWidth();
  var h = this.getHeight();
  if (this.contentElfView && w > 0 && h > 0) {
    this.contentElfView.layout(0, 0, w, h);
  }
};

ElfRootView.prototype.onWindowResize = function() {
  if (!this.canvas2dContext) return;
  var canvas = this.canvas2dContext.canvas;
  if (!canvas) return;

  var rect = canvas.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var left = scrollLeft + rect.left;
  var top = scrollTop + rect.top;
  var right = scrollLeft + rect.right;
  var bottom = scrollTop + rect.bottom;

  this.onLayout(true, left, top, right, bottom);
};

// should listener to `resize` event and also should fired when root created.
ElfRootView.prototype.onLayout = function(changed, left, top, right, bottom) {
  if (changed) this.requestLayoutContentPane();
};

ElfRootView.prototype.outputFps = function() {
  var now = Date.now();
  if (this.frameCountStart === 0) {
    this.frameCountStart = now;
  } else if ((now - this.frameCountStart) > 1000) {
    console.log(ElfRootView.TAG, 'fps: ', this.frameCount * 1000 / (now - this.frameCountStart));
    this.frameCountStart = now;
    this.frameCount = 0;
  }
  ++this.frameCount;
};

ElfRootView.prototype.onDrawFrame = function() {
  AnimationTime.update();


};

export default ElfRootView;
