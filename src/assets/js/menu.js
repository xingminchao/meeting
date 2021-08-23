const MenuObj = {
  menu: [
    {
      name: '议程',
      routeName: 'agendaIndex',
      iconActive: require('@/assets/document.png'),
      iconDefault: require('@/assets/document_1.png'),
      activeNum: 0
    },
    {
      name: '主舞台',
      routeName: 'mainStage',
      iconActive: require('@/assets/user_1.png'),
      iconDefault: require('@/assets/user.png'),
      activeNum: 0,
    },
    {
      name: '会议厅',
      routeName: 'ThePavilion',
      iconActive: require('@/assets/pavilion_1.png'),
      iconDefault: require('@/assets/pavilion.png'),
      activeNum: 0
    },
    {
      name: '会议问答',
      routeName: 'issue',
      // iconActive: require('@/assets/pavilion_1.png'),
      // iconDefault: require('@/assets/pavilion.png'),
      activeNum: 0
    },
  ]
}


export default MenuObj;