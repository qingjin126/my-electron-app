const path=require('path'); 
const { app, BrowserWindow } = require('electron')

const appFolder = path.dirname(process.execPath);
const updateExe = path.resolve(appFolder, "..", "Update.exe");
const exeName = path.basename(process.execPath);

const isDevelopment = process.env.NODE_ENV !== "production";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') //path.join 将多个路径联结在一起，创建一个跨平台的路径字符串, __dirname指向当前正在执行脚本的路径项目的根文件夹
    }
  })

  mainWindow.loadFile('index.html')

  //  打开开发工具
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// app.on("ready", async () => {
//   if (!isDevelopment) launchAtStartup();
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function launchAtStartup() {
  if (process.platform === "darwin") {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true
    });
  } else {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      path: updateExe,
      args: [
        "--processStart",
        `"${exeName}"`,
        "--process-start-args",
        `"--hidden"`
      ]
    });
  }
}