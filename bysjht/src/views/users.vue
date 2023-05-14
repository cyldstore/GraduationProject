<template>
  <div class="users">
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column prop="customerId" label="id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="图片" resizable width="100">
        <template slot-scope="scope">
          <span><img :src="scope.row.userAvatar" alt="" /></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="用户手机"
        show-overflow-tooltip
      ></el-table-column>
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
export default {
  data () {
    return {
      isReceive: false,
      tableData: [
        {
          customerId: '',
          userName: '',
          userAvatar: '',
          gender: '',
          phone: ''
        }
      ]
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
      this.$http(`/deleteuser?customerId=${row.customerId}`).then(res => {
        if (res.data.status === 0) {
          this.$message.success('删除成功')
          this.getCustomers()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getCustomers () {
      this.$http('/customers').then((res) => {
        console.log(res.data)
        if (res.data.status === 0) {
          this.tableData = res.data.messages
        }
      })
    }
  },
  mounted () {
    this.getCustomers()
  }
}
</script>

<style lang="scss" scoped>
.users {
  .el-table {
    margin-top: 0;
  }
}
</style>
