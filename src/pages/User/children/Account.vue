<template>
  <b-form @submit.prevent="save" class="mt-3">
    <div class="div-switch">
      <label class="switch">
        <input type="checkbox" v-model="setChecked" />
        <span class="slider round"></span>
      </label>
      <span class="me-2">Setting</span>
    </div>
    <b-form-group id="input-group-1" label="Your Name:" label-for="name">
      <b-form-input
        id="name"
        type="text"
        v-model="User.Save.Name"
        :placeholder="getUser.Name"
        :disabled="!setChecked"
      >
      </b-form-input>
    </b-form-group>
    <b-form-group id="input-group-2" >
      <label for="email" :class="{ 'error-label': emailError }"
        >Email address:</label
      >
      <b-form-input
        id="email"
        type="email"
        v-model="User.Save.Email"
        :placeholder="getUser.Email"
        :disabled="!setChecked"
      >
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Mobile barcode:"
      label-for="mobile-barcode"
    >
      <b-form-input
        id="mobile-barcode"
        type="text"
        v-model="User.Save.MobileBarcode"
        :placeholder="getUser.MobileBarcode || '填寫手機載具:/EX6AMPLE'"
        :disabled="!setChecked"
        formnovalidate
      >
      </b-form-input>
    </b-form-group>
    <b-form-group id="input-group-4" label="Gender:">
      <b-form-radio-group
        id="radio-group-4"
        :options="options"
        v-model="User.Save.Gender"
        :disabled="!setChecked"
        name="gender-radio"
        class="gender-radio"
      ></b-form-radio-group>
    </b-form-group>
    <transition name="btn">
      <button
        type="submit"
        class="btn"
        v-show="setChecked"
        :disabled="isLoading"
      >
        <i class="bx bx-loader-circle" :class="{ active: isLoading }"></i>
        <span class="btn-text" :class="{ active: isLoading }"> Save </span>
      </button>
    </transition>
  </b-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserAccount",
  data() {
    return {
      emailError: false,
      isLoading: false,
      setChecked: false,
      User: {
        Save: {
          Name: "",
          Email: "",
          MobileBarcode:"",
          Gender: "",
        },
      },
      options: [
        { text: "Man", value: "Man" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["saveUser"]),
    save() {
      this.isLoading = true;
      const data = this.User.Save;
      let commitData = {};
      commitData = this.organizeData(data);
      if (commitData === "error") {
        setTimeout(() => {
          this.isLoading = false;
          this.emailError = true;
        }, 1000);
        console.log("Email error");
      }else if(Object.keys(commitData).length === 0){
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        console.log("沒有儲存任何資料");
      }else {
        this.saveUser(commitData);
        setTimeout(() => {
          this.isLoading = false;
          this.emailError = false;
        }, 1000);
        console.log(commitData);
      }
    },
    isValidEmail(email) {
      // 驗證email格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    organizeData(data) {
      const organizeData = {};
      for (const key in data) {
        if (data[key] !== "") {
          organizeData[key] = data[key];
        }
      }
      if (organizeData.Email && !this.isValidEmail(organizeData.Email)) {
        return "error";
      } else {
        return organizeData;
      }
    },
  },
  
};
</script>

<style scoped>


.error-label {
  color: red;
}
.gender-radio {
  display: inline-flex;
  gap: 1rem;
}
.form-group {
  margin-bottom: 1rem;
  color: rgba(205, 133, 63, 0.5);
}
input{
  transition: all 0.5s ease;
}
input:disabled {
  background-color: rgba(205, 133, 63, 0.1);
}
.div-switch {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.div-switch span{
  color: rgba(205, 133, 63, 0.5);
}
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 1.5px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(205, 133, 63, 0.9);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(14px);
  -ms-transform: translateX(14px);
  transform: translateX(14px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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