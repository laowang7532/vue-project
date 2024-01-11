window.systemConfig = {
  // GIS地图服务地址
  gisBaseUrl: ['/arcgis/rest/services/xxx/MapServer'],
  // 是否使用天地图
  useTdt: true,
  // 天地图瓦片服务地址
  tdtBaseUrl: [
    'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b1c9c52877e24d1599b3c08cd062236d',
    'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=b1c9c52877e24d1599b3c08cd062236d'
  ],

  // 小伙伴地址信息
  partnerInfoList: [
    {
      name: '人生何处不青山',
      avatar: '/assets/imgs/p1.jpg',
      address: '山东省青岛市李沧区建安小区',
      phone: '17667162062',
      position: [120.4228767398509, 36.148550053752075]
    },
    {
      name: '🇨🇳',
      avatar: '/assets/imgs/p2.jpg',
      address: '山东省青岛市李沧区建安小区',
      phone: '17667162062',
      position: [120.42353796372716, 36.14931363291272]
    },
    {
      name: 'Kaivan Wong',
      avatar: '/assets/imgs/p3.jpg',
      address: '山东省青岛市李沧区百通花园',
      phone: '17667162062',
      position: [120.42096845603557, 36.14519176325891]
    },
    {
      name: '迅哥儿',
      avatar: '/assets/imgs/p4.jpg',
      address: '市北区辽源路街道福州北路108号香缇树3-1901',
      phone: '17667162062',
      position: [120.39225144007901, 36.095158532227074]
    },
    {
      name: '大强💪',
      avatar: '/assets/imgs/p5.jpg',
      address: '李沧区福岛小区3号楼二单元601',
      phone: '17667162062',
      position: [120.42756649183428, 36.148349910537014]
    },
  ]
}
