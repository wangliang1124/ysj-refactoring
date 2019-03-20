import moment from 'moment'
export let timeFilter = (value, format) => {
  if (!value) return '无'
  value = parseInt(value)
  return moment(value).locale('zh-cn').format('lll')
}

export let timeFilterTime = (value) => {
  if (!value) return '无'
  value = parseInt(value)
  return moment(value).locale('zh-cn').format('HH:mm')
}
