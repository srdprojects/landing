<template>
  <Transition>
    <div class="header showIf">
      <div class="header-content">
        <img alt="Error" loading="lazy" v-if="loaded" fetchpriority="high" rel="preload" :src="source" type="image/webp"
          class="header-content-image" />
        <div class="content">
          <div class="content-wrapper">
            <div class="content-motive">
              <p class="content-slogan">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </p>
              <p class="content-desc">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button @click="router.push('/category#content')" class="content-btn">
                Shop Now
              </button>
            </div>

            <div ref="achievements" class="content-inNumbers">
              <div class="content-achievements">
                <p class="content-counts">200+</p>
                <span class="content-counts--desc">International Brands</span>
              </div>
              <div class="content-achievements">
                <p class="content-counts">2,000+</p>
                <span class="content-counts--desc">High-Quality Products</span>
              </div>
              <div class="content-achievements">
                <p class="content-counts">30,000+</p>
                <span class="content-counts--desc">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="companyList">
        <ul class="companyList-wrapper">
          <li class="companyList-firm">
            <img src="../assets/img/Versace.svg" alt="" />
          </li>
          <li class="companyList-firm">
            <img src="../assets/img/zara-logo-1 1.svg" alt="" />
          </li>
          <li class="companyList-firm">
            <img src="../assets/img/gucci-logo-1 1.svg" alt="" />
          </li>
          <li class="companyList-firm">
            <img src="../assets/img/prada-logo-1 1.svg" alt="" />
          </li>
          <li class="companyList-firm">
            <img src="../assets/img/CalvinKlein.svg" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { ref } from "vue";

const loaded = ref(false);
// import BannerImage from '@/assets/img/CouplePosingResized-min.jpg'

const source = ref('');

function showBannerOrNot(currRoute, el) {
  if (currRoute.path.includes("/casuals/")) {
    el.style.display = "none";
  }
}

const getBannerImg = async () => {
  setInterval(async () => {
    const imageCall = await JSON.parse(localStorage.getItem('BannerImg'))
    if (imageCall) {
      source.value = imageCall;
      clearInterval(this);
    } else {
      console.log("There is not banner")
    }
  }, 300)
}

const router = useRouter();

onMounted(async () => {
  const currRoute = router.currentRoute.value;
  const banner = document.getElementsByClassName("showIf");
  showBannerOrNot(currRoute, banner[0]);
  await getBannerImg();

  loaded.value = true;
});

</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.header {

  &-content {
    color: #000;
    padding: 11rem 0;
    width: 100%;
    background-color: #f2f0f1;
    font-family: "SatoshiRegular";
    position: relative;
    min-height: 40rem;

    @media (max-width: 768px) {
      padding-top: 4rem;
    }

    &-image {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      aspect-ratio: 3 / 2;
      object-fit: cover;
      object-position: right top;
      transition: filter 2s;

      @media (max-width: 990px) {
        object-position: right bottom;
        filter: blur(0.4rem);
      }
    }

    @media (max-width: 990px) {
      height: 100vh;
    }
  }
}

.companyList {
  display: flex;
  list-style: none;
  background-color: #000;
  padding: 0;
  justify-content: space-between;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;

  &-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 4.2rem 2rem;
    align-items: center;
    row-gap: 2rem;

    @media (max-width: 1024px) {
      gap: 3rem;
      flex-wrap: wrap;
      justify-content: center;
      padding: 4.2rem 1.9rem;
    }

    @media (max-width: 550px) {
      flex-wrap: wrap;
      padding: 3.9rem 2.5rem;
    }

    @media (max-width: 490px) {
      flex-wrap: wrap;
      padding: 3.9rem 1.6rem;
    }
  }

  &-firm {
    @media (max-width: 480px) {
      height: 2.5rem;

      & img {
        height: 100%;
      }
    }
  }
}

.content {
  position: relative;
  z-index: 2;

  &-slogan {
    font-size: 6.4rem;
    font-family: "IntegralCF1";
    line-height: 100%;
    word-break: break-word;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;

    @media (max-width: 768px) {
      font-size: 4.8rem;
    }

    @media (max-width: 390px) {
      font-size: 4rem;
    }

  }

  &-motive {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    @media (max-width: 768px) {
      align-items: start;
      gap: 2rem;
    }
  }

  &-achievements {
    align-self: center;

    @media (max-width: 576px) {
      // font-size: 1.3rem;
    }

    padding-right: 2.75rem;

    @media (max-width: 630px) {
      padding: 0;
    }

    &:not(:last-child) {
      border-right: 0.1rem solid black;

      @media (max-width: 630px) {
        border: none;
        padding: 0;
      }

    }

    &:not(:first-child) {
      padding-left: 2.75rem;

      @media (max-width: 990px) {
        padding: 1.5rem;
      }

      @media (max-width: 630px) {
        // border: none;
        padding: 0;
      }
    }
  }

  &-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 80rem;
    // padding: 0 10rem;

    @media (max-width: 1140px) {
      padding: 0 8rem;
      // margin: 0 auto;
    }

    @media (max-width: 768px) {
      &:last-child {
        justify-content: center;
      }

      padding: 0;
      max-width: 100%;
    }
  }

  &-btn {
    border: none;
    outline: none;
    background-color: #000;
    color: #fff;
    font-family: "SatoshiMedium";
    padding: 1.5rem 0;
    border-radius: 6.2rem;
    font-size: 1.6rem;
    cursor: pointer;
    max-width: 20rem;

    &>a {
      color: #fff;
    }

    @media (max-width: 768px) {
      max-width: calc(100% - (1.5rem * 2));
      width: 100%;
    }
  }

  &-desc {
    font-size: 1.6rem;
    line-height: 2.2rem;
    max-width: 70%;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;

    @media (max-width: 490px) {
      max-width: 100%;
      font-size: 1.4rem;
    }
  }

  &-counts {
    font-family: "SatoshiBold";
    font-size: 4rem;


    @media (max-width: 630px) {
      font-size: 2.4rem !important;
      text-align: center;
    }

    @media (max-width: 510px) {
      font-size: 2rem !important;
      text-align: center;
    }

    &--desc {
      font-size: 1.6rem;
      font-family: "SatoshiRegular";
      opacity: 0.6;
      width: 100%;
      white-space: nowrap;

      @media (max-width: 510px) {
        font-size: 1.2rem;
      }

      @media (max-width: 390px) {
        font-size: 0.8rem;
      }
    }
  }

  &-inNumbers {
    display: flex;
    width: 100%;
    max-width: 100%;
    margin-top: 4.8rem;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;

    @media (max-width: 990px) {
      border-radius: 1.5rem;
      margin: 1.5rem 0;
      padding: 1.5rem 0 !important;
      column-gap: 2rem;
      max-width: 100%;
      width: 100%;
      flex-wrap: nowrap;
      justify-content: start;
    }

    @media (max-width: 630px) {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(0.2rem);
      margin-top: 2rem;
      padding: 0;
      justify-content: center;
    }
  }
}
</style>
