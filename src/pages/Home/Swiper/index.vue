<template>
  <b-container>
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      fade
      label-indicators="Select a slide to display"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      label-next=""
      label-prev=""
    >
      <b-carousel-slide img-src="./images/Carsoul_1.jpg" class="carousel-image">
      </b-carousel-slide>
      <b-carousel-slide img-src="./images/Carsoul_2.jpg" class="carousel-image">
      </b-carousel-slide>
      <b-carousel-slide img-src="./images/Carsoul_3.jpg" class="carousel-image">
      </b-carousel-slide>
    </b-carousel>
  </b-container>
</template>

<script>
export default {
  name: "ProductsSwiper",
};
</script>

<style>
.carousel-image{
  max-height:520px !important;
  max-width:100% !important;
  object-fit: cover !important;
  object-position: center center;
}
.container {
  max-width: 100% !important;
  max-height: 100% !important;
  margin: 0 !important;
  margin-bottom: 10px !important;

}
.carousel-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  padding-left: 0;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
}
.carousel-indicators li {
  box-sizing: content-box;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  width: 30px;
  height: 3px;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}
</style>