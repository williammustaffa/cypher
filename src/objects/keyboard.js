/*  KEYBOARD */
function Keyboard() {
  /* Variables */
  var keyPressed = [],
      keyPress = [],
      keyReleased = [],
      keys = {up:38, down:40, right:39, left:37, enter:13, shift:16, alt:18, space:32, backspace:8, tab: 9, control: 17, pause:19, break: 19, capslock: 20, escape: 27, pageup: 33, pagedown: 34, end: 35, home: 36, print: 44, insert:45, delete: 46, num:{0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57}, ord: {a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90},f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,mute:173,volumedown:174,volumeup:175};
  /* Initial setup */
  for (var prop in keys) {
      if (keys.hasOwnProperty(prop)) {
          keyPressed[prop]=0;
          keyPress[prop]=0;
          keyReleased[prop]=0;
      }
  }
  /* Reset function for step */
  this.reset = function() {
      for (var prop in keys){
          if (keys.hasOwnProperty(prop)) {
              keyPressed[prop]=0;
              keyReleased[prop]=0;
          }
      }
  }
  /* Events from window */
  window.addEventListener('keydown', function(e) {
      var Key = e.keyCode;
      for ( var prop in keys ) {
          if ( keys.hasOwnProperty( prop ) ) {
              if ( keys[ prop ] == Key && !keyPress[ prop ] ) {
                  keyPressed[ prop ] = 1;
                  keyPress[ prop ] = 1;
              }
          }
      }
  });
  window.addEventListener('keyup', function(e) {
      var Key = e.keyCode;
      for ( var prop in keys ) {
          if ( keys.hasOwnProperty( prop ) ) {
              if ( keys[ prop ] == Key && keyPress[ prop ] ) {
                  keyReleased[prop] = 1;
                  keyPress[prop] = 0;
              }
          }
      }
  });
  /* Keyboard Functions */
  this.pressed = function( key ) {
      return keyPressed[ key ];
  }
  this.released = function( key ) {
      return keyReleased[key];
  }
  this.check = function( key ) {
      return keyPress[key];
  }
  return this;
}
