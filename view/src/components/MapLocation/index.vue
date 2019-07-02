<template>
  <div id="mapLocation"></div>
</template>
<script>
export default {
  data () {
    return {
      map: null,
      position: { coords: {} }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    /**
     * 获取定位
     * 请求成功的函数，接受一个参数，该参数下有一下属性：
     * 经度 : coords.longitude
     * 纬度 : coords.latitude
     * 准确度 : coords.accuracy
     * 海拔 : coords.altitude
     * 海拔准确度 : coords.altitudeAcuracy
     * 行进方向 : coords.heading
     * 地面速度 : coords.speed
     * 时间戳 : new Date(position.timestamp)
     * 不过其中有些属性只有在移动设备才会存在。
     */
    getLocation () {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position
        this.initMap(position.coords)
      }, error => {
        console.log('定位失败')
        console.log(error)
      }, {
        enableHighAccuracy: true, // 更精确的定位，默认是false
        maximumAge: 30000, // 位置可缓存的最大时间，默认是0
        timeout: 27000 // 获取定位的超时时间，默认是infinity
      })
    },
    // 监听位置变化
    watchLocation () {
      navigator.geolocation.watchPosition(position => {
        this.position = position
        console.log(position)
      }, error => {
        console.log('定位失败')
        console.log(error)
      }, {
        enableHighAccuracy: true, // 更精确的定位，默认是false
        maximumAge: 30000, // 位置可缓存的最大时间，默认是0
        timeout: 27000 // 获取定位的超时时间，默认是infinity
      })
    },
    // 初始化地图
    initMap (coords) {
      // this.convertFrom([coords.longitude, coords.latitude], 'gps').then(resLnglat => {
      //   // 创建地图
      //   this.map = new window.AMap.Map('mapLocation', {
      //     resizeEnable: true, // 是否监听地图容器尺寸变化
      //     zoom: 17, // 初始化地图层级
      //     center: [resLnglat.lng, resLnglat.lat] // 初始化地图中心点
      //   })
      //   // 初始化插件
      //   this.initMapPlugins()
      // })
      this.map = new window.AMap.Map('mapLocation', { resizeEnable: true })
      this.initMapPlugins()
    },
    // 初始化地图插件
    initMapPlugins () {
      let self = this
      window.AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.ControlBar'], function () {
        // 加载toolbar插件
        let toolBar = new window.AMap.ToolBar()
        self.map.addControl(toolBar)
        // 加载scale插件
        let scale = new window.AMap.Scale()
        self.map.addControl(scale)
        // 加载geolocation插件
        let geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认true
          timeout: 10000, // 超过10s后停止定位，默认5s
          buttonPosition: 'RB', // 定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(15, 150), // 定位按钮与设置的停靠位置的偏移量，默认Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野至定位点
        })
        self.map.addControl(geolocation)
        geolocation.getCurrentPosition(function (status, result) {})
        // 罗盘插件
        self.map.addControl(new window.AMap.ControlBar())
      })
    },
    // 坐标转换
    convertFrom (lnglat, type) {
      return new Promise((resolve, reject) => {
        window.AMap.convertFrom(lnglat, type, function (status, result) {
          if (result.info === 'ok') {
            let resLnglat = result.locations[0]
            resolve(resLnglat)
          } else {
            reject(new Error('左边转换失败'))
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#mapLocation
  width 100%
  height 100%
</style>
