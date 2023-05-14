<template>
  <div class="coupon">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="id" show-overflow-tooltip resizable width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.couponId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="条件" show-overflow-tooltip resizable>
        <template slot-scope="scope">
          <span>满{{ scope.row.couponCondition }}元可用</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠" show-overflow-tooltip resizable>
        <template slot-scope="scope">
          <span>减{{ scope.row.value }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" show-overflow-tooltip resizable>
        <template slot-scope="scope">
          <span>{{ scope.row.number }}张</span>
        </template>
      </el-table-column>
      <el-table-column label="限领" show-overflow-tooltip resizable>
        <template slot-scope="scope">
          <span>{{ scope.row.couponLimit }}张</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
        <el-button type="primary" round @click="handleAdd">添加优惠券</el-button>
    </div>
    <coupons-edit v-if="$store.state.isEdit" buttonName="修改" :coupon="coupon"></coupons-edit>
    <coupons-edit v-if="$store.state.isAdd" buttonName="添加"></coupons-edit>
  </div>
</template>

<script>
import couponsEdit from '@/components/coupons/couponsEdit.vue'
export default {
  components: {
    couponsEdit
  },
  data () {
    return {
      tableData: [
        {
          couponId: 1,
          couponCondition: '',
          value: '',
          number: '',
          couponLimit: ''
        }
      ],
      coupon: {}
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.coupon = row
      this.$store.commit('isEdit')
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$http.delete('/couponDelete', {
        params: {
          couponId: row.couponId
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.$message.success(res.data.messages)
          location.reload()
        }
        if (res.data.status === -1) {
          this.$message.error('删除失败')
        }
      })
    },
    handleAdd () {
      this.$store.commit('isAdd')
    }
  },
  created () {
    this.$http.get('/coupon').then(res => {
      console.log(res.data)
      if (res.data.status === 0) {
        this.tableData = res.data.messages
      }
      if (res.data.status === -1) {
        this.$message.error('获取数据失败，请重新加载页面')
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
