<template>
  <div class="comments">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      border
    >
      <el-table-column prop="commentId" label="id" show-overflow-tooltip width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名"
        show-overflow-tooltip
        width="80"
      ></el-table-column>
      <el-table-column
        prop="dishName"
        label="评论菜品"
        show-overflow-tooltip
        width="100"
      ></el-table-column>
      <el-table-column
        prop="rate"
        label="评分"
        show-overflow-tooltip
        width="75"
        sortable
      ></el-table-column>
      <el-table-column
        prop="commentText"
        label="评论"
        show-overflow-tooltip
        width="200"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        sortable
        show-overflow-tooltip
        width="150"
      >
      </el-table-column>
      <el-table-column label="图片" resizable>
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.commentImgUrl" :key="index" style="margin-right: 5px;">
            <img :src="item" alt=""/></span>
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
  </div>
</template>

<script>
import formattedDate from '@/utils/formattedDate'

export default {
  data () {
    return {
      tableData: [
        {
          commentId: '',
          commentText: '',
          commentImgUrl: [],
          rate: '',
          userName: '',
          createTime: '',
          dishName: ''
        }
      ]
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
      this.$http(`/deleteComment?commentId=${row.commentId}`).then((res) => {
        if (res.data.status === 0) {
          this.$message.success('删除成功')
          this.getComments()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getComments () {
      this.$http('/getComments').then((res) => {
        console.log(res.data)
        if (res.data.status === 0) {
          res.data.messages.forEach((item) => {
            item.createTime = formattedDate(item.createTime)
          })
          this.tableData = res.data.messages
        }
      })
    },
    commentDetail (index, row) {
      console.log(row)
      this.row = row
      this.$store.commit('isEdit')
    }
  },
  mounted () {
    this.getComments()
  }
}
</script>

<style lang="scss" scoped>
.comments {
  .el-table {
    margin-top: 0;
  }
}
</style>
