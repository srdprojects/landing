<template>
  <div id="content-main" class="product-content">
    <div class="product-container">
      <ul class="breadcrumb">
        <li class="breadcrumb-link"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-link">T-shirt</li>
      </ul>

      <div class="product-info">
        <div class="product-aside gallery">
          <div class="product-thumbnails">
            <div v-for="(i, index) in production.media" :key="index" class="product-thumbnail"
              @click="(el) => { changeImage(i, el.target) }">
              <img v-lazy="{ src: i.url, loading: loadingPlaceholder }" alt="Error" />
            </div>
          </div>
          <div class="product-thumbnails-main">
            <img id="mainImage"
              :src="mainImage"
              alt="Error" />
          </div>
        </div>

        <div class="product-aside">
          <div class="product-data">
            <p class="product-data-name">{{ production.title }}</p>
            <div class="product-data-prices">
              <p class="product-data-prices-price">${{ production.price }}</p>
              <p class="product-data-prices-price prev">
                ${{ (production.price * 1.2).toFixed(2) }}
              </p>
              <span class="product-data-prices-percetage">-20%</span>
            </div>
            <div class="product-data-descWrapper">
              <p v-for="(i, index) in production.description" :key="index" class="product-data-text">
                {{ i.children[0].text }}
              </p>

            </div>
          </div>
          <div class="product-color">
            <p class="product-data-text">Select Colors</p>
            <div class="product-color-selects">
              <div @click="
                toggleTabs(colorOptions);
              selectedColor = 'Brown';
              " class="product-color-select brown"></div>
              <div @click="
                toggleTabs(colorOptions);
              selectedColor = 'Green';
              " class="product-color-select green"></div>
              <div @click="
                toggleTabs(colorOptions);
              selectedColor = 'Blue';
              " class="product-color-select blue"></div>
            </div>
          </div>
          <div class="product-size">
            <p class="product-data-text">Choose Size</p>
            <div class="product-size-buttons">
              <button @click="
                toggleTabs(sizeOptions);
              selectedSize = 'Small';
              " class="product-size-button">
                Small
              </button>
              <button @click="
                toggleTabs(sizeOptions);
              selectedSize = 'Medium';
              " class="product-size-button">
                Medium
              </button>
              <button @click="
                toggleTabs(sizeOptions);
              selectedSize = 'Large';
              " class="product-size-button">
                Large
              </button>
              <button @click="
                toggleTabs(sizeOptions);
              selectedSize = 'X-Large';
              " class="product-size-button">
                X-Large
              </button>
            </div>
          </div>
          <div class="product-add">
            <div class="product-add-count">
              <button @click="decrementCounter">
                <img src="../assets/img/Minus.svg" aria-label="Count-subtract" name="Count-subtract" alt="" />
              </button>
              <span class="product-add-amount">{{ amount }}</span>
              <button @click="incrementCounter">
                <img src="../assets/img/Plus.svg" aria-label="Count-add" name="" alt="" />
              </button>
            </div>
            <button @click="addToCart" class="product-add-btn">Add to Cart</button>
            <routerLink to="/cart" @click="addToCart" class="product-add-btn cart">Go to Cart</routerLink>
          </div>
        </div>
      </div>

      <div class="product-box">
        <div class="product-control">
          <h2 class="product-control-title">All Reviews <span>(6)</span></h2>
          <div class="product-control-tabs">
            <div class="custom-select">
              <button @click="toggleDropdown" class="select-btn">
                {{ selectedOption }}
                <span class="arrow" :class="{ open: isOpen }">></span>
              </button>

              <ul v-if="isOpen" class="dropdown">
                <li v-for="option in options" :key="option" @click="selectOption(option)" class="dropdown-item">
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="product-comments">
        <div v-for="(i, index) in sortedComments" :key="index" class="product-comment">
          <div class="product-comment-ratingTitle">
            <div class="product-comment-stars">
              <img class="product-comment-starImg" v-for="num in i.stars" :key="num" src="../assets/img/Star 1.svg"
                alt="" />
            </div>
          </div>

          <div class="product-comment-user">
            <div class="product-comment-name">
              <span>{{ i.name }}</span><img class="product-comment-name-svg" src="../assets/img/ApprovedRating.svg"
                alt="" />
            </div>
            <p class="product-comment-text">
              {{ i.text }}
            </p>
          </div>
          <p class="product-comment-date">
            Posted on August {{ i.date.getDate() }}, 2023
          </p>
        </div>
      </div>

      <div class="recomends">
        <p class="recomends-title">You might also like</p>
        <div class="recomends-cards">
          <Card :price="i.price" :unknown="i" class="main-newArrivals-cards-card" id="main-newArrivals-cards-card"
            v-for="(i) in allProducts.slice(allProducts.length - 5, allProducts.length - 1)" :image="i.media[0].url"
            :key="i.id" :title="i.title" @click="scrollUserTop(i, i.product_id)"></Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Card from "../components/ProductCard.vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { defineProps } from "vue";
import loadingPlaceholder from "../assets/img/Loading.gif";
import NoImage from '../assets/img/NoImageProduct.jpg';
import commentUsers from "../../composables/reusables/commentsProducts";
defineProps({
  imageSrcCard: String,
  product: Array,
});

const router = useRouter();
const amount = ref(1);
const isOpen = ref(false);
const selectedOption = ref("Latest");
const options = ["Latest", "Newest"];
const colorOptions = ref([]);
const sizeOptions = ref([]);
const selectedSize = ref("");
const selectedColor = ref("");
const cart = ref([]);

const production = ref({ media: [] });
const mainImage = ref(NoImage)
const allProducts = ref([])
const productId = ref(router.currentRoute.value.params.id)

watch(() => production.value.media, (newMedia) => {
  if (newMedia && newMedia.length > 0) {
    mainImage.value = newMedia[0].url
  }
},
  { deep: true, immediate: true }
)

onMounted(() => {
  colorOptions.value = ref(document.querySelectorAll(".product-color-select"));
  sizeOptions.value = ref(document.querySelectorAll(".product-size-button"));
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
  parseProducts()
});

onBeforeRouteUpdate((to, from) => {
  console.log("Route updated:", to.params.id);
  productId.value = to.params.id;
  parseProducts();
});

function parseProducts() {
  JSON.parse(localStorage.getItem("filteredProducts")).forEach(
    (element) => {
      allProducts.value.push(element)
      if (element.product_id == productId.value) {
        production.value = element;
      }
    }
  )

  if (production.value.media && production.value.media.length > 0) {
    mainImage.value = production.value.media[0].url;
  }
}

const addToCart = () => {
  if (!selectedSize.value || !selectedColor.value) {
    alert("Please select size and color.");
    return;
  }

  const newItem = {
    id: production.value.product_id,
    name: production.value.title,
    size: selectedSize.value,
    color: selectedColor.value,
    price: production.value.price,
    quantity: amount.value,
    image: production.value.media[0].url,
    itemId: production.value.product_id,
  };

  const existingIndex = cart.value.findIndex(
    (item) =>
      item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
  );

  if (existingIndex !== -1) {
    cart.value[existingIndex].quantity = Math.max(
      cart.value[existingIndex].quantity,
      newItem.quantity
    );
  } else {
    cart.value.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart.value));

  const buttons = document.querySelectorAll(".product-add-btn");

  buttons.forEach((el) => {
    if (!el.classList.contains("cart")) {
      el.style.display = "none";
    } else {
      document.querySelector(".product-add-count").style.display = "none";
      el.style.display = "flex";
    }
  });
};

function changeImage(imageSrc, element) {
  const images = document.querySelectorAll(".product-thumbnail");
  images.forEach((el) => {
    el.classList.remove("active");
  });
  element.parentElement.classList.add("active");
  console.log(document.getElementById("mainImage").src, imageSrc);
  document.getElementById("mainImage").src = imageSrc.url;
}


const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

function scrollUserTop(productId, index) {
  router.push(`/product/${index}`);
  production.value = productId;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

const incrementCounter = () => {
  amount.value++;
};

const decrementCounter = () => {
  if (amount.value > 1) {
    amount.value--;
  }
};



function toggleTabs(arr) {
  arr.value.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

const sortedComments = computed(() => {
  return commentUsers.slice().sort((a, b) => {
    return selectedOption.value === "Latest" ? b.date - a.date : a.date - b.date;
  });
});
</script>

<style scoped lang="scss">
.product {
  &-content {
    margin: 0 auto;
    margin-bottom: 10rem;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    font-family: "SatoshiRegular";
    margin-bottom: 6rem;

    @media (max-width: 768px) {
      flex-direction: column;
      justify-content: center;

      flex: nowrap;
      font-size: 5.5rem;
    }

    @media (max-width: 480px) {
      font-size: 3.2rem;
    }
  }

  &-aside {
    max-width: calc(100% / 2 - 2rem);
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    }

    &.gallery {
      display: flex;
      gap: 1.4rem;
      align-items: stretch;

      @media (max-width: 768px) {
        align-items: center;
        justify-content: center;

        max-width: 100%;
      }

      @media (max-width: 480px) {
        font-size: 3.2rem;
      }
    }
  }

  &-thumbnails {
    max-width: 20%;
    width: 100%;
    display: flex;

    @media (max-width: 768px) {
      max-width: calc(100% / 3 + 17rem);
      flex-direction: row;
      max-width: 100%;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 5.5rem;
    }

    @media (max-width: 490px) {
      max-width: 100%;
      gap: 1.2rem;
    }

    flex-direction: column;
    gap: 1.4rem;
    height: 100%;

    &-main {
      @media (max-width: 768px) {
        max-width: 100%;
      }

      border-radius: 2rem;
      overflow: hidden;
      max-width: 80%;
      width: 100%;
      height: 51.5rem;
      background: #f0eeed;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }

      @media (max-width: 480px) {
        font-size: 3.2rem;
      }
    }
  }

  &-thumbnail {
    width: 100%;
    height: 16rem;
    border: 0.1rem solid transparent;
    border-radius: 2rem;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;

    &.active {
      border: 0.3rem solid #716161;
    }

    &:hover:not(.product-thumbnail.active) {
      border: 0.1rem solid black;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    @media (max-width: 490px) {
      height: 10.6rem;
      max-width: 11.1rem;
      width: 100% !important;
    }
  }

  &-data {
    padding-bottom: 2.4rem;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

    &-name {
      font-family: "IntegralCF1", "Inter";

      font-size: 4rem;
      font-weight: 900;
      line-height: 120%;
      text-transform: capitalize;
      margin-bottom: 1.4rem;

      @media (max-width: 768px) {
        font-size: 3.5rem;
        width: 100%;
      }

      @media (max-width: 490px) {
        font-size: 2.4rem;
      }
    }

    &-rating {
      display: flex;
      align-items: center;
      column-gap: 0.6rem;
      margin-bottom: 1.4rem;

      & img {
        height: 2.5rem;
      }
    }

    &-ratingNum {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 100%;
      margin-left: 0.5rem;

      & span {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    &-prices {
      width: max-content;
      display: flex;
      align-items: end;
      column-gap: 1rem;
      margin-bottom: 2rem;

      &-price {
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 120%;
        color: #000;
        line-height: 1;

        @media (max-width: 490px) {
          font-size: 2.4rem;
        }

        &.prev {
          font-size: 2.4rem;
          margin-bottom: 0.2rem;
          color: rgba(0, 0, 0, 0.4);
          text-decoration: line-through;

          @media (max-width: 490px) {
            font-size: 2rem;
            margin-bottom: 0.2rem;
          }
        }
      }

      &-percetage {
        padding: 1rem 1.6rem;
        border-radius: 5rem;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 120%;
        color: #ff3333;
        background: rgba(255, 51, 51, 0.1);

        @media (max-width: 490px) {
          font-size: 1.4rem;
          padding: 0.6rem 1.2rem;
        }
      }
    }

    &-descWrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &-text {
      font-size: 1.6rem;
      line-height: 125%;
      color: rgba(0, 0, 0, 0.6);
      gap: 1rem;

      @media (max-width: 490px) {
        font-size: 1.4rem;
        width: 100%;
      }
    }
  }

  &-color {
    padding: 2.4rem 0;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

    &-selects {
      display: flex;
      gap: 1rem;
    }

    &-select {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      margin-top: 1.6rem;
      transition: 100ms;
      cursor: pointer;

      &.brown {
        background: #4f4631;
      }

      &.green {
        background: #314f4a;
      }

      &.blue {
        background: #31344f;
      }

      &.active {
        transform: scale(0.85);
      }
    }
  }

  &-size {
    padding: 2.4rem 0;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

    &-buttons {
      display: flex;
      gap: 1.2rem;
      margin-top: 1.6rem;
      flex-wrap: wrap;

      @media (max-width: 490px) {
        gap: 0.8rem;
      }
    }

    &-button {
      font-family: "SatoshiRegular";
      font-size: 1.6rem;
      line-height: 100%;
      color: rgba(0, 0, 0, 0.6);
      background: #f0f0f0;
      border: none;
      border-radius: 5rem;
      padding: 1.2rem 2.4rem;
      transition: 0.3s;
      cursor: pointer;

      &.active {
        background: #000;
        color: #fff;
      }
    }
  }

  &-add {
    margin-top: 2.4rem;
    display: flex;
    gap: 2rem;
    font-family: "SatoshiRegular";

    &-amount {
      @media (max-width: 490px) {
        font-size: 1.4rem;
      }
    }

    &-count {
      display: none;
      max-width: 25%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 5rem;
      background: #f0f0f0;
      font-size: 1.6rem;
      overflow: hidden;

      @media (max-width: 390px) {
        max-width: 40%;
      }

      & button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5rem;
        width: 5rem;
        padding: 1.5rem 0;
        border: none;
        background: none;
        color: #000;
        cursor: pointer;

        & img {
          @media (max-width: 480px) {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }
    }

    &-btn {
      font-family: "SatoshiRegular";
      max-width: 100%;
      width: 100%;
      font-size: 1.6rem;
      font-weight: 500;
      color: #fff;
      background: #000;
      border: none;
      padding: 1.5rem 0;
      border-radius: 5em;
      cursor: pointer;

      &.cart {
        background-color: #fff;
        color: #000;
        display: flex;
        border: 0.1rem solid #000;
        display: none;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      @media (max-width: 390px) {
        font-size: 1.4rem;
      }
    }
  }

  &-tabs {
    display: flex;
    margin-bottom: 2.4rem;

    @media (max-width: 390px) {
      width: 100% !important;
      // font-size: 1.4rem;
    }
  }

  &-tab {
    font-family: "SatoshiRegular";
    font-weight: 400;
    font-size: 2rem;
    padding: 2.4rem 0;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);
    background: none;
    border: none;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 300ms;

    &:hover {
      color: #000;
    }

    &.active {
      font-weight: 500;
      color: #000;
      border-bottom: 0.2rem solid #000;
    }

    @media (max-width: 490px) {
      font-size: 1.6rem;
      padding: 0 0 2rem;
    }

    @media (max-width: 390px) {
      font-size: 1.3rem;
    }
  }

  &-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "SatoshiRegular";

    &-title {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 100%;
      color: #000;

      @media (max-width: 390px) {
        font-size: 1.6rem !important;
      }

      & span {
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 0.6);

        @media (max-width: 490px) {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 490px) {
        font-size: 2rem;
      }
    }

    &-tabs {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: 390px) {
        gap: 0.8rem;
      }
    }

    &-btn {
      height: max-content;
      border-radius: 50%;
      border: none;
      background: #f0f0f0;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @media (max-width: 390px) {
        // font-size: 1.3rem;
        padding: 0.8rem;
      }
    }

    &-write {
      height: 100%;
      font-family: "SatoshiRegular";
      font-size: 1.6rem;
      font-weight: 500;
      color: #fff;
      line-height: 100%;
      cursor: pointer;
      padding: 1.3rem 2.95rem;
      border: none;
      background: #000;
      border-radius: 5rem;

      @media (max-width: 490px) {
        font-size: 1.2rem;
        padding: 1.2rem 1.6rem;
      }
    }
  }

  &-comments {
    font-family: "SatoshiRegular";
    display: flex;
    flex-wrap: wrap;
    // flex-direction: row;
    font-size: 1.6rem;
    margin-top: 3.2rem;
    gap: 2rem;
    position: relative;
    justify-content: center;
    // justify-content: space-between;
    margin-bottom: 3.6rem;

    @media (max-width: 1024px) {
      justify-content: center;
    }

    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }

    @media (max-width: 480px) {
      max-width: 100%;
      justify-content: center;
    }
  }

  &-loadMore {
    border: none;
    text-align: center;

    &-btn {
      outline: none;
      background: none;
      font-size: 1.6rem;
      font-family: "SatoshiMedium";
      border: 0.1rem solid rgba(0, 0, 0, 0.1);
      padding: 1.5rem 4.5rem;
      border-radius: 62.5rem;
      cursor: pointer;
    }

    margin-bottom: 6.4rem;

    @media (max-width: 490px) {
      margin-bottom: 5rem;
    }
  }

  &-comment {
    max-width: calc(100% / 2 - 6rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border-radius: 2rem;
    justify-content: space-between;

    @media (max-width: 1024px) {
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: 768px) {
      max-width: 100%;
      gap: 1.5rem;
      margin-bottom: none;
      width: 100%;
    }

    &-starImg {
      width: 2.3rem;
      height: 2.4rem;
    }

    &-ratingTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-text {
        opacity: 0.6;
      }
    }

    &-user {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    &-name {
      font-family: "SatoshiBold";
      font-size: 2rem;
      line-height: 2.2rem;
      display: flex;
      gap: 0.5rem;

      &-svg {
        margin-top: -0.3rem;
      }
    }

    &-text {
      line-height: 2.2rem;
      opacity: 0.6;
      font-size: 1.6rem;
    }
  }
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 2rem 0 3.6rem 0;
  font-family: "SatoshiRegular";
  font-size: 1.6rem;

  @media (max-width: 490px) {
    font-size: 1.4rem;
    padding: 2rem 0;
  }

  &-link {
    display: flex;
    align-items: center;

    & a {
      text-decoration: none;
      color: #666;
      transition: color 0.3s;

      &:hover {
        color: black;
      }
    }

    &::after {
      content: "›";
      margin: 0 0.8rem;
      color: #999;
    }

    &:last-child::after {
      content: "";
    }

    &:last-child a {
      font-weight: bold;
      color: black;
      pointer-events: none;
    }
  }
}

.custom-select {
  position: relative;
  display: inline-block;

  & .select-btn {
    font-family: "SatoshiRegular";
    display: flex;
    align-items: center;
    padding: 1rem 1.6rem;
    background: #f4f4f4;
    border: none;
    border-radius: 2.5rem;
    font-size: 1.6rem;
    cursor: pointer;
    transition: background 0.2s;

    @media (max-width: 490px) {
      display: none;
    }

    &-:hover {
      background: #e0e0e0;
    }
  }

  & .arrow {
    margin-left: 0.8rem;
    transition: transform 0.3s ease;
    transform: rotate(90deg);

    &.open {
      transform: rotate(270deg);
    }
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  border: 0.1rem solid #ddd;
  z-index: 10;

  &-item {
    font-family: "SatoshiRegular";
    padding: 1rem 1.6rem;
    font-size: 1.6rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f4f4f4;
    }
  }
}

.recomends {
  &-cards {
    flex-wrap: nowrap;
    display: flex;
    justify-content: flex-start;
    overflow: auto;
    gap: 2rem;

    &-content {
      padding: 1.2rem 0;

      &:nth-child(1) {
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
      }
    }

    @media (max-width: 1024px) {
      font-size: 5.5rem;
    }
  }

  &-title {
    font-family: "IntegralCF", "Roboto";
    font-weight: 700;
    font-size: 4.8rem;
    text-align: center;
    margin-bottom: 5.5rem;

    @media (max-width: 490px) {
      font-size: 3.2rem;
      margin-bottom: 4rem;
    }
  }
}

.card {
  max-width: calc(100% / 4 - 2rem);
  width: 100%;
  font-family: "Roboto";

  @media (max-width: 1024px) {
    max-width: 26.3rem;
    width: 100%;
  }

  &-name {
    font-family: "SatoshiBold";
    font-size: 2rem;
    line-height: 120%;
    margin: 1.6rem 0 0.8rem 0;
  }

  &-stars {
    width: 1.8rem;
    height: 1.8rem;
  }

  &-img {
    width: 100%;
    height: 30rem;
    overflow: hidden;
    border-radius: 2rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &-rating {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  &-ratingNum {
    font-family: "SatoshiRegular";
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    margin-left: 1.2rem;

    & span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &-prices {
    font-family: "SatoshiBold";
    width: max-content;
    display: flex;
    align-items: center;
    column-gap: 1rem;

    &-price {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 120%;
      color: #000;

      &.prev {
        color: rgba(0, 0, 0, 0.6);
        text-decoration: line-through;
      }
    }

    &-percetage {
      padding: 0.6rem 1.4rem;
      border-radius: 5rem;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 120%;
      color: #ff3333;
      background: rgba(255, 51, 51, 0.1);

      @media (max-width: 490px) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
