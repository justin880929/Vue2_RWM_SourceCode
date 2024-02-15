<template>
  <b-container class="lgpg" :class="{ containerBg: OpLgPg }">
    <div class="wrapper" :class="{ 'active-popup': OpLgPg, active: isChange.active,back:isChange.back}">
      <span class="icon-close" @click="showWrapper(false)"
        ><i class="bx bx-x"></i
      ></span>
      <div class="form-box login">
        <h2>Login</h2>
        <form @submit.prevent="checkEP('login')">
          <div class="input-box">
            <span class="icon">
              <i
                class="bx bxs-envelope"
                :class="{ error: isError.Login.emailIcon }"
              ></i>
            </span>
            <input type="email" v-model="User.Login.Email" required />
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <i
                class="bx"
                :class="{
                  'bxs-lock': !ShowPassword.isSLP,
                  'bxs-lock-open': ShowPassword.isSLP,
                  'bx-tada': isTada,
                  error: isError.Login.passwordIcon,
                }"
                @click="showPassword('isSLP')"
              ></i>
            </span>
            <input
              :type="ShowPassword.isSLP ? 'text' : 'password'"
              v-model="User.Login.Pwd"
              required
            />
            <label>Password</label>
          </div>
          <div class="remember-forget">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" class="btn" :disabled="Loading.isLgLoading">
            <i
              class="bx bx-loader-circle"
              :class="{ active: Loading.isLgLoading }"
            ></i>
            <span class="btn-text" :class="{ active: Loading.isLgLoading }"
              >Login</span
            >
          </button>
          <div class="login-register">
            <p>
              Don't have an account?
              <a class="register-link" @click="change('register')"> Register </a>
            </p>
            <p>
              Log in Backstage?
              <a class="register-link" @click="change('back')"> Backstage </a>
            </p>
          </div>
        </form>
      </div>
      <div class="form-box register">
        <h2>Registration</h2>
        <form @submit.prevent="checkEP('register')">
          <div class="input-box">
            <span class="icon"><i class="bx bxs-user"></i></span>
            <input type="text" v-model="User.Register.Name" required />
            <label>Username</label>
          </div>
          <div class="input-box">
            <span class="icon"
              ><i
                class="bx bxs-envelope"
                :class="{ error: isError.Register.emailIcon }"
              ></i
            ></span>
            <input type="email" v-model="User.Register.Email" required />
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <i
                class="bx"
                :class="{
                  'bxs-lock': !ShowPassword.isSRP,
                  'bxs-lock-open': ShowPassword.isSRP,
                  'bx-tada': isTada,
                  error: isError.Register.passwordIcon,
                }"
                @click="showPassword('isSRP')"
              ></i
            ></span>
            <input
              :type="ShowPassword.isSRP ? 'text' : 'password'"
              v-model="User.Register.Pwd"
              required
            />
            <label>Password</label>
          </div>
          <div class="remember-forget">
            <label
              ><input type="checkbox" />agree to the terms & conditions
            </label>
          </div>
          <button type="submit" class="btn" :disabled="Loading.isRgLoading">
            <i
              class="bx bx-loader-circle"
              :class="{ active: Loading.isRgLoading }"
            ></i>
            <span class="btn-text" :class="{ active: Loading.isRgLoading }"
              >Register</span
            >
          </button>
          <div class="login-register">
            <p>
              Already have an account?
              <a class="login-link" @click="change('login')"> Login </a>
            </p>
          </div>
        </form>
      </div>
      <div class="form-box backstage">
        <h2>Backstage</h2>
        <form @submit.prevent="checkEP('backstage')">
          <div class="input-box">
            <span class="icon">
              <i
                class="bx bxs-envelope"
                :class="{ error: isError.Backstage.accountIcon }"
              ></i>
            </span>
            <input type="text" v-model="Backstage.account" required />
            <label>Account</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <i
                class="bx"
                :class="{
                  'bxs-lock': !ShowPassword.isSBP,
                  'bxs-lock-open': ShowPassword.isSBP,
                  'bx-tada': isTada,
                  error: isError.Backstage.passwordIcon,
                }"
                @click="showPassword('isSBP')"
              ></i>
            </span>
            <input
              :type="ShowPassword.isSBP ? 'text' : 'password'"
              v-model="Backstage.Pwd"
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" class="btn" :disabled="Loading.isLgLoading">
            <i
              class="bx bx-loader-circle"
              :class="{ active: Loading.isLgLoading }"
            ></i>
            <span class="btn-text" :class="{ active: Loading.isLgLoading }"
              >Login</span
            >
          </button>
          <div class="login-register">
            <p>
              Don't have a Backstage account?
              <a class="register-link" @click="change('gologin')"> UserLogin </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      Backstage:{
        account:"",
        Pwd:""
      },
      User: {
        Login: {
          Email: "",
          Pwd: "",
        },
        Register: {
          Email: "",
          Pwd: "",
          Name: "",
        },
      },
      Loading: {
        //isLgLoading=isLoginLoading,isRgLoading=isRegisterLoading
        isLgLoading: false,
        isRgLoading: false,
      },
      isChange: {
        active:false,
        back:false
      },
      isTada: false,
      isError: {
        Login: {
          emailIcon: false,
          passwordIcon: false,
        },
        Register: {
          emailIcon: false,
          passwordIcon: false,
        },
        Backstage:{
          accountIcon:false,
          passwordIcon:false,
        }
      },
      ShowPassword: {
        // isSLP=>isShowLoginPassword,isSRP=>isShowRegistrationPassword
        isSLP: false,
        isSRP: false,
        isSBP:false
      },
    };
  },
  computed: {
    ...mapState(["isLogin", "OpLgPg"]),
  },
  methods: {
    ...mapActions(["checkIdPw", "registerUser","checkBackstage"]),
    ...mapMutations(["SHOWLGPG"]),
    //checkEP=checkEmail&Password
    checkEP(string) {
      if (string === "login") {
        if (this.User.Login.Email === "" || this.User.Login.Password === "") {
          console.log("Email 或 Password 不能為空");
        } else if (!this.isValidEmail(this.User.Login.Email)) {
          this.Loading.isLgLoading = true;
          setTimeout(() => {
            this.Loading.isLgLoading = false;
            this.isError.Login.emailIcon = true;
          }, 1000);
          console.log("Email 格式不正確");
        } else {
          this.checkIdPw(this.User.Login).then((result) => {
            this.Loading.isLgLoading = true;
            if (result === "emailError") {
              setTimeout(() => {
                this.Loading.isLgLoading = false;
                this.isError.Login.emailIcon = true;
                this.isError.Login.passwordIcon = false;
              }, 1000);
              console.log("Email不正確");
            } else if (result === "pwdError") {
              setTimeout(() => {
                this.Loading.isLgLoading = false;
                this.isError.Login.passwordIcon = true;
                this.isError.Login.emailIcon = false;
              }, 1000);
              console.log("密碼不正確");
            } else {
              setTimeout(() => {
                this.Loading.isLgLoading = false;
                console.log("access");
              }, 1000);
            }
          });
        }
      } else if(string==="register") {
        if (
          this.User.Register.Email === "" ||
          this.User.Register.Password === "" ||
          this.User.Register.Name === ""
        ) {
          console.log("Email 或 Password 或 Name 不能為空");
        } else if (!this.isValidEmail(this.User.Register.Email)) {
          this.Loading.isRgLoading = true;
          setTimeout(() => {
            this.Loading.isRgLoading = false;
            this.isError.Register.emailIcon = true;
          }, 1000);
          console.log("Email 格式不正確");
        } else {
          this.Loading.isRgLoading = true;
          this.registerUser(this.User.Register);
          console.log(this.User.Register);
          setTimeout(() => {
            this.Loading.isRgLoading = false;
            setTimeout(() => {
              this.isChange = false;
            }, 500);
          }, 3000);
        }
      }else {
        this.Loading.isLgLoading = true;
        this.isError.Backstage.accountIcon = false;
        this.isError.Backstage.passwordIcon = false;
        this.checkBackstage(this.Backstage).then(result=>{
          if(result[0]=='error'){
            const errorArray=result[1];
            setTimeout(() => {
              this.Loading.isLgLoading = false;
              errorArray.forEach(element => {
                this.isError.Backstage[element]=true;
              });
            }, 1000);
            return
          }else{
            setTimeout(() => {
              this.Loading.isLgLoading = false;
              this.$router.push("/backstage")
            }, 1000);
          }
        });
      }
    },
    isValidEmail(email) {
      // 驗證email格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    showWrapper(Boolean) {
      this.SHOWLGPG(Boolean);
    },
    change(String) {
      if(String=='back'){
        this.isChange.back = !this.isChange.back;
      }else if(String=='gologin'){
        this.isChange.back = !this.isChange.back;
        this.isChange.active = false;
      }else{
        this.isChange.active = !this.isChange.active;
      }
    },
    showPassword(key) {
      this.ShowPassword[key] = !this.ShowPassword[key];
    },
    animateWithTada() {
      setInterval(() => {
        // 添加 bx-tada
        this.isTada = true;
        // 3秒後移除 bx-tada
        setTimeout(() => {
          this.isTada = false;
        }, 3000);
      }, 9000); // 每9秒執行一次動畫
    },
  },
  mounted() {
    this.animateWithTada();
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  z-index: -1;
  transition: z-index 0.5s ease;
}

.containerBg {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 100;
}
.wrapper {
  position: relative;
  width: 400px;
  height: 440px;
  background: #fff;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: scale(0);
  transition: transform 0.5s ease, height 0.2s ease;
}
.wrapper.active-popup {
  transform: scale(1);
}
.wrapper.active {
  height: 520px;
}
.wrapper .form-box {
  width: 100%;
  padding: 40px;
}
.wrapper .form-box.login {
  transition: transform 0.18s ease;
  transform: translateX(0);
}
.wrapper.active .form-box.login {
  transition: none;
  transform: translateX(-400px);
}
.wrapper.back .form-box.login {
  transition: none;
  transform: translateX(-400px);
}
.wrapper .form-box.register {
  position: absolute;
  transition: none;
  transform: translateX(400px);
}
.wrapper.active .form-box.register {
  transition: transform 0.18s ease;
  transform: translateX(0);
}
.wrapper.back .form-box.register {
  transition: none;
  transform: translateX(-400px);
}
.wrapper .form-box.backstage {
  position: absolute;
  transition: none;
  transform: translateX(500px);
}
.wrapper.back .form-box.backstage {
  transition: transform 0.18s ease;
  transform: translateX(0);
}
.wrapper .icon-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  background: rgba(205, 133, 63, 0.5);
  font-size: 2em;
  color: #fff;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px;
  z-index: 1;
}
.wrapper .icon-close:hover {
  background: rgba(205, 133, 63, 0.9);
}
.form-box h2 {
  font-size: 2em;
  color: rgba(205, 133, 63, 0.5);
  text-align: center;
}
.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid rgba(205, 133, 63, 0.5);
  margin: 30px 0;
}
.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: rgba(205, 133, 63, 0.5);
  font-weight: 500;
  pointer-events: none;
  transition: 0.5s;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -5px;
}
.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: #000;
  font-weight: 600;
  padding: 0 35px 0 5px;
}
.input-box .icon {
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  color: #000;
  line-height: 57px;
}
.input-box .icon .bxs-lock:hover,
.input-box .icon .bxs-lock-open:hover {
  cursor: pointer;
  color: rgba(205, 133, 63, 0.5);
}
.input-box .icon .bxs-envelope.error,
.input-box .icon .bxs-lock.error,
.input-box .icon .bxs-lock-open.error {
  color: red;
}
.remember-forget {
  font-size: 0.9em;
  color: #000;
  font-weight: 500;
  margin: -15px 0 15px;
  display: flex;
  justify-content: space-between;
}
.remember-forget label {
  display: flex;
  align-items: center;
}
.remember-forget label input {
  accent-color: #000;
  margin-right: 3px;
}
.remember-forget a {
  color: #000;
  text-decoration: none;
}
.remember-forget a:hover {
  text-decoration: underline;
}
.btn {
  width: 100%;
  height: 45px;
  background: rgba(205, 133, 63, 0.5);
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}
.btn:disabled {
  background: rgba(205, 133, 63, 0.5);
  color: #fff;
}
.btn i {
  font-size: 1.5em;
}
.btn-text {
  position: absolute;
  transform: scale(1);
  transition: all 0.5s ease;
}
.btn-text.active {
  transform: scale(0);
}
.bx-loader-circle {
  position: absolute;
  transform: scale(0);
  transition: transform 0.5s ease;
}
.bx-loader-circle.active {
  transform: scale(1);
  transition: transform 0.5s ease;
  animation: animte 1s ease infinite;
  animation-delay: 0.5s;
}
.bx-loader-circle.active::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes animte {
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
}
.btn:hover {
  background: rgba(205, 133, 63, 0.9);
  color: #fff;
}
.login-register {
  font-size: 0.9em;
  color: #000;
  text-align: center;
  font-weight: 500;
  margin: 25px 0 10px;
}
.login-register p a {
  color: #000;
  text-decoration: none;
  font-weight: 600;
}
.login-register p a:hover {
  text-decoration: underline;
  cursor: pointer;
}
  @media(min-width: 500px){
    .lgpg{
      width: 88%;
    }
  }
@media(min-width: 700px){
  .lgpg{
    width: 100%;
  }
}
</style>