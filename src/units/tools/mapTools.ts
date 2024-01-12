import Map from "@arcgis/core/Map.js";
import Basemap from '@arcgis/core/Basemap'
import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer.js";
import MapView from "@arcgis/core/views/MapView.js";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import { useEventBus } from "@vueuse/core";
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import Zoom from '@arcgis/core/widgets/Zoom'
import TileLayer from "@arcgis/core/layers/TileLayer.js";

/**
 * 创建地图对象
 * @param mapDiv 地图容器
 * @param isTdt 地图底图是否为天地图
 * @param options 地图配置项
 * @returns 地图对象
 */
export function createMap(mapDiv: string, isTdt:boolean = true, options?:any) {
  const baseMaps: Basemap[] = [];
  // 标注图层
  const baseLabelMapItem = BaseTileLayer.createSubclass({
    properties: {
      urlTemplate:window.systemConfig.tdtBaseLabelUrl[0],
    },

   getTileUrl: function (level:any, row:any, col:any) {
     return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
   }
  });
  // 标注图层
  const baseLabelMapObj = new baseLabelMapItem();

  if(isTdt){
    window.systemConfig.tdtBaseUrl.forEach((item:string) => {
      // @ts-expect-error
      const baseMapItem = BaseTileLayer.createSubclass({
        properties: {
          urlTemplate: item,
        },
    
       getTileUrl: function (level:any, row:any, col:any) {
         return this.urlTemplate.replace("{z}", level).replace("{x}", col).replace("{y}", row);
       }
      });
      // 底图
      const baseMapItemObj = new baseMapItem();
      
      baseMaps.push(new Basemap({baseLayers:[baseMapItemObj, baseLabelMapObj],title:item}))
    });
  }else{
    // TODO：需要arcgis服务升成链接... 后续再说
  }
  const GisMap = new Map({ basemap: baseMaps[0]});
  const view = new MapView({
    container: mapDiv,
    map: GisMap,
    center: options?.center || [120.45, 36.13],
    zoom: options?.zoom || 12,
    constraints: {
      rotationEnabled: false,
      minZoom: window.systemConfig.minZoom,
      maxZoom: window.systemConfig.useTdt ? 18 : 20,
    },
    // 本身不携带任何工具 例如地图下方描述、比例尺等
    ui: {
      components: [],
    },
  });

  view.when(()=>{
    view.on('click',(e)=>{
      view.hitTest(e).then((res:any) => {
        if(res.results.length > 0){
          const graphic = res.results[0].graphic
          switch (graphic.attributes.type) {
            case 'partner':
              const partnerInfo = useEventBus<any>('partnerInfo')
              partnerInfo.emit({info:graphic.attributes})
              break;
            default:
              break;
          }
        }
      })
    })
  })

  if (document.getElementById(options.zoomBarId)?.childNodes.length === 0) {
    const zoom = new Zoom({ view, container: options.zoomBarId })
    view.ui.add(zoom, { position: 'bottom-right' })
  }
  if (document.getElementById(options.scaleBarId)?.childNodes.length === 0) {
    const scaleBar = new ScaleBar({ container: options.scaleBarId, view, unit: 'metric' })
    view.ui.add(scaleBar, { position: 'bottom-right' })
  }

  // 伙伴图层
  const partnerLayer = new GraphicsLayer()
  GisMap.add(partnerLayer)

  /**
   * 切换底图
   * @param index 底图索引 可传可不传 不传则切换到下一张底图
   * @returns
   */
  let nowBaseMapIndex = 0
  function changeBaseMap(index?:number){
    if(!index){
      nowBaseMapIndex++
      if(nowBaseMapIndex === baseMaps.length) nowBaseMapIndex = 0
      GisMap.basemap = baseMaps[nowBaseMapIndex]
    }else{
      if(index < 0 || index > baseMaps.length - 1){
        return
      }
      GisMap.basemap = baseMaps[index]
    }
  }

  return {
    GisMap,
    view,
    changeBaseMap,
    partnerLayer,
  }
}

/**
 * 随机生成点位
 * @param longitudeRange  经度范围 []
 * @param latitudeRange 纬度范围 []
 * @param number 生成个数
 * @returns 点的集合
 */
export function createPoint(longitudeRange:Array<number>,latitudeRange:Array<number>,number:number){
  const randomInRange = (min: any, max: any) => Math.random() * (max - min) + min
  const data = []
  for (let i = 0; i < number; i++) {
    const longitude = randomInRange(longitudeRange[0], longitudeRange[1])
    const latitude = randomInRange(latitudeRange[0], latitudeRange[1])

    data.push({
      geometry: {
        type: 'point',
        longitude,
        latitude,
      },
      symbol: {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
      attributes: {
        ObjectID: i + 1,
        DepArpt: 'KATL',
        MsgTime: Date.now(),
        FltId: 'UAL1',
      },
    })
  }

  return data
}
