/**
 * Created by admin on 2017/8/3.
 */
/**
 * Created by admin on 2017/7/8.
 */
/*eslint-disable*/
const _getSearchParamList = ()=>{
  const searchParamList = location.search.replace('?','').split('&')
  return searchParamList.reduce((ret, key)=>{
    const arr = key.split('=')
    if(arr && arr.length>1){
      ret[arr[0]] = arr[1]
    }
    return ret
  },{})
};

export default {
  getSearchParamList:()=>{
    _getSearchParamList()
  },
  getSearchParam: (key) => {
    return _getSearchParamList()[key] || ''
  },
};
/*eslint-disable*/
