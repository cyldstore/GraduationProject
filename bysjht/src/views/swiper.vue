<template>
  <div class="swiper">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="id" show-overflow-tooltip resizable width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.swiperId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        show-overflow-tooltip
        resizable
        min-width="100"
      >
        <template slot-scope="scope">
          <span><img :src="scope.row.swiperUrl" alt=""></span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片URL"
        show-overflow-tooltip
        resizable
        width="740"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.swiperUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-upload
        action=""
        :limit="1"
        :auto-upload="false"
        accept="image/*"
        :on-change="handleUploadChange"
        name="swiperImg"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">添加轮播图</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          swiperId: 1,
          swiperUrl: ''
        }
      ]
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
      this.$http.delete('/swiperDelete', {
        params: {
          swiperId: row.swiperId
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.$message.success(res.data.messages)
          location.reload()
        }
        if (res.data.status === -1) {
          this.$message.error('删除失败，请重新删除')
        }
      })
    },
    handleUploadChange (file) {
      const formData = new FormData()
      formData.append('swiperImg', file.raw)

      this.$http.post('/swiperupload', formData, {
        Headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.$message.success(res.data.messages)
          location.reload()
        }
        if (res.data.status === -1) {
          this.$message.error('添加失败，请重试')
        }
      })
    }
  },
  created () {
    this.$http.get('/swiper').then(res => {
      if (res.data.status === 0) {
        this.tableData = res.data.messages
      }
      if (res.data.status === -1) {
        this.$message.error('获取数据失败，请重新刷新页面')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  .el-table{
    margin-top: 40px;
  }
}
</style>
