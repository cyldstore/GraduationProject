<template>
  <div id="foodsEdit">
    <form action="">
      <div class="name">
        <label for="foodName">
          <span>菜品名称</span>
          <input type="text" id="foodName" required v-model="dishes.name"/>
        </label>
      </div>
      <div class="desc">
        <label for="foodDesc">
          <span>菜品描述</span>
          <textarea id="foodDesc" required v-model="dishes.description"></textarea>
        </label>
      </div>
      <div class="category">
        <label for="foodCategory">
          <span>菜品类别</span>
          <input type="text" id="foodCategory" required v-model="dishes.category"/>
        </label>
      </div>
      <div class="price">
        <label for="foodPrice">
          <span>菜品单价</span>
          <input type="number" id="foodPrice" required v-model="dishes.price"/>
        </label>
      </div>
      <div class="upload">
        <el-upload
          action="http://127.0.0.1:3000/api/houtai/foodsupload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :headers="{Authorization:'Bearer '+$store.state.token}"
          ref="upload"
          name="foodsImg"
          :multiple="true"
          accept="image/*"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <div class="button">
        <el-button type="info" round @click="editCancel">取消</el-button>
        <el-button type="primary" round @click="handleClick">{{
          buttonName
        }}</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: '提交'
    },
    row: {
      type: Object,
      default: () => ({
        dishId: 0,
        name: '',
        description: '',
        category: '',
        imageUrl: [],
        price: Number(),
        averageRating: Number()
      })
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      dishes: {
        dishId: 0,
        name: '',
        description: '',
        category: '',
        imageUrl: [],
        price: Number(),
        averageRating: Number()
      }
    }
  },
  methods: {
    editCancel () {
      this.$store.commit('cancel')
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleClick () {
      if (this.$props.buttonName === '修改') {
        console.log('修改')
        this.foodsRequest('/foodsEdit').then(res => {
          if (res === '信息不完整') {
            this.$message.error(res)
          }
          if (res.status === -1) {
            console.log(res.messages)
            this.$message.error('修改失败，请重新提交')
          }
          if (res.status === 0) {
            this.$message.success('修改成功')
            this.$store.commit('cancel')
            location.reload()
          }
        })
      }
      if (this.$props.buttonName === '添加') {
        console.log('添加')
        this.foodsRequest('/foodsAdd').then(res => {
          console.log(res)
          if (res === '信息不完整') {
            this.$message.error(res)
          }
          if (res.status === -1) {
            console.log(res.messages)
            this.$message.error('添加失败，请重新提交')
          }
          if (res.status === 0) {
            this.$message.success('添加成功')
            this.$store.commit('cancel')
            location.reload()
          }
        })
      }
    },
    foodsRequest (path) {
      // 通过ref获取到el-upload组件实例，进而获取上传的文件列表
      const fileList = this.$refs.upload.uploadFiles
      // console.log(fileList)

      // 创建FormData对象
      const formData = new FormData()

      // 遍历上传文件列表，将每一个文件添加到FormData对象中
      fileList.forEach(file => {
        formData.append('foodsImg', file.raw)
      })

      return new Promise((resolve, reject) => {
        this.$http.post('/foodsupload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.dishes.imageUrl = res.data
          this.$http.post(path, this.dishes).then(res => {
            resolve(res.data)
          })
        })
      })
    }
  },
  created () {
    this.dishes = this.$props.row
    this.dishes.imageUrl.forEach(item => {
      const name = item.slice((item.lastIndexOf('/')) + 1)
      this.fileList.push({
        name: name,
        url: item
      })
    })
    console.log(this.fileList)
  }
}
</script>

<style lang="scss" scoped>
#foodsEdit {
  width: 40%;
  height: 80%;
  padding: 10px;
  overflow: auto;
  border-radius: 20px;
  background: rgb(204, 228, 237);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  z-index: 1000;
  form > div {
    margin-bottom: 10px;
  }
  span {
    display: inline-block;
    margin-right: 10px;
    width: 4em;
  }
  input {
    width: 200px;
    height: 30px;
    border-radius: 10px;
    border: 0;
    padding-left: 10px;
  }
  textarea {
    box-sizing: border-box;
    width: 400px;
    height: 100px;
    resize: none;
    padding: 10px;
    border-radius: 10px;
    border: 0;
  }
  .desc {
    label {
      display: flex;
      align-items: flex-start;
      span {
        margin-top: 10px;
      }
    }
  }
  .upload {
    box-sizing: border-box;
    height: 160px;
    width: auto;
    padding: 5px 5px;
    display: inline-block;
    border-radius: 10px 0 0 10px;
    overflow: auto;
    background: #fff;
  }
  .upload::-webkit-scrollbar {
    width: 5px;
    height: 100px;
  }
  .upload::-webkit-scrollbar-thumb {
    width: 100%;
    height: 80%;
    background: palevioletred;
  }
  .upload::-webkit-scrollbar-track {
    width: 100%;
    height: 100%;
    background: #000;
  }
  .button {
    margin: 0;
    display: flex;
    justify-content: space-around;
  }
}
</style>
