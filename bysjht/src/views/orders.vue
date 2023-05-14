<template>
  <div class="orders">
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column prop="orderId" label="id" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="手机号码"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="totalAmount"
        label="订单金额"
        sortable
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="orderTime"
        label="预约时间"
        sortable
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="Tag"
        label="订单状态"
        width="100"
        :filters="[
          { text: '未接单', value: '未接单' },
          { text: '已接单', value: '已接单' },
          { text: '已完成', value: '已完成' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.Tag === '未接单'
                ? 'primary'
                : scope.row.Tag === '已接单'
                ? 'primary'
                : 'success'
            "
            disable-transitions
            >{{ scope.row.Tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="orderAccess(scope.$index, scope.row)"
            :disabled="scope.row.Tag !== '未接单'"
            >接单</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="orderDetail(scope.$index, scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <order-detail v-if="$store.state.isEdit" :row="row"></order-detail>
  </div>
</template>

<script>
import formattedDate from '@/utils/formattedDate'
import orderDetail from '@/components/orders/orderDetail'

export default {
  components: {
    orderDetail
  },
  data () {
    return {
      isReceive: false,
      tableData: [
        {
          orderId: 0,
          userName: '',
          phoneNumber: '',
          totalAmount: '0',
          orderTime: '',
          Tag: ''
        }
      ],
      row: {}
    }
  },
  methods: {
    filterTag (value, row) {
      return row.Tag === value
    },
    orderAccess (index, row) {
      console.log(row.orderId)
      this.$http(`/orderAccess?orderId=${row.orderId}`).then(res => {
        if (res.data.status === 0) {
          this.$message.success('接单成功')
          this.getOrders()
        } else {
          this.$message.error('接单失败')
        }
      })
    },
    orderDetail (index, row) {
      console.log(row)
      this.row = row
      this.$store.commit('isEdit')
    },
    getOrders () {
      this.$http('/orders').then((res) => {
        console.log(res.data)
        res.data.messages.forEach(item => {
          item.orderTime = formattedDate(item.orderTime)
          item.createTime = formattedDate(item.createTime)
        })
        this.tableData = res.data.messages
      })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
.orders {
  .el-table {
    margin-top: 0;
  }
}
</style>
