<template>
  <div id="app">
    <el-container v-if="$store.state.isShow">
      <el-aside style="width: 15%;overflow: auto;">
        <el-menu
          style="background-color: transparent"
          active-text-color="#000"
          @select="handleSelect"
          default-active="0"
        >
          <el-menu-item>信息管理</el-menu-item>
          <router-link
            :to="item.path"
            v-for="(item, index) in titleArray"
            :key="index"
          >
            <el-menu-item
              :index="index.toString()"
              :class="{ active: isActive == index }"
              :disabled="isDisabled"
            >
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </router-link>
          <el-menu-item @click="handleExit">退出登陆</el-menu-item>
        </el-menu>
        <div class="exit" v-if="isExit">
          <div class="text">是否退出登陆</div>
          <div class="button">
            <button @click="handleCancel">取消</button>
            <button @click="handleCertain">确定</button>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header>{{ title }}</el-header>
        <el-main ref="elMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-if="!$store.state.isShow"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '菜品管理', // el-header标题
      titleArray: [
        {
          name: '菜品管理',
          path: '/foods'
        },
        {
          name: '轮播图管理',
          path: '/swiper'
        },
        {
          name: '优惠券管理',
          path: '/coupon'
        },
        {
          name: '订单管理',
          path: '/orders'
        },
        {
          name: '用户管理',
          path: '/users'
        },
        {
          name: '评论管理',
          path: '/comments'
        }
      ],
      isExit: false, // 是否显示退出登陆框
      isActive: 0, // 根据索引动态添加class
      isDisabled: false // 是否禁用
    }
  },
  methods: {
    // 根据索引值index更新title
    handleSelect (index) {
      // console.log(this.titleArray[index])
      if (index) {
        this.title = this.titleArray[index].name
        this.isActive = index
        // console.log(this.isActive)
      }
    },

    // 对退出登陆信息框的显示与否进行操作
    handleExit () {
      this.isExit = true
      this.isDisabled = true
    },
    handleCancel () {
      this.isExit = false
      this.isDisabled = false
    },
    handleCertain () {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.isExit = false
      this.isActive = 0
      this.isDisabled = false
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-aside {
  // width: 100px;
  height: 100vh;
  background-color: #09517e;
}

.el-header {
  line-height: 60px;
  text-align: center;
  background-color: #17a2b8;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;
}

.el-main{
  height: calc(100vh - 60px);
  // overflow: hidden;
}

.el-menu {
  height: 100%;
  .el-menu-item {
    box-sizing: border-box;
    height: 60px;
    color: #fff;
    border-bottom: 1px solid #17a2b8;
    font-size: 16px;
  }
  .active {
    background: #fff;
    // color: #000;
  }
}

.el-menu > .el-menu-item:first-child {
  background-color: #17a2b8;
}

a {
  text-decoration: none;
}

.exit {
  width: 150px;
  height: 100px;
  background: #17a2b8;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .text {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .button {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      width: 50px;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.2s ease-out;
    }
    button:hover {
      transform: scale(1.2);
      background: skyblue;
      color: #fff;
    }
    button:active {
      transform: scale(0.8);
    }
  }
}
</style>
