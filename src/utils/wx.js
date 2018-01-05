/**
 * Created by admin on 2017/7/8.
 */
// import location from './location'
import api from './api'


// const getMinPlace = (list, res) => {
//   let minD = -1
//   let minPlace = {}
//   list.forEach((item) => {
//     const current = location.getDistance(
//       item.location_x,
//       item.location_y,
//       res.latitude,
//       res.longitude,
//     )
//     if (current < minD || minD === -1) {
//       minD = current
//       minPlace = item
//     }
//   })
//   return minPlace
// }
const wx = window.jWeixin
const wxAPI = {
  async initWx() {
    const config = await api.get('/wx/signature', {
      params: { url: window.location.href.split('#')[0] },
    })
    const d = config.data
    wx.config({
      debug: process.env.NODE_ENV !== 'production',
      appId: d.appId,
      nonceStr: d.nonceStr,
      signature: d.signature,
      timestamp: d.timestamp,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'getLocation',
        'chooseImage',
        'uploadImage',
        'openLocation',
        'scanQRCode',
        'chooseWXPay',
      ],
    })
    console.log('获得wx签名!')
  },
  getLocation() {
    wx.ready(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res) {
          window.localStorage.setItem('location', JSON.stringify(res))
          // callback(getMinPlace(list, res), res)
        },
      })
    })
  },
  getAddress(callback) {
    wx.ready(() => {
      wx.openAddress({
        success(address) {
          callback(address)
        },
      })
    })
  },
  // chooseImage(callback, callback2) {
  //   wx.ready(() => {
  //     wx.chooseImage({
  //       count: 1, // 默认9
  //       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //       success(res) {
  //         let { localIds } = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
  //         if (localIds.length) {
  //           localIds = localIds[0]
  //           callback(localIds)
  //           wx.uploadImage({
  //             localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
  //             isShowProgressTips: 1, // 默认为1，显示进度提示
  //             success(res2) {
  //               const serverId = res2.serverId // 返回图片的服务器端ID
  //               callback2(serverId)
  //             },
  //           })
  //         }
  //       },
  //     })
  //   })
  // },
  openMap(lat, lng, name, address) {
    wx.ready(() => {
      wx.openLocation({
        latitude: lng, // 纬度，浮点数，范围为90 ~ -90
        longitude: lat, // 经度，浮点数，范围为180 ~ -180。
        name, // 位置名
        address, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
      })
    })
  },
  openScanQRCode() {
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success(res) {
          console.log(res.resultStr)
          // if (typeof res.resultStr === 'string') {
          //   // callback(res.resultStr)
          //   console.log(res.resultStr)
          // }
        },
      })
    })
  },
}

export default wxAPI
