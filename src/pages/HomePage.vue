<template>
  <div class="homePage">
    <main class="arrivals">
      <section class="cards-content">
        <h1 class="main-header">NEW ARRIVALS</h1>
        <div class="main-newArrivals">
          <div class="main-newArrivals-cards">
            <!-- <Card :rating="i.rating" @click="router.push(`/product/${i.product_id}`)" :price="i.price" :title="i.title"
              v-for="i in products" :product="i" :key="i" :image="i.media[0].url"></Card> -->
            <swiper :slides-per-view="4" :spaceBetween="20" class="home-swiper" :breakpoints="{
              320: { slidesPerView: 1.5 },
              490: { slidesPerView: 1.5 },
              540: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4},
            }">
              <swiper-slide @click="router.push(`/product/${slide.product_id}`)" v-for="(slide, index) in products" :key="index" class="home-slide">
                <div class="home-slide-img">
                  <img :src="slide.media[0].url" alt="error" />
                </div>
                <p class="home-slide-name">{{ slide.title.slice(0, 30) + '...' }} </p>

                <div class="home-slide-prices">
                  <p class="home-slide-price">{{ slide.price }} so'm</p>
                  <p class="home-slide-price prev">{{ (slide.price * 1.2).toFixed(1) }} so'm</p>
                  <span class="home-slide-percetage">-20%</span>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="main-button-wrapper">
          <router-link class="main-button" to="/category/all">View All</router-link>
        </div>
      </section>
      <div class="dress">
        <h2 class="style-title">browse by dress style</h2>
        <div class="style-categories">
          <div v-for="i in categories.slice(0, 4)" :key="i.id"
            @click="(el) => { router.push(`/category/${i.category_name}`) }" class="style-category min">
            <h2 class="style-category-title">{{ i.category_name }}</h2>
            <img src="../assets/img/casual-new.jpg" class="style-category-image" alt="" />
          </div>
          <div class="style-category-viewAllBtn">
            <router-link class="main-button category" to="/category">View All</router-link>
          </div>
        </div>
      </div>
    </main>
    <div class="reviews">
      <div class="reviews-container">
        <h2 class="reviews-title">Our happy customers</h2>
      </div>
      <div class="reviews-container">
        <swiper :modules="[Autoplay]" :slides-per-view="3" :spaceBetween="20" :breakpoints="{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }" :allowTouchMove="false" :loop="true" :autoplay="{ delay: 3000, disableOnInteraction: false }">
          <swiper-slide v-for="(slide, index) in 10" :key="index" class="review-slide">
            <div class="reviews-card">
              <img v-for="num in 5" :key="num" src="../assets/img/Star 1.svg" alt="" class="reviews-card-star" />
              <h2 class="reviews-card-title">Sarah M.</h2>
              <p class="reviews-card-desc">
                "Finding clothes that align with my personal style used to be a challenge
                until I discovered Shop.co. The range of options they offer is truly
                remarkable, catering to a variety of tastes and occasions.”
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import Card from "../components/ProductCard.vue";
import Products from "../../composables/products/app";
import Machines from "../../composables/machines/app";
import Categories from "../../composables/categories/app";
import NoImage from "../assets/img/NoImageProduct.jpg";

const router = useRouter();
const products = ref([]);
const categories = ref([]);

const getProducts = async () => {
  try {
    const data = await new Products().init();
    const machines = await new Machines().init();
    const categoriesSet = await new Categories().init();

    const allProducts = data.data || [];

    const currentMachine = machines.data.find(
      (item) => item.url === window.location.hostname
    );
    
    const author = parseInt(currentMachine?.author || 0);
    
    const filteredProducts = allProducts
      .filter((item) => {
        const userPermissions = item.users_permissions_user || item.user_permissions_user;
        return userPermissions && parseInt(userPermissions.id) === author;
      })
      .map((item) => {
        if (!item.resources) {
          item.resources = { data: [] };
        }
        if (!item.resources.data) {
          item.resources.data = [];
        }
        if (item.resources.data.length === 0) {
          item.resources.data = [NoImage, NoImage, NoImage];
        }
        return item;
      });

    function removeData(data) {
      localStorage.removeItem(data);
    }

    const filtered = localStorage.getItem("filteredProducts");
    const category = localStorage.getItem("categories");
    const BannerImg = localStorage.getItem("BannerImg");

    if (filtered) {
      removeData("filteredProducts")
    }

    if (category) {
      removeData("categories")
    }

    if (BannerImg) {
      removeData("BannerImg")
    }

    localStorage.setItem("filteredProducts", JSON.stringify(filteredProducts));
    localStorage.setItem("categories", JSON.stringify(categoriesSet.data || []));
    localStorage.setItem("BannerImg", JSON.stringify(currentMachine.banner || ''));

    products.value = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
    categories.value = Array.isArray(categoriesSet.data) ? categoriesSet.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(() => {
  const storedProducts = JSON.parse(localStorage.getItem("filteredProducts")) || [];
  const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
  getProducts();

  if (storedProducts.length === 0 || storedCategories === 0) {
  } else {
    products.value = storedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  }

  categories.value = Array.isArray(storedCategories) ? storedCategories : [];
});
</script>

<style lang="scss">
.home {
  &-swiper {
    width: 100%;
  }

  &-slide {
    // max-width: calc(100% / 4);
    width: 100%;

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

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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

.dress {
  padding: 6.4rem;
  text-align: center;
  font-family: "SatoshiBold";
  background-color: #f0f0f0;
  border-radius: 4rem;
  margin-top: 8rem;

  @media (max-width: 768px) {
    padding: 5rem 3.2rem;
    margin-top: 6.5rem;
  }

  @media (max-width: 490px) {
    margin-top: 5rem;
    padding: 4rem 2.4rem;
  }
}

.cards-content {
  margin-bottom: 8rem;

  @media (max-width: 490px) {
    margin-bottom: 5rem;
  }

}

.main {
  text-align: center;
  font-family: "SatoshiRegular";

  &-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    overflow: hidden;
  }

  &-header {
    font-family: "IntegralCF";
    font-size: 4.8rem;
    text-align: center;
    margin-top: 7.2rem;

    @media (max-width: 490px) {
      margin-top: 5rem;
      font-size: 3.2rem;
    }
  }

  @media (max-width: 490px) {
    font-size: 3rem;
  }

  &-newArrivals {
    overflow: hidden;
    text-align: left;
    font-family: "SatoshiRegular";

    &-card {
      max-width: 30rem;
      width: 100% !important;
      // object-fit: cover;
    }

    &-cards {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: auto;
      gap: 2rem;

      margin-top: 5.5rem;
      margin-bottom: 3.6rem;

      @media (max-width: 490px) {
        // margin-bottom: 2.4rem;
        margin-top: 3.2rem;
      }

      @media (max-width: 990px) {
        justify-content: start;
      }

      // &>div {
      //   width: 20rem;
      // }
    }
  }

  &-button {
    font-size: 1.6rem;
    font-weight: 500;
    background: white;
    line-height: 120%;
    text-align: center;
    padding: 1.5rem 8rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 5rem;
    font-family: "SatoshiRegular";

    &.category {
      text-align: center;
    }

    &-wrapper {
      text-align: center;
    }

    @media (max-width: 490px) {
      width: 100%;
      font-size: 1.4rem;
    }


    cursor: pointer;
  }
}

.style {
  padding: 7rem 6.4rem;
  background: #f0f0f0;
  border-radius: 4rem;
  margin-bottom: 8rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }

  &-title {
    font-family: "IntegralCF";
    font-size: 4.8rem;
    font-weight: 700;
    color: black;
    margin-bottom: 6.4rem;

    @media (max-width: 768px) {
      font-size: 3.2rem;
    }

    @media (max-width: 490px) {
      margin-bottom: 2.8rem;
    }
  }

  &-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  &-category {
    position: relative;
    max-width: calc(50% - 6rem);
    width: 100%;
    height: 28rem;
    padding: 2.5rem;
    background: white;
    border-radius: 2rem;
    overflow: hidden;
    cursor: pointer;

    &-viewAllBtn {
      width: 100%;
      margin-top: 2rem;
      text-align: center;
    }

    @media(max-width: 990px) {
      height: 19rem;
    }

    &.min {
      // max-width: calc(40% - 6rem);

      @media (max-width: 990px) {
        max-width: 100%;
      }
    }

    &.max {
      // max-width: calc(60% - 6rem);


      @media (max-width: 990px) {

        max-width: 100%;
      }
    }

    &-image {
      position: absolute;
      object-position: middle;
      height: 100%;
      object-fit: cover;
      width: 100%;
      top: 0;
      overflow: hidden;
    }

    @media (max-width: 490px) {
      height: 20rem;
    }

    & img {
      top: 0;
      left: 0;
    }

    &-title {
      top: 0;
      left: 0;
      color: #f0f0f0;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 3.6rem;
      font-weight: 700;
      position: absolute;
      z-index: 9;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        font-size: 2rem;
      }

    }
  }
}

.reviews {
  margin-bottom: 20rem;

  @media (max-width: 768px) {
    margin-bottom: 10rem;
  }

  @media (max-width: 490px) {
    margin-bottom: 5rem;
  }

  &-title {
    font-family: "IntegralCF";
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 120%;
    margin: 5rem 0 2.4rem 0;

    @media (max-width: 768px) {
      font-size: 3.2rem;
      line-height: 3.6rem;
      padding: 0 1.6rem;
    }
  }


  &-card {
    padding: 2rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    user-select: none;

    @media (max-width: 768px) {
      max-width: 100%;
    }

    &-star {
      width: 2rem;
    }

    &-title {
      font-family: "SatoshiMedium";
      font-size: 2rem;
      font-weight: 700;
      color: #000;
      margin: 1.2rem 0 0.8rem 0;
    }

    &-desc {
      font-family: "SatoshiLight";
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 135%;
      color: rgba(0, 0, 0, 0.6);
    }
  }
}

.reviews-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}
</style>
