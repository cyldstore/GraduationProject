<template>
  <div class="orderDetail">
    <div class="cancel" @click="cancel">
        X
    </div>
    <div class="detail">
      <div class="state">
        {{row.Tag}}
      </div>
      <div class="state-info">
        <div class="state-time">
          <span>预约时间</span>
          <div class="time">
            {{ row.orderTime }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="shop">
      <div class="shop-item" v-for="item in row.dishes" :key="item.dishId">
        <div class="img">
          <img :src="item.imageUrl" alt="">
        </div>
        <div class="shop-info">
          <div class="name">
            {{ item.dishName }}
          </div>
          <div class="price">
            ￥<span>{{ item.price }}</span>
          </div>
        </div>
        <div class="number">
          <div>x{{ item.quantity }}</div>
        </div>
      </div>
      <div class="total">
        <div>
          总计：
          <span>￥</span>
          <span>{{ row.totalAmount }}</span>
        </div>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="user">
      <div class="address">
        <span>地址</span>
        <span>{{
          row.address
        }}</span>
      </div>
      <div class="name">
        <span>姓名</span>
        <span>{{ row.userName }}</span>
      </div>
      <div class="phone">
        <span>联系电话</span>
        <span>{{ row.phoneNumber }}</span>
      </div>
      <div class="order-time">
        <span>下单时间</span>
        <span>{{ row.orderTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => ({
        orderId: 0,
        userName: '',
        phoneNumber: '',
        totalAmount: '0',
        orderTime: '',
        Tag: '',
        address: '',
        createTime: '',
        dishes: []
      })
    }
  },
  methods: {
    cancel () {
      this.$store.commit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.orderDetail {
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

  .cancel{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    background: #fff;
    line-height: 20px;
    text-align: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .cancel:hover{
    transform: scale(1.5);
  }

  .cancel:active{
    transform: scale(0.8);
  }

  .detail {
    .state {
      width: 95%;
      height: 30px;
      margin: 0 auto;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }

    .state-info {
      width: 95%;
      margin: 0 auto;
      .state-time {
        margin-left: 10px;
        border-bottom: 1px dashed #000;
        span {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 2px;
        }
        .time {
          font-size: 15px;
          color: blue;
        }
      }
    }
  }

  .shop {
    width: 95%;
    margin: 0 auto;
    height:70%;
    overflow: auto;
    .shop-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 120px;

      .img{
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin: 10px;
      border-radius: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }

      .shop-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: 20px;
          color: red;
        }
        .price {
          color: #f3cf03;
          span {
            font-size: 20px;
          }
        }
      }
      .number {
        min-width: 2em;
        min-height: 2em;
        line-height: 2em;
        text-align: center;
        border-radius: 10px;
        background-color: #fff;
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
    .total {
      border-top: 1px dashed #000;
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      div {
        span:first-child {
          font-size: 14px;
        }
        span {
          font-size: 20px;
          color: red;
        }
      }
    }
  }

  .user {
    width: 95%;
    margin: 5px auto;
    div {
      margin: 5px;
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 16px;
        font-weight: 700;
        width: 4em;
        margin-right: 10px;
      }
      span:last-child {
        text-align: right;
      }
    }
  }
}
</style>
