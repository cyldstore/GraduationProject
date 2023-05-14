<template>
  <div id="foods">
    <div class="page">
      <el-button type="primary" round @click="handleAdd">添加菜品</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="id" show-overflow-tooltip resizable width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.dishId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" show-overflow-tooltip resizable width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" resizable width="100">
        <template slot-scope="scope">
          <span><img :src="scope.row.imageUrl[0]" alt="" /></span>
        </template>
      </el-table-column>
      <el-table-column label="类别" show-overflow-tooltip resizable width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" show-overflow-tooltip resizable>
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" show-overflow-tooltip resizable width="75" sortable prop="averageRating">
        <template slot-scope="scope">
          <span>{{ scope.row.averageRating }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" show-overflow-tooltip resizable width="75" sortable prop="price">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
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
    <foods-edit
      buttonName="修改"
      :row="row"
      v-if="$store.state.isEdit"
    ></foods-edit>
    <foods-edit buttonName="添加" v-if="$store.state.isAdd"></foods-edit>
  </div>
</template>

<script>
import foodsEdit from '@/components/foods/foodsEdit'
// import http from '@/utils/http'
export default {
  components: {
    foodsEdit
  },
  data () {
    return {
      tableData: [
        {
          dishId: 0, // 菜品id
          name: '', // 菜品名字
          description: '', // 菜品描述
          category: '', // 菜品类别
          imageUrl: [], // 菜品图片
          price: Number(), // 菜品价格
          averageRating: Number() // 菜品评分
        }
      ],
      row: {}
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.row = row
      this.$store.commit('isEdit')
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$http
        .delete('/foodsDelete', {
          params: {
            dishId: row.dishId
          }
        })
        .then((res) => {
          if (res.data.status === -1) {
            this.$message.error('删除失败')
          }
          if (res.data.status === 0) {
            this.$message.success('删除成功')
            location.reload()
          }
        })
    },
    handleAdd () {
      this.$store.commit('isAdd')
    }
  },
  mounted () {
    this.$http('/foods').then((res) => {
      // console.log(res.data.messages)
      this.tableData = res.data.messages
    })
  }
}
</script>

<style lang="scss">
.page {
  position: fixed;
  top: 65px;
  left: 220px;
  z-index: 100;
}
.el-table {
  margin-top: 30px;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
