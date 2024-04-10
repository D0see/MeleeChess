const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dolphinApi', {
    startDolphin: () => ipcRenderer.invoke('start-dolphin'),
    writeGecko: (configString) => ipcRenderer.invoke('write-gecko', configString)
});