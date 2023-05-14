<template>
  <div class="couponEdit">
    <div class="condition">
      <label for="couponCondition">
        <span>条件</span>
        <input type="number" required id="couponCondition" min="0" v-model="couponData.couponCondition"/>
      </label>
    </div>
    <div class="price">
      <label for="couponPrice">
        <span>优惠</span>
        <input type="number" required id="couponPrice" min="0" v-model="couponData.value"/>
      </label>
    </div>
    <div class="number">
      <label for="couponNumber">
        <span>数量</span>
        <input type="number" required id="couponNumber" min="0" v-model="couponData.number"/>
      </label>
    </div>
    <div class="limit">
      <label for="couponLimit">
        <span>限领</span>
        <input type="number" required id="couponLimit" min="0" v-model="couponData.couponLimit"/>
      </label>
    </div>
    <div class="button">
      <el-button type="info" round @click="editCancel">取消</el-button>
      <el-button type="primary" round @click="handleClick">{{ buttonName }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: '提交'
    },
    coupon: {
      type: Object,
      default: () => ({
        couponId: '',
        couponCondition: '',
        value: '',
        number: '',
        couponLimit: ''
      })
    }
  },
  data () {
    return {
      couponData: {
        couponId: '',
        couponCondition: '',
        value: '',
        number: '',
        couponLimit: ''
      }
    }
  },
  methods: {
    editCancel () {
      this.$store.commit('cancel')
    },
    handleClick () {
      if (this.$props.buttonName === '修改') {
        console.log('修改')
        this.$http.post('/couponEdit', this.couponData).then(res => {
          if (res.data.status === 0) {
            this.$message.success(res.data.messages)
            location.reload()
          }
          if (res.data.status === -1) {
            this.$message.error('修改失败，请重新修改')
            console.log(res.data.messages)
          }
        })
      }
      if (this.$props.buttonName === '添加') {
        this.$http.post('/couponAdd', this.couponData).then(res => {
          if (res.data.status === 0) {
            this.$message.success(res.data.messages)
            location.reload()
          }
          if (res.data.status === -1) {
            this.$message.error('添加失败，请重新添加')
            console.log(res.data.messages)
          }
        })
      }
    }
  },
  created () {
    this.couponData = this.$props.coupon
  }
}
</script>

<style lang="scss" scoped>
.couponEdit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: rgb(204, 228, 237);
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  z-index: 100;
  .button {
    display: flex;
    justify-content: space-around;
    margin-bottom: 0;
  }
}
.couponEdit > div {
  margin-bottom: 10px;
  label {
    span {
      margin-right: 10px;
      letter-spacing: 1px;
    }
  }
}
</style>
