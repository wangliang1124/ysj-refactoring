<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
    <Form-item label="特色菜名称" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入特色菜名称"></Input>
    </Form-item>
    <Form-item label="特色菜类型" prop="type">
      <Input v-model="formValidate.type" placeholder="请输入特色菜类型,如隐式菜"></Input>
    </Form-item>
    <Form-item label="特色菜封面" prop="avatar">
      <div class="demo-upload-list" v-for="item in this.formValidate.uploadList2">
        <template v-if="item.status === 'finished'">
          <img :src="item.dataUrl">
          <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.dataUrl)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Tooltip content="点击上传图片,如果要替换请先删除再上传">
        <!-- <Upload v-if="formValidate.uploadList2.length === 0" 2017-11-16 -->
        <Upload 
          :headers='{Authorization: token}'
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess2"
          :format="['jpg','jpeg','png']"
          :max-size="5120"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload2"
          type="drag"
          action="http://ysj.tcfellow.com:3000/api/v1/upload/image"
          style="display: inline-block;width:58px;">
              <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
      </Tooltip>
    </Form-item>
    <Form-item label="价值" prop="value">
      <Tooltip content="请输入此菜品的价值">
        <Input-number autofocus :step="10" :min="0" :max="10000" v-model="formValidate.value" ></Input-number>
      </Tooltip>
    </Form-item>
    <Form-item label="主厨名称" prop="cook_name">
      <Input v-model="formValidate.cook_name" placeholder="请输入主厨名称"></Input>
    </Form-item>
    <Form-item label="主厨照片" prop="cook_avatar">
      <div class="demo-upload-list" v-for="item in this.formValidate.uploadList">
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
        <Upload v-if="formValidate.uploadList.length === 0"
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
    <Form-item label="主厨介绍" prop="cook_intro">
      <Input type="textarea" v-model="formValidate.cook_intro" placeholder="请输入主厨介绍"></Input>
    </Form-item>
    <Form-item label="超赞主厨" prop="cook_super">
      <i-switch v-model="formValidate.cook_super"></i-switch>
    </Form-item>
    <Form-item label="有效期" prop="expire_time">
        <Date-picker v-model="formValidate.expire_time" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
    </Form-item>
    <Form-item label="其他说明" prop="intro">
      <Input type="textarea" v-model="formValidate.intro" placeholder="请补充其他说明"></Input>
    </Form-item>
    <Form-item label="超级食探" prop="markdown_shitan">
      <Input v-model="formValidate.markdown_shitan" placeholder="请输入超级食探页面的url"></Input>
    </Form-item>
    <Form-item label="Chef Talk" prop="markdown_shika">
      <Input v-model="formValidate.markdown_shika" placeholder="请输入对话食咖页面的url"></Input>
    </Form-item>
    <Form-item label="菜品详情" prop="markdown_content">
          <div class="quill-editor-example">
          <!-- quill-editor -->
            <quill-editor ref="myTextEditor1"
              v-model="formValidate.markdown_content"
              :options="editorOption1"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady1($event)">
            </quill-editor>
          </div>
    </Form-item>
    <Form-item label="规则详情" prop="markdown_rule">
          <div class="quill-editor-example">
          <!-- quill-editor -->
            <quill-editor ref="myTextEditor2"
              v-model="formValidate.markdown_rule"
              :options="editorOption2"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady2($event)">
            </quill-editor>
          </div>
    </Form-item>
    <Form-item label="添加推荐餐厅" prop="recommend_restaurant"><!--新增推荐餐厅-->
        <div>
          <div class="control">
            <span class="select">
              <select v-model='selected'>
                <option disabled value="">请选择</option>
                <option v-for='item in formValidate.restaurantAll' v-bind:value='item'>
                  {{item.name}}           
                </option>
              </select>
            </span>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAddRecommend(selected)">添加餐厅</Button>
          </div>
          <Checkbox-group>
            <Checkbox :label="item.name" v-for="(item,index) in formValidate.recommend_restaurant" :key="item.id">
              <Tag :name="item.name" closable @on-close="handleClose(index)">{{item.name}}</Tag>
            </Checkbox>
          </Checkbox-group>
        </div>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </Form-item>
    <!-- 查看图片(封面照&主厨照) begin-->
    <Modal title="查看图片" v-model="visible">  
          <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
      <Upload
        id = 'uploadBase641'
        :headers='{Authorization: token}'
        ref="upload_base"
        :show-upload-list="false"
        :on-success="handleSuccessBase641"
        :format="['jpg','jpeg','png']"
        :max-size="5120"
        :on-format-error="handleFormatErrorBase64"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action="http://ysj.tcfellow.com:3000/api/v1/upload/image"
        style="display: none;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>
      <Upload
        id = 'uploadBase642'
        :headers='{Authorization: token}'
        ref="upload_base"
        :show-upload-list="false"
        :on-success="handleSuccessBase642"
        :format="['jpg','jpeg','png']"
        :max-size="5120"
        :on-format-error="handleFormatErrorBase64"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action="http://ysj.tcfellow.com:3000/api/v1/upload/image"
        style="display: none;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>
       <!-- 查看图片 end-->
  </Form>
</template>
<script>
  import moment from 'moment'

  export default {
    data () {
      return {
        imgName: '',
        visible: false,
        token: '',
        defaultList: [],
        selected: '',
        checked: false,
        selectedName: '',
        formValidate: {
          specialty_id: null,
          restaurant_id: null,
          name: '',
          type: '',
          value: 1,
          cook_name: '',
          cook_intro: '',
          cook_super: false,
          expire_time: null,
          intro: '',
          uploadList: [],
          uploadList2: [],
          markdown_content: null,
          markdown_rule: null,
          markdown_shika: null,
          markdown_shitan: null,
          cook_avatar: '',
          cover: '',
          recommend_id: [],   // 新增推荐餐厅id
          recommend_restaurant: [], // 新增推荐餐厅
          restaurantAll: []  // 新增所有餐厅
        },
        ruleValidate: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          value: [
            { required: true, type: 'number', max: 100000, min: 1, message: '价值必须在1到100000之间', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请填写类型', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请填写主厨姓名', trigger: 'blur' }
          ],
          markdown_shika: [
            { required: false }
          ],
          markdown_shitan: [
            { required: false }
          ],
          cook_name: [
            { required: true, message: '请填写主厨姓名', trigger: 'blur' }
          ],
          cook_intro: [
            { required: true, message: '请填写主厨介绍', trigger: 'blur' },
            { type: 'string', max: 350, min: 20, message: '字数在20到350字之间', trigger: 'blur' }
          ],
          cook_avatar: [
            {required: true, message: '请上传厨师照片', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '请上传特色菜封面照片', trigger: 'blur'}
          ],
          expire_time: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' },
            { type: 'date', message: '请选择正确的日期格式', trigger: 'change' }
          ],
          markdown_content: [
            { required: true, message: '请填写菜品详情', trigger: 'blur' }
          ],
          markdown_rule: [
            { required: true, message: '请填写规则详情', trigger: 'blur' }
          ]
        },
        content: '',
        editor1: null,
        editor2: null,
        editorOption1: {
          modules: {
            imageImport: true,
            imageResize: {
              displaySize: true
            },
            toolbar: {
              container: [
                ['background'],
                ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
                ['blockquote', 'code-block'],
                [{'header': 1}, {'header': 2}],     // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],     // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],         // outdent/indent
                [{'direction': 'rtl'}],                 // text direction
                [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],      // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['clean'],
                ['image']                        // remove formatting button
              ],
              handlers: {
                'image': function () {
                  document.getElementById('uploadBase641').children[0].children[0].click()
                }
              }
            }
          }
        },
        editorOption2: {
          modules: {
            imageImport: true,
            imageResize: {
              displaySize: true
            },
            toolbar: {
              container: [
                ['background'],
                ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
                ['blockquote', 'code-block'],
                [{'header': 1}, {'header': 2}],     // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],     // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],         // outdent/indent
                [{'direction': 'rtl'}],                 // text direction
                [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],      // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['clean'],
                ['image']                        // remove formatting button
              ],
              handlers: {
                'image': function () {
                  document.getElementById('uploadBase642').children[0].children[0].click()
                }
              }
            }
          }
        }
      }
    },
    async created () {
      this.formValidate.specialty_id = this.$route.params.id
      this.token = window.localStorage.getItem('default-auth-token')
      const res = await this.initData()
      this.formValidate.specialty_id = res.data.id
      this.formValidate.restaurant_id = res.data.restaurant.id
      this.formValidate.name = res.data.name
      this.formValidate.type = res.data.type
      this.formValidate.value = res.data.value
      this.formValidate.cook_name = res.data.cook_name
      this.formValidate.cook_intro = res.data.cook_intro
      this.formValidate.cook_super = res.data.cook_super
      this.formValidate.expire_time = new Date(res.data.expire_time)
      this.formValidate.intro = res.data.intro
      this.formValidate.markdown_content = res.data.content_markdown_url
      this.formValidate.markdown_rule = res.data.rule_markdown_url
      this.formValidate.markdown_shika = res.data.shika_markdown_url
      this.formValidate.markdown_shitan = res.data.shitan_markdown_url
      this.formValidate.uploadList2 = res.data.specialty_imgs.map(item => {
        return {
          status: 'finished',
          dataUrl: item.url,
          url: item.url
        }
      })
      this.formValidate.uploadList = [{
        status: 'finished',
        dataUrl: res.data.cook_avatar,
        url: res.data.cook_avatar
      }]
      this.formValidate.cover = res.data.cover
      this.formValidate.uploadList2[0] = {  // 之所以用cover给uploadlist2赋值，是因为以前的specialty_img是空的
        status: 'finished',
        dataUrl: res.data.cover,
        url: res.data.cover
      }
      // 初始化推荐餐厅数据
      this.formValidate.cook_avatar = res.data.cook_avatar
      if (res.data.recommend_id) {
        this.formValidate.recommend_id = res.data.recommend_id && res.data.recommend_id.split(',') || []
        const restaurantData = await this.axios.get(`/restaurant/recommend/${res.data.recommend_id}`)  // 获取推荐餐厅数据
        this.formValidate.recommend_restaurant = restaurantData.data
        console.log('=========初始化推荐餐厅数据=======' + res.data.recommend_id)
        console.log(this.formValidate.recommend_restaurant)
      }
      // 初始化所有餐厅数据，用于下拉列表
      const restaurantAllData = await this.axios.get(`/restaurant_all`)
      this.formValidate.restaurantAll = restaurantAllData.data
      console.log('=========初始化餐厅数据完毕=======')
      console.log(this.formValidate.uploadList2)
    },
    methods: {
      async initData () {
        return await this.axios.get(`/specialty/${this.formValidate.specialty_id}`)
      },
      imageHandler (image, callback) {
        // Should get image in here somehow..
        // Send image to server,
        //  Server will return link to image
        const reader = new FileReader()
        var img = event.target.files[0]
        reader.readAsDataURL(img)
        var that = this
        reader.onloadend = function () {
          // 上传图片
          that.axios.post('http://ysj.tcfellow.com:3000/api/v1/upload/base64', {content: reader.result})
        }
      },
      async handleSubmit (formValidate) {
        const body = {
          id: this.formValidate.specialty_id,
          cook_avatar: this.formValidate.cook_avatar,
          cover: this.formValidate.uploadList2[0].dataUrl,  // 图片列表中的第一个
          cook_intro: this.formValidate.cook_intro,
          cook_name: this.formValidate.cook_name,
          intro: this.formValidate.intro,
          content_markdown_url: this.formValidate.markdown_content,
          rule_markdown_url: this.formValidate.markdown_rule,
          shika_markdown_url: this.formValidate.markdown_shika,
          shitan_markdown_url: this.formValidate.markdown_shitan,
          name: this.formValidate.name,
          type: this.formValidate.type,
          value: this.formValidate.value,
          restaurant_id: this.formValidate.restaurant_id,
          expire_time: moment(this.formValidate.expire_time).valueOf(),
          cook_super: this.formValidate.cook_super,
          // recommend_id: this.formValidate.recommend_id.join(),   // 非必须项
          specialty_imgs: this.formValidate.uploadList2    // 2017-11-16
        }
        this.$refs[formValidate].validate(async (valid) => {
          if (valid) {
            const res = await this.axios.put(`/specialty/${this.formValidate.specialty_id}`, body)
            if (res.message && res.message === 'success') {
              this.$Message.success('提交成功!')
              this.$router.push(`/restaurant/detail/${this.formValidate.restaurant_id}`)
            } else {
              this.$Message.error('表单提交失败!')
            }
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      onEditorBlur (editor) {
      },
      onEditorFocus (editor) {
      },
      onEditorReady1 (editor) {
        this.editor1 = editor
      },
      onEditorReady2 (editor) {
        this.editor2 = editor
      },
      handleView (url) {
        this.imgName = url
        this.visible = true
      },
      handleRemove (file) {
        this.formValidate.uploadList.splice(this.formValidate.uploadList.indexOf(file), 1)
      },
      handleRemove2 (file) {
        this.formValidate.uploadList2.splice(this.formValidate.uploadList2.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        const obj = {
          url: res.data,
          dataUrl: `http://ysj.tcfellow.com:3000${res.data}`,
          alt: file.name,
          status: 'finished'
        }
        this.formValidate.uploadList.push(obj)
        this.formValidate.cook_avatar = obj.url
      },
      handleSuccess2 (res, file) {
        const obj = {
          url: res.data,
          alt: file.name,
          dataUrl: `http://ysj.tcfellow.com:3000${res.data}`,
          status: 'finished'
        }
        this.formValidate.uploadList2.push(obj)
        // this.formValidate.cover = obj.dataUrl
        // console.log(this.formValidate.uploadList2)
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleSuccessBase641 (res, file) {
        this.editor1.insertEmbed(this.length, 'image', `http://ysj.tcfellow.com:3000${res.data}`)
      },
      handleSuccessBase642 (res, file) {
        this.editor2.insertEmbed(this.length, 'image', `http://ysj.tcfellow.com:3000${res.data}`)
      },
      handleFormatErrorBase64 () {
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
        const check = this.formValidate.uploadList.length < 1
        if (!check) {
            this.$Notice.warning({
                title: '最多只能上传 1 张图片。'
            })
        }
        return check
      },
      handleBeforeUpload2 () {
        const check = this.formValidate.uploadList2.length < 2
        if (!check) {
            this.$Notice.warning({
                title: '最多只能上传 2 张特色菜图片。'
            })
        }
        return check
      },
      handleClose (index) { // 推荐餐厅删除事件处理
        this.formValidate.recommend_restaurant.splice(index, 1)
        let delId = this.formValidate.recommend_id.splice(index, 1)
        console.log('=========删除推荐餐厅数据成功=======' + delId)
        console.log(this.formValidate.recommend_id)
      },
      handleAddRecommend (selected) { // 推荐餐厅添加事件处理
        if (!selected) {
          return '未选中餐厅'
        }
        this.formValidate.recommend_id.push(selected.id)
        this.formValidate.recommend_restaurant.push(selected)
        // this.initResData()
        console.log('recommend_id:' + this.formValidate.recommend_id)
      }
    }
  }
</script>
<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
