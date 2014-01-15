$(document).ready(function(){
  $("#open").click(function(){
    window.popUp('/', 'windowPostMessage', 'width=320,height=480');
  });
});

(function initializeOpenUniquePopUp() {
  var openedDomain = 'http://niquel.heroku.com';
  var trackedWindows = {};
 
  window.popUp = function(path, windowName, specs) {
    trackedWindows[windowName] = false;
    var popUp = window.open(null, windowName, specs);
    popUp.postMessage('ping', "*");
    setTimeout(checkIfOpen, 1000);
 
    function checkIfOpen() {
      if(!trackedWindows[windowName])
        window.open(openedDomain + path, windowName, specs);
    }
  };
 
  if(window.addEventListener)
    window.addEventListener('message', onPingBackMessage, false);
  else if (window.attachEvent)
    window.attachEvent('message', onPingBackMessage, false);
  
  function onPingBackMessage(event) {
      trackedWindows[event.data] = true;
      JSPM.callback(event.data);
  }
})();
 
JSPM = {
	callback: function(response) {
		console.log(response);
	}
};

