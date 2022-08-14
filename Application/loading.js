const electron=require('electron');
const ipcRenderer=electron.ipcRenderer
ipcRenderer.send('status',navigator.onLine);
setTimeout(()=>{
    document.getElementsByTagName('span')[0].innerHTML="You have slow internet connection please wait..."
},5000)

