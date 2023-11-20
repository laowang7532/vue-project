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