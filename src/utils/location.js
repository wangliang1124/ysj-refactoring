/**
 * Created by admin on 2017/7/8.
 */
/*eslint-disable*/
function toRad(d) {
  return (d * Math.PI) / 180;
}
export default {
  // 维度、经度、维度、经度
  getDistance: (lat1, lng1, lat2, lng2) => {
    // console.log(lat1, lng1, lat2, lng2);
    const radLat1 = toRad(lat1);
    const radLat2 = toRad(lat2);
    const deltaLat = radLat1 - radLat2;
    const deltaLng = toRad(lng1) - toRad(lng2);
    return (2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) +
      (Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2))))) * 6378137;
  },
};
/*eslint-disable*/
