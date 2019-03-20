<template>
<div>
  <div class="demo-upload-list2" v-for="item in uploadList">
    <template v-if="item.status === 'finished'">
      <img :src="item.url">
      <div class="demo-upload-list-cover2">
        <Icon type="ios-eye-outline" @click.native="handleView(item.name, item.url)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </template>
    <template v-else>
      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
    </template>
  </div>
  <Upload
    ref="upload"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :max-size="5120"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    type="drag"
    action="http://ysj.tcfellow.com:3000/api/v1/upload/image"
    style="display: inline-block;width:375px;">
    <div style="width: 375px;height:230px;line-height: 230px;">
      <Icon type="camera" size="20"></Icon>
      <p style="position: absolute; bottom: 30px; text-align: center; left: 130px;">请上传16/9的横图!</p>
    </div>
  </Upload>
  <Modal title="查看图片" v-model="visible">
    <img :src='imgSrc' v-if="visible" style="width: 100%">
  </Modal>
  <Modal title="新增banner" v-model="addBanner" @on-ok='uploadBanner'>
    <Form :model="formItem" :label-width="80">
    <Form-item label="banner连接">
      <Input v-model="formItem.link" autofocus :maxlength='50' placeholder="请输入banner点击的url链接,不填写则点击不跳转"></Input>
    </Form-item>
    <Form-item label="banner说明">
      <Input v-model="formItem.intro" autofocus :maxlength='50' placeholder="请输入banner说明"></Input>
    </Form-item>
    <Form-item label="banner预览">
      <img :src='formItem.url'style="width: 100%">
    </Form-item>
  </Form>
  </Modal>
</div>
</template>
<script>
  export default {
    data () {
      return {
        defaultList: [
        ],
        addBanner: false,
        imgName: '',
        imgSrc: '',
        visible: false,
        uploadList: [],
        formItem: {
          url: null,
          dataUrl: null
        }
      }
    },
    methods: {
      initBannerData () {
        return this.axios.get('/banner')
      },
      async uploadBanner () {
        const res = await this.axios.post('/banner', {
          url: this.formItem.dataUrl,
          intro: this.formItem.intro,
          link: this.formItem.link
        })
        if (res && res.message === 'success') {
          this.uploadList.push({
            url: this.formItem.url,
            dataUrl: this.formItem.dataUrl,
            alt: '',
            status: 'finished',
            id: res.data.id
          })
          this.formItem = {}
          this.addBanner = false
        }
      },
      handleView (name, src) {
        this.imgName = name
        this.imgSrc = src
        this.visible = true
      },
      async handleRemove (item) {
        // 从 upload 实例删除数据
        const res = await this.axios.delete(`/banner/${item.id}`)
        if (res && res.message === 'success') {
          this.uploadList.splice(this.uploadList.indexOf(item), 1)
        }
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        const obj = {
          url: `http://ysj.tcfellow.com:3000${res.data}`,
          dataUrl: res.data,
          alt: file.name,
          status: 'finished'
        }
        // this.uploadList.push(obj)
        this.formItem.url = obj.url
        this.formItem.dataUrl = obj.dataUrl
        this.addBanner = true
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
      handleBeforeUpload (file) {
        const check = this.uploadList.length < 10
        if (!check) {
          this.$Notice.warning({
              title: '最多只能上传 10 张图片。'
          })
        }
        return check
      }
    },
    async mounted () {
      this.uploadList = this.$refs.upload.fileList
      const res = await this.initBannerData()
      this.uploadList = res.data.rows.map(r => {
        r.status = 'finished'
        return r
      })
    }
  }
</script>
<style>
  .demo-upload-list2{
    display: inline-block;
    width: 375px;
    height: 230px;
    text-align: center;
    line-height: 230px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list2 img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover2{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list2:hover .demo-upload-list-cover2{
    display: block;
  }
  .demo-upload-list-cover2 i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
