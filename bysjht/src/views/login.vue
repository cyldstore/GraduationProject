<template>
  <div id="contain">
    <div class="login">
      <div class="text">登陆</div>
      <div class="input">
        <label for="username">
          <span>用户名：</span>
          <input
            type="text"
            placeholder="用户名/手机号"
            id="username"
            v-model="username"
          />
        </label>
        <label for="password">
          <span>密码：</span>
          <input
            type="password"
            placeholder="密码"
            id="password"
            v-model="password"
          />
        </label>
      </div>
      <div class="button">
        <button @click="login">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
// import http from '@/utils/http'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // this.$router.push('/')
      // console.log(this.username, this.password)
      if (!this.username) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      this.$http
        .post(
          '/login',
          {
            userName: this.username,
            password: this.password
          })
        .then((res) => {
          console.log(res.data)
          if (res.data.status === 0) {
            this.$router.push('/foods')
          }
          if (res.data.status === 1) {
            this.$message.error(res.data.messages)
          }
        })
    }
  },
  mounted () {
    this.$store.commit('isShow')
    // console.log(this.$store.state.isShow)
  },
  destroyed () {
    this.$store.commit('isShow')
  }
}
</script>

<style lang="scss" scoped>
#contain {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-image: url("/public/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .login {
    box-sizing: border-box;
    width: 300px;
    height: 150px;
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 5px 5px 5px #ccc;
    padding: 10px;
    .text {
      font-size: 20px;
      font-weight: 700;
      border-bottom: 1px solid #ccc;
    }
    .input {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
      label {
        span {
          display: inline-block;
          font-size: 13px;
          width: 50px;
          white-space: nowrap;
        }
        input {
          padding: 0 10px;
          font-size: 13px;
          border: 0;
          border-bottom: 1px solid #000;
          background-color: #fff;
        }
      }
    }
    .button {
      display: flex;
      margin-top: 10px;
      button {
        width: 150px;
        height: 30px;
        margin: 0 auto;
        border-radius: 50px;
        margin: auto auto;
        border: 0;
        background-color: skyblue;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
      button:hover {
        transform: scale(1.2);
        background: blue;
        color: #fff;
      }
      button:active {
        transform: scale(0.8);
      }
    }
  }
}
</style>
