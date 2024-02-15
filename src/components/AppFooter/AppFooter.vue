<template>
  <footer>
    <div class="developer-info">
      <div style="display: flex">
        <h2 style="width: 50%; text-align: center">Developer</h2>
        <h3 style="width: 50%; text-align: center">Yang Xiang Yu</h3>
        <b-link class="linkIcon" href="https://github.com/justin880929">
          <b-icon icon="github" font-scale="1.5"></b-icon>
        </b-link>
        <b-link class="linkIcon">
          <b-icon icon="facebook" font-scale="1.5"></b-icon>
        </b-link>
        <b-link class="linkIcon">
          <b-icon icon="instagram" font-scale="1.5"></b-icon>
        </b-link>
      </div>
      <p class="mb-0 mt-2">本網站僅供個人作品使用，不提供商業用途</p>
      <small style="text-align: center">RWM © 2024 copyright</small>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 150px;
  background: url("../../assets/rock2.jpg") center/cover;
  margin-top: 20px;
  position: relative;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.developer-info {
  width: 50%;
  position: absolute;
  top: 80%;
  right: 10%;
  transform: translateY(-90%);
  display: block;
  text-align: center;
}
h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #000000;
  border-right: 2px solid goldenrod;
}
h3 {
  font-size: 1.5rem;
  margin: 0;
  color: #000000;
}
.linkIcon {
  color: black;
  padding-right: 10px;
}
@media(max-width: 780px){
  footer{
  font-size: 10px;
  }
  h2{
    font-size: 1rem;
  }
  h3{
    font-size: 12.8px;
    text-align: center;
    line-height: 1.5;
  }
}
@media(max-width: 500px){
  footer{
  font-size: 10px;
  }
  h2{
    font-size: 15px;
  }
  h3{
    font-size: 10px;
    text-align: center;
    line-height: 1.5;
  }
}
</style>
