<template>
  <div class="mapLocation">
    <map-location></map-location>
    <a href="javascript:window.opener=null;top.close();">关闭</a>
    <a href="javascript:window.opener=null;window.open('', '_self', '', true);">Go</a>
  </div>
</template>
<script>
import MapLocation from 'components/MapLocation'

export default {
  data () {
    return {
      data: 'location'
    }
  },
  components: {
    MapLocation
  }
}
</script>
<style lang="stylus" scoped>
.mapLocation
  height 100%
</style>
