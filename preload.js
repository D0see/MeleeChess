const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dolphinApi', {
    startDolphin: () => ipcRenderer.invoke('start-dolphin'),
    writeConfig: (configString) => ipcRenderer.invoke('write-config', configString)
});