<script setup lang="ts">
import { onHide, onShow } from '@dcloudio/uni-app'

onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
// onLaunch(async () => {
//   nextTick(async () => {
//     const t = getCurrentPages()
//     const pageName = t?.[t.length - 1]?.route || ''
//     if (pageName.includes('/pages/common/auth'))
//       return
//     if (getCacheToken()) {
//       await userStore.getUserInfo()
//     }
//     else {
//       userStore.performLogout()
//     }
//   })
// })
</script>

<style lang="scss">
:not(not) {
  box-sizing: border-box;
}
</style>
