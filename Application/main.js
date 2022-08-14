const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
// const isDev = require('electron-is-dev');

function createWindow() {
    const win = new BrowserWindow({
        icon: __dirname + '/Applicationlogo.jpg',
        width: 1400,
        height: 900,
        fullscreenable: true,
        show: false,
        title: "Algorithms Visualization",
        webPreferences: {
            nodeIntegration: true,
        },
    });
    let LoadingWindow = new BrowserWindow({
        icon: __dirname + '/Applicationlogo.jpg',
        width: 600,
        height: 400,
        frame: false,
        backgroundColor: '#f8f4d5',
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
// ============ Getting information about Internet Connection======
    ipcMain.on("status", (event, arg) => {
        console.log('Online status ', arg);
    })
    // ========= Loading Template============
    LoadingWindow.loadFile('loading.html');
    win.loadURL('https://algoviz-vbspu.herokuapp.com/');
    win.center();
    LoadingWindow.center();

    //   ========Before dom Ready===========
    let wc = win.webContents;
    wc.on('dom-ready', () => {
        LoadingWindow.close();
        win.show();
    })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});