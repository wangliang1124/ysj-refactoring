<template>
  <div>
    <div id="pickerBox">
        <input id="pickerInput" placeholder="输入关键字选取地点" />
        <div id="poiInfo"></div>
    </div>
    <div id="container">
    </div>
    <Form :model="formItem" :label-width="80">
      <Form-item label="商户城市" style="marginTop: 50px">
        <Select v-model="formItem.city" placeholder="请选择商户所在城市" @on-change='changeCity'>
          <Option :key='city' v-for="city in citys" :value="city.city">{{city.city}}</Option>
        </Select>
      </Form-item>
      <Form-item label="商户菜系" style="marginTop: 50px">
        <Select v-model="formItem.cuisine" placeholder="请选择商户所属菜系" @on-change='changeCuisine'>
          <Option :key='c.id' v-for="c in cuisines" :value="c.id">{{c.cuisine}}</Option>
        </Select>
      </Form-item>
      <Form-item label="商户商区" style="marginTop: 50px">
        <Select v-model="formItem.district" placeholder="请选择商户所属商区" @on-change='changeDistrict'>
          <Option :key='d.id' v-for="d in districts" :value="d.id">{{d.district}}</Option>
        </Select>
      </Form-item>
      <Form-item label="地图标识">
        <Input readonly :maxlength='10' v-model="formItem.mapId" placeholder="地图唯一标识"></Input>
      </Form-item>
      <Form-item label="商户名称">
        <Input autofocus :maxlength='50' v-model="formItem.name" placeholder="请输入商户名称,可与地图搜索结果不一致"></Input>
      </Form-item>
      <Form-item label="商户场景" style="marginTop: 50px">
        <Select v-model="formItem.scene_id" placeholder="请选择商户所属场景,可不选">
          <Option :key='null' :value="0">不选</Option>
          <Option :key='scene' v-for="scene in scenes" :value="scene.id">{{scene.scene}}</Option>
        </Select>
      </Form-item>
      <Form-item label="其他选项" style="marginTop: 50px">
        <Select v-model="formItem.other_id" placeholder="请选择商户所属其他选项,可不选">
          <Option :key='null' :value="0">不选</Option>
          <Option :key='other' v-for="other in others" :value="other.id">{{other.other}}</Option>
        </Select>
      </Form-item>
      <Form-item label="商户介绍">
        <Input v-model="formItem.intro" :step="10" :maxlength='100' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入改商户的相关介绍..."></Input>
      </Form-item>
      <Form-item label="商户地址">
        <Input autofocus :maxlength='50' v-model="formItem.address" placeholder="请输入商户地址,可与地图搜索结果不一致"></Input>
      </Form-item>
      <Form-item label="营业时间">
        <div v-for="item in formItem.openTimes" :key='item' style="marginTop:10px">
          <Input readonly v-model="item.info" placeholder="营业时间段描述..." style="width: 200px"></Input>
          <Time-picker readonly v-model='item.timeRange' format='HH:mm' type="timerange" placement="bottom-end" placeholder="选择营业时间段" style="marginLeft:20px;width: 168px;display:inline-block"></Time-picker>
          <Button @click='removeOpenTime(item)' style="marginLeft:20px">删除</Button>
        </div>
        <div style="display:block;marginTop:10px">
          <Input v-model="input_openTimeName" placeholder="营业时间段描述..." style="width: 200px"></Input>
          <Time-picker v-model='input_openTime' format='HH:mm' type="timerange" placement="bottom-end" placeholder="选择营业时间段" style="marginLeft:20px;width: 168px;display:inline-block"></Time-picker>
          <Button @click='addOpenTime' style="marginLeft:20px">添加</Button>
        </div>
      </Form-item>
      <Form-item label="合约期限">
        <Date-picker v-model="formItem.contract_time" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
      </Form-item>
      <Form-item label="人均单价">
        <Tooltip content="请选择该商户的人均单价">
          <Input-number style="width:200px" size='large' :step="10" :min="0" :max="1000000" v-model="formItem.unit_average" ></Input-number>
        </Tooltip>
      </Form-item>
      <Form-item label="商户纬度">
        <Tooltip content="请选择该商户的人均单价">
          <Input-number style="width:200px" size='large' :step="0.01" :min="0" :max="360" v-model="formItem.location_x" ></Input-number>
        </Tooltip>
      </Form-item>
      <Form-item label="商户经度">
        <Tooltip content="请选择该商户的人均单价">
          <Input-number style="width:200px" size='large' :step="0.01" :min="0" :max="360" v-model="formItem.location_y" ></Input-number>
        </Tooltip>
      </Form-item>
      <Form-item label="餐厅评分" >
        <Tooltip content='请输入餐厅评分1-5分，可以是小数'>
          <Badge dot>
            <Input-number sytle='width:200px' size='large' :step='0.5' :min='1':max='5' v-model='formItem.score' ></Input-number></Badge>
          </Tooltip>
      </Form-item>
      <Form-item label="商户电话">
        <Input style="width:200px" autofocus :maxlength='15' v-model="formItem.tel" placeholder="商户电话号码"></Input>
      </Form-item>
      <Form-item label="商户手机">
        <Input style="width:200px" autofocus :maxlength='11' v-model="formItem.phone" placeholder="商户电话号码"></Input>
      </Form-item>
      <Form-item label="商户标签">
        <Checkbox-group v-model="formItem.tags">
          <Checkbox :label="item.tag" v-for="item in formItem.tags_array" :key="item.id">
            <Tag :name="item.tag" closable @on-close="handleClose(item.id)">{{item.tag}}</Tag>
          </Checkbox>
          <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
        </Checkbox-group>
      </Form-item>
      <Form-item label="Icons信息">
        <Checkbox-group v-model="formItem.icons">
          <Checkbox :label="item.value" v-for="item in formItem.icons_array" :key="item.key">
            <Tag :name="item.value">{{item.value}}</Tag>
          </Checkbox>
        </Checkbox-group>
      </Form-item>
      <Form-item label="商家图片">
        <div class="demo-upload-list" v-for="item in this.formItem.uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.dataUrl">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.dataUrl)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Tooltip content="点击上传图片,如果要替换请先删除再上传">
          <Upload
            :headers='{Authorization: token}'
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="5120"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="http://ysj.tcfellow.com:3000/api/v1/upload/image"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </Tooltip>
      </Form-item>
      <Form-item style="margin-top:50px">
        <Button type="primary" @click='submit'>提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click='$router.go(-1)'>取消</Button>
      </Form-item>
      <Modal title="查看图片" v-model="visible">
          <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </Form>
  </div>
</template>
<script>
// [[121.48, 31.22], [116.3913982, 39.9072254]]
export default {
    data () {
      return {
        formItem: {
          mapId: '',
          city: '',
          cuisine: '',
          district: '',
          name: '',
          unit_average: 1,
          tel: null,
          intro: '',
          address: '',
          location_y: null,
          location_x: null,
          score: 3, // 新增评分
          phone: null,
          openTimes: [],
          contract_time: new Date(),
          uploadList: [],
          tags_array: [],
          tags: [],
          input_tag: '',
          scene_id: 0,
          other_id: 0,
          icons_array: [{
            key: 'tingkeboche',
            value: '待客泊车'
          }, {
            key: 'kedaichongwu',
            value: '可带宠物'
          }, {
            key: 'ditiefujin',
            value: '地铁附近'
          }, {
            key: 'tiaojiubatai',
            value: '调酒吧台'
          }, {
            key: 'wuxianwangluo',
            value: '无线网络'
          }, {
            key: 'youbaobaozuo',
            value: '有宝宝座'
          }, {
            key: 'jiatingjuhui',
            value: '家庭聚会'
          }, {
            key: 'shengjibaoxiang',
            value: '升级包厢'
          }, {
            key: 'canjiren',
            value: '残疾人设施'
          }, {
            key: 'guanjinglutai',
            value: '观景露台'
          }, {
            key: 'qinglvyuehui',
            value: '情侣约会'
          }, {
            key: 'tingbochewei',
            value: '停泊车位'
          }, {
            key: 'shangwuyanxi',
            value: '商务宴席'
          }, {
            key: 'zhoumoBrunch',
            value: '周末Brunch'
          }, {
            key: 'mianfeiyincangcai',
            value: '免费隐藏菜'
          }, {
            key: 'pengyoujuhui',
            value: '朋友聚会'
          }, {
            key: 'yuexiangtuijian',
            value: '玥享推荐'
          }, {
            key: 'xishicanyin',
            value: '西式餐饮'
          }, {
            key: 'ribenliaoli',
            value: '日本料理'
          }, {
            key: 'zhongshicanyin',
            value: '中式餐饮'
          }, {
            key: 'xiawucha',
            value: '下午茶'
          }],
          icons: []
        },
        selectOptions: {
          city: '',
          input: 'pickerInput'
        },
        center: [],
        citys: [],
        cuisines: [],
        districts: [],
        map: null,
        input_openTimeName: null,
        input_openTime: [],
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        token: '',
        scenes: [],
        others: []
      }
    },
    mounted () {
    },
    async created () {
      this.token = window.localStorage.getItem('default-auth-token')
      const res = await this.initData()
      this.citys = res.data
      this.formItem.city = this.citys[0].city
      this.initCuisineData()
      this.initDistrictData()
      this.initOtherData()
      this.initSceneData()
      this.selectOptions.city = this.citys[0].city
      this.center = this.selectOptions.city === '北京' ? [116.3913982, 39.9072254] : [121.48, 31.22]
      this.getMap(this)
      const tagRes = await this.initTagData()
      this.formItem.tags_array = tagRes.data
    },
    methods: {
      async initTagData () {
        const url = '/tag/restaurant'
        return await this.axios.get(url)
      },
      changeCity (value) {
        this.formItem.city = value
        this.initCuisineData()
        this.initDistrictData()
        this.selectOptions.city = value
        this.center = value === '北京' ? [116.3913982, 39.9072254] : [121.48, 31.22]
        this.getMap(this)
      },
      changeCuisine () {

      },
      changeDistrict () {

      },
      addOpenTime () {
        if (!this.input_openTime || this.input_openTime.length === 0) {
          this.$Modal.error({
            title: '营业时间添加失败',
            content: '时间描述不能为空'
          })
          return
        }
        if (!this.input_openTimeName) {
          this.$Modal.error({
            title: '营业时间添加失败',
            content: '营业时间段不能为空'
          })
          return
        }
        const obj = {
          info: this.input_openTimeName,
          timeRange: this.input_openTime
        }
        this.formItem.openTimes.push(obj)
      },
      removeOpenTime (key) {
        this.formItem.openTimes.splice(this.formItem.openTimes.indexOf(key), 1)
      },
      addMarker: function () {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
          this.map.markers.push([lng, lat])
        },
      onSearchResult (pois) {
        let latSum = 0
        let lngSum = 0
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi
            lngSum += lng
            latSum += lat
            this.map.markers.push([poi.lng, poi.lat])
          })
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          }
          this.map.center = [center.lng, center.lat]
        }
      },
      async initCuisineData () {
        const res = await this.axios.get('/cuisine?per_page=500')
        this.cuisines = res.data
        this.formItem.cuisine = res.data[0] ? res.data[0].id : 0
      },
      async initSceneData () {
        const res = await this.axios.get('/scene?per_page=500')
        this.scenes = res.data
      },
      async initOtherData () {
        const res = await this.axios.get('/other?per_page=500')
        this.others = res.data
      },
      async initDistrictData () {
        const res = await this.axios.get(`/district?per_page=500&restaurant_area=${this.formItem.city}`)
        this.districts = res.data
        this.formItem.district = res.data[0] ? res.data[0].id : 0
      },
      async initData () {
        return await this.axios.get('/area')
      },
      async handleClose (id) {
        await this.axios.delete(`/tag/restaurant/${id}`)
        const res = await this.initTagData()
        this.formItem.tags_array = res.data
      },
      handleAdd () {
        this.$Modal.confirm({
          onOk: async () => {
            if (this.formItem.input_tag) {
              const res = await this.axios.post('/tag/restaurant', {tag: this.formItem.input_tag})
              if (res.message && res.message === 'success') this.formItem.tags_array.push(res.data)
              this.formItem.input_tag = ''
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                vModel: this.formItem.input_tag,
                autofocus: true,
                placeholder: '输入标签名称',
                type: 'text',
                maxlength: 10
              },
              on: {
                input: (val) => {
                  this.formItem.input_tag = val
                }
              }
            })
          }
        })
      },
      async submit () {
        const title = '表单提交错误'
        let content = ''
        if (!this.formItem.mapId) content += '<p>商户地图唯一标识不能为空</p>'
        if (!this.formItem.address) content += '<p>商户地址不能为空</p>'
        if (!this.formItem.icons || this.formItem.icons.length < 5) content += '<p>商户Icons信息至少含有5个!</p>'
        if (!this.formItem.intro) content += '<p>商户介绍不能为空</p>'
        if (!this.formItem.city) content += '<p>商户所在城市不能为空</p>'
        if (!this.formItem.cuisine) content += '<p>商户所属菜系不能为空</p>'
        if (!this.formItem.district) content += '<p>商户所属地区不能为空</p>'
        if (!this.formItem.contract_time) content += '<p>商户签约期限不能为空</p>'
        if (!this.formItem.location_x) content += '<p>商户经度不能为空</p>'
        if (!this.formItem.location_y) content += '<p>商户维度不能为空</p>'
        if (!this.formItem.name) content += '<p>商户名称不能为空</p>'
        if (this.formItem.openTimes.length === 0 || !this.formItem.openTimes) content += '<p>商户营业时间不能为空</p>'
        if (this.formItem.phone && !(/^1[34578]\d{9}$/.test(this.formItem.phone))) content += '<p>商户联系手机格式不正确</p>'
        if (!this.formItem.tel || !/([0-9]{3,4}-)?[0-9]{7,8}/.test(this.formItem.tel)) content += '<p>商户联系电话不能为空,或者格式不正确</p>'
        if (!this.formItem.unit_average) content += '<p>商户人均消费不能为空</p>'
        if (this.formItem.uploadList.length === 0 || !this.formItem.uploadList) content += '<p>商户图片列表不能为空</p>'
        const obj = {
          address: this.formItem.address,
          intro: this.formItem.intro,
          city: this.formItem.city,
          contract_time: this.formItem.contract_time,
          location_x: this.formItem.location_x,
          location_y: this.formItem.location_y,
          name: this.formItem.name,
          openTimes: this.formItem.openTimes,
          phone: this.formItem.phone,
          tel: this.formItem.tel,
          unit_average: this.formItem.unit_average,
          uploadList: this.formItem.uploadList,
          tags: this.formItem.tags,
          mapId: this.formItem.mapId,
          restaurant_cuisine_id: this.formItem.cuisine,
          restaurant_district_id: this.formItem.district,
          score: this.formItem.score, // 新增评分
          scene_id: this.formItem.scene_id,
          other_id: this.formItem.other_id,
          icons: JSON.stringify(this.formItem.icons)
        }
        if (content) {
          this.$Modal.error({
            title: title,
            content: content
          })
        } else {
          console.log(obj)
          const res = await this.axios.post('/restaurant', obj)
          if (res.message && res.message === 'success') this.$router.push({path: '/restaurant', reload: true})
        }
      },
      handleView (url) {
        this.imgName = url
        this.visible = true
      },
      handleRemove (file) {
        this.formItem.uploadList.splice(this.formItem.uploadList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        const obj = {
          dataUrl: `http://ysj.tcfellow.com:3000${res.data}`,
          url: res.data,
          alt: file.name,
          status: 'finished'
        }
        this.formItem.uploadList.push(obj)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      handleBeforeUpload () {
        const check = this.formItem.uploadList.length < 5
        if (!check) {
            this.$Notice.warning({
                title: '最多只能上传 5 张图片。'
            })
        }
        return check
      },
      getMap (_this) {
        _this.map = new window.AMap.Map('container', {
          resizeEnable: true,
          center: _this.center,
          zooms: [10, 18]
        })
        window.AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
          var poiPicker = new PoiPicker(_this.selectOptions)
          // 初始化poiPicker
          poiPickerReady(poiPicker)
        })
        function poiPickerReady (poiPicker) {
          window.poiPicker = poiPicker
          var marker = new window.AMap.Marker()
          var infoWindow = new window.AMap.InfoWindow({
              offset: new window.AMap.Pixel(0, -20)
          })
          // 选取了某个POI
          poiPicker.on('poiPicked', function (poiResult) {
            var source = poiResult.source
            var poi = poiResult.item
            var info = {
                source: source,
                id: poi.id,
                name: poi.name,
                location: poi.location.toString(),
                address: poi.address
            }
            _this.formItem.name = poi.name
            _this.formItem.location_y = poi.location.lat
            _this.formItem.location_x = poi.location.lng
            _this.formItem.address = _this.formItem.city + '市' + poi.address
            _this.formItem.mapId = poi.id
            marker.setMap(_this.map)
            infoWindow.setMap(_this.map)
            marker.setPosition(poi.location)
            infoWindow.setPosition(poi.location)
            infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>')
            infoWindow.open(_this.map, marker.getPosition())
            _this.map.setZoomAndCenter(16, marker.getPosition())
          })
          poiPicker.onCityReady(function () {
              poiPicker.suggest('美食')
          })
        }
      }
    }
  }
</script>
<style>
  #container {
    height: 500px;
    margin: 0px;
    font-size: 13px;
  }

  #pickerBox {
    position: absolute;
    z-index: 9999;
    top: 62px;
    right: 0px;
    width: 300px;
  }

  #pickerInput {
    width: 200px;
    padding: 5px 5px;
  }

  #poiInfo {
    background: #fff;
  }

  .amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
  }

  .amap_lib_placeSearch .poi-more {
    display: none!important;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
