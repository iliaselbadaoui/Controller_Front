const { ipcRenderer } = require('electron');

const select = selector => document.querySelector(selector);

var footSign = select("#footSign");

ipcRenderer.on("version", (e, text) =>{
	footSign.textContent = "VER : "+text+" | by Nuniverse©";
})

ipcRenderer.on("newUpdate", (e, text) =>{
	console.log("NEW UPDATE AVAILABLE");
})

ipcRenderer.on("noUpdate", (e, text) =>{
	console.log(text);
})