<template>
  <div class="wrapper">
    <SignOffer></SignOffer>
    <Navbar></Navbar>

    <RouterView v-slot="{ Component }" name="Banner">
      <transition>
        <component id="content" :is="Component" />
      </transition>
    </RouterView>
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer :loader="isContentLoaded" class="footer"></Footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import SignOffer from './components/SignOffer.vue';
import Footer from './components/footer/Block.vue';

import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isContentLoaded = ref(false);

onMounted(() => {
  checkContentLoaded();
});

const checkContentLoaded = () => {
  nextTick(() => {
    const content = document.querySelector("#content");
    
    if (content && content.clientHeight > 0 && content.innerHTML.trim() !== "") {
      isContentLoaded.value = true;
    } else {
      setTimeout(checkContentLoaded, 100); 
    }
  });
};

</script>

<style lang="scss" scoped>
.container {
  padding: 0 2rem;
  margin-bottom: 20rem;

  @media (max-width: 1124px) {
    padding: 0 2rem;
  }

  @media (max-width: 490px) {
    padding: 0 1.6rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 18rem;
  }

  @media (max-width: 490px) {
    // margin-bottom: 15rem;
  }
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>