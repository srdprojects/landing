<template>
  <div v-if="showOffer" class="">
    <LoginModal :isVisible="isModalVisible" @close="isModalVisible = false" />
    <div ref="signOffer" class="signOffer">
      <div class="signOffer-wrapper">
        <p class="signOffer-desc">
          Sign up and get 20% off to your first order.
          <router-link @click="isModalVisible = true" to class="signOffer-link">Sign Up Now</router-link>
        </p>
        <button class="signOffer-noSignIn">
          <img @click="showOfferAgain" src="../assets/img/noSignIn.svg" alt="" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useTemplateRef, ref, onMounted, computed } from 'vue';

import LoginModal from './LogInPage.vue';

const isModalVisible = ref(false);
const showOffer = ref(JSON.parse(localStorage.getItem('offer')))



onMounted(() => {
  showOffer.value = JSON.parse(localStorage.getItem('offer'))
  let isFirstLoad = JSON.parse(localStorage.getItem('offer'));

  if (isFirstLoad === null) {
    localStorage.setItem('offer', JSON.stringify(true));
    showOffer.value = true; 
  } else {
    showOffer.value = isFirstLoad;
  }
})


const showOfferAgain = () => {
  localStorage.setItem('offer', JSON.stringify(false))
  showOffer.value = false
}

</script>

<style lang="scss" scoped>
.signOffer {
  color: #fff;
  background-color: #000;
  text-align: center;
  left: 0;
  top: 0;
  width: 100%;
  padding: 1rem 0;

  font-family: "SatoshiLight";
  font-weight: 400;
  font-size: 1.4rem;

  @media (max-width: 490px) {
    font-size: 1rem;
  }

  &-link {
    font-family: "SatoshiMedium";
    font-weight: 500;
    color: inherit;
    font-weight: 500;
    text-decoration: underline;
  }

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &-noSignIn {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    position: absolute;

    right: 0;
  }
}
</style>