const { Menu } = require('electron') //引入electron
//声明一个模板,就是一个菜单数组（每一个数组元素都是一个菜单
var template = [
  //   {
  //     //每个菜单都要有label（就是名称
  //     //每个菜单当成一个餐厅
  //     //一号餐厅（第一项）
  //     label: '刺身料理餐厅',
  //     //可以添加子菜单，也是数组的形式
  //     submenu: [
  //       //子菜单里也是每一项的名称
  //       {
  //         label: '北极贝',
  //         click: a => {
  //           console.log('a :>> ', a)
  //         },
  //       },
  //       { label: '三文鱼大腩' },
  //     ],
  //   },
  //   {
  //     label: '日式家庭餐厅',
  //     submenu: [{ label: '猪排饭' }, { label: '荞麦面' }],
  //   },
]
var m = Menu.buildFromTemplate(template) //按照模板构建菜单
Menu.setApplicationMenu(m) //使菜单处于可用状态
