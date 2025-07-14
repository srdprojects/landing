<template>
  <div class="card">
    <div class="card-img">
      <img v-lazy="{ src: image, loading: loadingPlaceholder }" alt="error" class="card-img" />
    </div>
    <p class="card-name" :title="title">{{ truncate(title) }} </p>

    <div class="card-prices">
      <p class="card-prices-price">{{ price }} so'm</p>
      <p class="card-prices-price prev">{{ (price * 1.2).toFixed(1) }} so'm</p>
      <span class="card-prices-percetage">-20%</span>
    </div>
  </div>
</template>

<script setup >
import { defineProps } from 'vue';
import loadingPlaceholder from '@/assets/img/Loading.gif'
defineProps({
  image: String,
  rating: Number,
  number: Number,
  title: String,
  price: Number,
  unknown: Object,
});

const truncate = (string) => {
  return string.substr(0, 40) + "..."
}


</script>

<style lang="scss" scoped>
.card {
  max-width: calc(100% / 4 - 1.5rem);
  width: 100%;
  font-family: 'SatoshiRegular';
  cursor: pointer;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    // max-width: 100%;
  }
  
  &-name {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 2rem;
    font-family: "SatoshiBold", "Roboto" !important;
    font-weight: 500;
    font-size: 2rem;
    margin: 1.6rem 0 0.8rem 0;

    @media(max-width: 490px) {
      font-size: 1.6rem;
    }
  }
  
  &-img {
    width: 100%;
    height: 30rem;
    overflow: hidden;
    border-radius: 2rem;
    justify-self: start;
    
    @media(max-width: 490px) {
      // height: 19.8rem;
    }
    
    & img {
      // width:max-content;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }


  &-ratingNum {
    font-size: 1.4rem;
    font-weight: 400;
    font-family: 'SatoshiRegular';
    line-height: 100%;
    margin-left: 0.5rem;

    & span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &-prices {
    width: max-content;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-family: 'SatoshiRegular';

    @media (max-width: 490px) {
      column-gap: 0.5rem;
      line-height: 1;
      align-items: end;
    }

    &-price {
      align-self: baseline;
      line-height: 1;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 120%;
      color: #000;

      &.prev {
        font-size: 1.4rem;
        color: rgba(0, 0, 0, 0.6);
        text-decoration: line-through;

        @media (max-width: 640px) {
          font-size: 1.4rem;
          color: #ff0000;
        }
      }

      @media (max-width: 490px) {
        font-size: 1.8rem;
      }
    }



    &-percetage {
      padding: 0.6rem 1.4rem;
      border-radius: 5rem;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 120%;
      color: #ff0000;
      background: rgba(255, 51, 51, 0.1);

      @media (max-width: 640px) {
        font-size: 1rem;
        padding: 0.2rem 0.4rem;
        display: none;
      }


    }
  }
}
</style>
