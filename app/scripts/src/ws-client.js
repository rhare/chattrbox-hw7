let socket;

function init(url) {
  socket = new WebSocket(url);
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
};
