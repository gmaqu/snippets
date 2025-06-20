const currentTime = Date.now(); // quicker than new Date().getTime();
const timeOfOriginalReceipt = new Date(event.queuedTime).getTime(); // from string
