<template>
  <footer v-if="loader" class="footer">
    <div class="">
      <Subscribe></Subscribe>
      <div class="footer-content">
        <div class="footer-content-info">
          <router-link to="/" class="footer-logo">SHOP.CO</router-link>
          <p class="footer-content-desc">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
        </div>
      </div>
      <div class="footer-info">
        <p class="footer-info-title">
          Shop.co © 2025, All rights reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Subscribe from "./Subscribe.vue";
import {defineProps} from 'vue';

defineProps({
  loader: Boolean
})
</script>

<style scoped lang="scss">
// Define breakpoints
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;

// Media Queries
@media (max-width: $breakpoint-tablet) {
  .footer {
    &-content {
      flex-wrap: wrap;
      gap: 2rem;
    }
    
    &-info {
      width: 100%;
      gap: 3rem;
    }

  }
}

@media (max-width: 480px) {
  .footer {
    min-height: 20rem;
    padding: 3.5rem 0;
    
    &-content{
      &-info {
        flex-direction: column;
        gap: 1.4rem;
        align-items: start !important;
      }
    }

    &-info-title {
      font-size: 1.3rem;
    }
  }
}

.footer {
  padding: 5rem 2rem 0 2rem;
  background: #f0f0f0;
  font-family: "SatoshiRegular" !important;

  &-content {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
    &-info {
      display: flex;
      // aspect-ratio: 8/1  ;
      flex: 1;
      min-height: 1rem;
      max-width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    &-desc {
      font-size: 1.4rem;
      line-height: 150%;
      min-height: 1rem;
      max-width: 25rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &-logo {
    font-family: "IntegralCF";
    font-size: 3.2rem;
    font-weight: 700;
    color: black;
  }

  &-info {
    padding: 2.5rem 0;

    &-title {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 100%;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
