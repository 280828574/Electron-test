// 引入electron并创建一个Browserwindow

const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
// const url = require('url')
// const autoUpdater = require('electron-updater').autoUpdater //引入 autoUpdater 更新模块
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow
require('./menu.js')

function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({ show: false })
  mainWindow.maximize()
  mainWindow.show()

  // 加载应用-----  本地应用
  //   mainWindow.loadURL(
  //     url.format({
  //       pathname: path.join(__dirname, '../app/index.html'),
  //       protocol: 'file:',
  //       slashes: true,
  //     })
  //   )

  //   // 加载应用----适用于 react/vue 项目
  mainWindow.loadURL('http://ds.treyo.com/login')

  // 打开开发者工具，默认不打开
  //   mainWindow.webContents.openDevTools()

  // 关闭window时触发下列事件.
  //   mainWindow.on('closed', function () {
  //     mainWindow = null
  //   })
  // 触发关闭时触发
  mainWindow.on('close', event => {
    // 截获 close 默认行为
    event.preventDefault()
    // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
    mainWindow.hide()
    mainWindow.setSkipTaskbar(true)
  })
  // 新建托盘
  let tray = new Tray(path.join(__dirname, './favicon.ico'))
  // 托盘名称
  tray.setToolTip('Electron Tray')
  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: () => {
        mainWindow.show()
      },
    },
    {
      label: '退出',
      click: () => {
        mainWindow.destroy()
      },
    },
  ])
  // 载入托盘菜单
  tray.setContextMenu(contextMenu)
  // 双击触发
  tray.on('double-click', () => {
    // 双击通知区图标实现应用的显示或隐藏
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
  })
  //更新
  //   autoUpdater.setFeedURL('http://localhost:3001/') //设置检测更新地址
  //   autoUpdater.checkForUpdates() //检测是否有新版本,如果有新版本则自动下载
  //   autoUpdater.on('update-downloaded', function () {
  //     //下载完成后执行 quitAndInstall
  //     autoUpdater.quitAndInstall() //关闭软件并安装新版本
  //   })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})
