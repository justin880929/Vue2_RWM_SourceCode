<template>
  <div>
    <b-form @submit.prevent="checkPwd" class="mt-3" v-show="!isCheck">
      <b-form-group id="input1" >
        <label for="OldPwd" :class="{ error: error.oldError }">Old Password:</label>
        <b-form-input
          id="OldPwd"
          type="password"
          v-model="Pwd.oldPwd"
          placeholder="輸入舊密碼"
          required
        >
        </b-form-input>
        <transition name="btn">
          <button type="submit" class="btn" :disabled="isLoading">
            <i class="bx bx-loader-circle" :class="{ active: isLoading }"></i>
            <span class="btn-text" :class="{ active: isLoading }"> Check </span>
          </button>
        </transition>
      </b-form-group>
    </b-form>
    <b-form @submit.prevent="savePwd" class="mt-3" v-show="isCheck">
      <b-form-group id="input2" >
        <label for="yourPwd" >Your Password:</label>
        <b-form-input
          id="yourPwd"
          type="text"
          v-model="userPwd"
          disabled
        >
        </b-form-input>
        <label for="NewPwd" >New Password:</label>
        <b-form-input
          id="NewPwd"
          type="password"
          v-model="Pwd.newPwd"
          placeholder="輸入新密碼"
          required
        >
        </b-form-input>
        <label for="checkNewPwd" :class="{ error: error.checkError }">Check New Password:</label>
        <b-form-input
          id="checkNewPwd"
          type="password"
          v-model="Pwd.checkNewPwd"
          placeholder="再次確認新密碼"
          required
        >
        </b-form-input>
        <transition name="btn">
          <button type="submit" class="btn" :disabled="isLoading">
            <i class="bx bx-loader-circle" :class="{ active: isLoading }"></i>
            <span class="btn-text" :class="{ active: isLoading }"> Save Pwd </span>
          </button>
        </transition>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapGetters ,mapActions} from "vuex";
export default {
  name: "UserPassword",
  data() {
    return {
      Pwd: {
        oldPwd: "",
        newPwd: "",
        checkNewPwd: "",
      },
      error: {
        oldError:false,
        checkError:false
      },
      isLoading: false,
      isCheck: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    userPwd() {
      return this.getUser.Pwd;
    },
  },
  methods: {
    ...mapActions(["saveNewPwd"]),
    checkPwd() {
      console.log("checkPwd");
      this.isLoading = true;
      this.error.oldError = false;
      if (this.Pwd.oldPwd !== this.userPwd) {
        setTimeout(() => {
          this.isLoading = false;
          this.error.oldError = true;
        }, 1000);
      } else {
        setTimeout(() => {
          this.isLoading = false;
          this.isCheck = true;
        }, 1000);
      }
    },
    savePwd(){
      console.log("save");
      this.isLoading = true;
      this.error.checkError = false;
      this.error.newError = false;
      if(this.Pwd.newPwd !==this.Pwd.checkNewPwd){
        setTimeout(() => {
          this.isLoading = false;
          this.error.checkError = true;
        }, 1000);
      }else{
        setTimeout(() => {
          this.isLoading = false;
          this.saveNewPwd(this.Pwd.newPwd);
          this.$router.replace("/user");
        }, 1000);
      }
    }
  },
  
};
</script>

<style scoped>
.form-group{
  color: rgba(205, 133, 63, 0.5);
}
.form-control{
  margin-bottom: 1rem;
}
.form-group#input1 {
  display: flex;
  justify-content: center;
}
.form-group label.error {
  color: red;
}
.btn {
  margin-top: 10px;
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
.btn-enter,
.btn-leave-to {
  transform: scaleX(0);
}
.btn-enter-to,
.btn-leave {
  transform: scaleX(1);
}
.btn-enter-active,
.btn-leave-active {
  transition: all 0.5s ease-in;
}
.btn:hover {
  background: rgba(205, 133, 63, 0.9);
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
</style>