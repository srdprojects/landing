<template>
  <div id="content-main">
    <div class="category-wrapper">
      <BreadCrumb />

      <div class="casuals">
        <div ref="products-modal-filter" class="casuals-aside">
          <div class="filters">
            <div class="filters-header">
              <p class="filters-title">Filters</p>
              <img class="filters-header-img" @click="toggleModalFilter" src="../assets/img/Krest.svg" alt="" />
            </div>

            <ul class="filters-criterias">
              <div @click="priceFiltered(categoryArray, i)" v-for="(i, index) in options" :key="index" class="filters-clothes">
                <p class="filters-clothes-type">{{i}}</p>
                <img src="../assets/img/ArrowRight.svg" alt="" />
              </div>
              <div @click="dateFiltered(categoryArray, i)"  v-for="(i, index) in dateOptions" :key="index" class="filters-clothes">
                <p class="filters-clothes-type">{{i}}</p>
                <img src="../assets/img/ArrowRight.svg" alt="" />
              </div>
            </ul>

            <div class="filters-color">
              <div class="filters-color-wrapper">
                <p class="filters-color-title">Colors</p>
              </div>

              <div class="filters-color-set">
                <div ref="" @click="((el) => { toggleTabs(el, colorTags) })" v-for="i in colors" :key="i"
                  :style="`background-color: ${i};`" class="filters-color-option"></div>
              </div>
            </div>

            <div class="filters-size">
              <div class="filters-size-wrapper">
                <p class="filters-size-title">Sizes</p>
              </div>

              <div @click="(el) => { toggleTabs(el, sizeTags) }" ref="" class="filters-size-option">
                <button v-for="i in sizes" :key="i" class="filters-size-btn">
                  {{ i }}
                </button>
              </div>
            </div>

            <div class="filters-styles">
              <div class="filters-styles-header">
                <p class="filters-title">Dress Styles</p>
              </div>

              <ul class="filters-styles-wrapper">
                <div @click="router.replace('all'); toggleModalFilter()" class="filters-clothes">
                  <p class="filters-clothes-type">Products</p>
                  <img src="../assets/img/ArrowRight.svg" alt="" />
                </div>
                <div v-for="i in categories" :key="i.id" @click="router.replace(i.category_id); toggleModalFilter()" class="filters-clothes">
                  <p class="filters-clothes-type">{{i.category_name}}</p>
                  <img src="../assets/img/ArrowRight.svg" alt="" />
                </div>
              </ul>
            </div>
            <div class="filter-apply-wrapper">
              <button @click="toggleModalFilter" class="filters-apply">Apply Filter</button>
            </div>
          </div>
        </div>

        <div class="products">
          <div class="products-wrapper">
            <div class="products-header">
              <p class="products-header-title">Products</p>
              <div class="products-header-infoBox">
                <p>Showing {{ chunkSize * currentPage - chunkSize + 1 }}-{{ chunkSize * currentPage > prod.length ?
                  prod.length :
                  chunkSize * currentPage }} of {{ prod.length }} Products</p>
                <div class="products-header-sortBy">
                  <p>Sort by:</p>
                  <div class="custom-select">
                    <button @click="toggleDropdown" class="select-btn">
                      {{ selectedOption }}
                      <span class="arrow" :class="{ open: isOpen }"><img src="../assets/img/ArrowRight.svg"
                          alt=""></span>
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
            <div class="products-header-filterSmall">
              <img @click="toggleModalFilter" src="../assets/img/Filter.svg" alt="" class="" />
            </div>
          </div>

          <div class="products-cards">
            <Card :rating="i.rating" :price="Number(i.price.toFixed(1))"
              :image="i.media[0].url" :number="i.id"
              v-for="i in chunkedArray[currentPage - 1]" :key="i" :title="i.title"
              @click="router.push(`/product/${i.product_id}`)"></Card>

          </div>
          <div class="pages">
            <div class="pages-previous" @click="prevPage" :class="{ disabled: currentPage === 1 }">
              <img class="pages-svg" src="../assets/img/ArrowLeftPrevious.svg" alt="Previous" />
              <button class="pages-btn">Previous</button>
            </div>

            <div class="pages-count">
              <div class="pages-scroll" ref="scrollContainer">
                <div v-for="page in totalPages" :key="page" class="pages-number"
                  :class="{ 'pages-number-isin': currentPage === page }" @click="goToPage(page)">
                  <span>{{ page }}</span>
                </div>
              </div>
            </div>

            <div class="pages-next" @click="nextPage" :class="{ disabled: currentPage === totalPages }">
              <button class="pages-btn">Next</button>
              <img class="pages-svg" src="../assets/img/ArrowNext.svg" alt="Next" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useTemplateRef, onMounted, ref, computed, nextTick } from "vue";
import NoImage from '../assets/img/NoImageProduct.jpg';
import { useRouter, onBeforeRouteUpdate  } from "vue-router";

import Card from '../components/ProductCard.vue';
import BreadCrumb from "@/components/BreadCrumb.vue";
import { colors } from "../../composables/reusables/colors";
import { sizes } from "../../composables/reusables/sizes";

const router = useRouter()
const productsModal = useTemplateRef("products-modal-filter");
const options = ["Most Expensive", "Least Expensive"];
const dateOptions = ["New First", "Old First"];
const prod = ref([])
const isOpen = ref(false);
const selectedOption = ref("Most Expensive");

const categories = JSON.parse(localStorage.getItem('categories'))

onBeforeRouteUpdate((to, from)=>{
  currentStyleCategory.value = to.params.style
  changeCategory()
})

function toggleTabs(el, arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove('active');
  }
  el.target.classList.add('active')
}

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
  priceFiltered(categoryArray.value, option)
};

function priceFiltered(arr, order){
  if(order == options[0]){
    return arr.sort((a, b)=> b.price - a.price)
  }
  else{
    return arr.sort((a, b)=> a.price - b.price)
  }
}

function dateFiltered(arr, order){
  if(order == dateOptions[0]){
    return arr.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt))
  }
  else{
    return arr.sort((a, b)=> new Date(a.createdAt) - new Date(b.createdAt))
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const currentStyleCategory = ref(router.currentRoute.value.params.style)

function toggleModalFilter() {
  const element = document.querySelector(".casuals-aside");
  element.classList.toggle('active')
}

const categoryArray = ref([])

function changeCategory(){
  categoryArray.value = prod.value
  if(currentStyleCategory.value == 'all'){
    return categoryArray.value = prod.value
  }
  categoryArray.value = categoryArray.value.filter(el => {
    return String(el.category.category_id) === String(currentStyleCategory.value);
  });
}

const colorTags = document.getElementsByClassName('filters-color-option')
const sizeTags = document.getElementsByClassName('filters-size-btn')
const sortOption = document.querySelector('dropdown-item');

onMounted(() => {
  productsModal.value.focus();
  prod.value = JSON.parse(localStorage.getItem('filteredProducts'))
  prod.value = prod.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  categoryArray.value = prod.value
  prod.value = prod.value.map(el => {
    if (!el.resources) {
      el.resources = { data: [] };
    }
    else if (!el.resources.data) {
      el.resources.data = [];
    }

    if (el.resources.data.length === 0) {
      el.resources.data = [NoImage, NoImage, NoImage];
    }
    return el;
  });
  priceFiltered(categoryArray.value, options[0])
  changeCategory()
  if (chunkedArray.value.length > 0 && currentPage.value > chunkedArray.value.length) {
    currentPage.value = 1;
  }
});

const chunkSize = ref(6);
const currentPage = ref(1);

const chunkedArray = computed(() => {
  let chunks = [];
  for (let i = 0; i < categoryArray.value.length; i += chunkSize.value) {
    chunks.push(categoryArray.value.slice(i, i + chunkSize.value));
  }
  return chunks;
});

const totalPages = computed(() => chunkedArray.value.length);
const scrollContainer = ref(null);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    nextTick(() => scrollToActivePage());
  }
};

const scrollToActivePage = () => {
  if (!scrollContainer.value) return;
  const activeEl = scrollContainer.value.querySelector(".pages-number-isin");
  if (activeEl) {
    scrollContainer.value.scrollTo({
      left: activeEl.offsetLeft - scrollContainer.value.clientWidth / 1 + activeEl.clientWidth / 2,
      behavior: "smooth"
    });
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    nextTick(() => scrollToActivePage());
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    nextTick(() => scrollToActivePage());
  }
};
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: inline-block;

  & .select-btn {
    font-family: "SatoshiRegular";
    display: flex;
    align-items: end;
    background: none;
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    transition: background 0.2s;
    padding: 0;

    @media (max-width: 490px) {
      display: none;
    }

    &-:hover {
      background: #e0e0e0;
    }
  }

  & .arrow {
    margin-left: 0.5rem;
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
    padding: 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f4f4f4;
    }
  }
}

.casuals {
  display: flex;
  margin-bottom: 12rem;
  align-items: stretch;
  position: relative;
  flex-shrink: 1;

  @media (max-width: 350px) {
    align-items: center;
    justify-content: center;
  }

  &-aside {
    max-width: 29.5rem !important;
    width: 100%;
    border: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    margin-right: 2rem;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar{
        display: none;
    }

    @media (max-width: 990px) {
      left: -100%;
      top: 0;
      transform: translateX(-100%);
      z-index: 8;
      overflow-y: scroll;
      position: fixed;
      width: 100%;
      max-width: unset;
      height: 100vh;
      background-color: #fff;
      transition: all .4s ease-in;

      &.active {
        left: 0;
        transform: translateX(0);
      }
    }

  }
}

.filters {

  &>*:not(filters-apply-wrapper) {
    padding: 2rem !important;
  }

  &-apply {
    cursor: pointer;

    &-wrapper {
      padding: 0 2.4rem;
    }

    border: none;
    outline: none;
    background-color: #000;
    color: #fff;
    width: 100%;
    padding: 1.45rem;
    border-radius: 6.2rem;
    font-size: 1.4rem;
    font-family: "SatoshiMedium";
    margin-bottom: 1rem;

    @media (max-width: 768px) {

      margin-bottom: 3.5rem;
    }
  }

  &-header {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    font-family: "SatoshiBold";
    padding-bottom: 2.4rem;

    &-img {
      opacity: 0.4;
      display: none;

      @media (max-width: 990px) {
        display: inline-block;
      }

      &Modal {
        display: none;

        @media (max-width: 768px) {
          display: inline-block;
        }
      }

    }
  }

  &-criterias {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: left;
    border-top: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
    padding: 2.4rem 0;
    border-bottom: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
  }

  &-clothes {
    font-size: 1.6rem;
    font-family: "SatoshiRegular";
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    color: rgba($color: #000000, $alpha: 0.6);
    transition: color 0.3s;

    &:hover {
      color: rgba($color: #000000, $alpha: 1);
    }
  }


  &-color,
  &-size {
    border-bottom: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
    padding-bottom: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0.3;
    &-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    &-title {
      font-family: "SatoshiBold";
      font-size: 2rem;
    }
  }
  
  &-color {
    &-set {
      height: calc(100% / 2 - 0.2rem);
      display: flex;
      flex-wrap: wrap;
      white-space: wrap;
      row-gap: 1.6rem;
      column-gap: 1.55rem;
      
      @media (max-width: 768px) {
        justify-content: start;
      }
    }
    
    &-option {
      height: 3.7rem;
      width: 3.7rem;
      border-radius: 50%;
      border: .1rem solid rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      cursor: pointer;
      
      // &.active {
      //   // transform: scale(0.85);
      // }
    }
  }

  &-size {
    &-option {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    &-btn {
      background-color: none;

      cursor: pointer;
      outline: none;
      border: none;
      padding: 1rem 2rem;
      border-radius: 6.2rem;
      transition: all 0.5s ease;
      color: rgba(0, 0, 0, 0.6);
      font-size: 1.4rem;
      font-family: "SatoshiRegular";


      // &.active {
      //   // opacity: 1;
      //   // background: #000;
      //   // color: #fff;

      // }
    }
  }

  &-styles {
    padding: 2.4rem 0;

    @media (max-width: 768px) {}

    &-header {
      font-size: 2rem;
      font-family: "SatoshiBold";
      margin-bottom: 2rem;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      justify-content: space-between;
      padding: 0;
    }
  }
}

.range_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.sliders_control {
  position: relative;
  min-height: 5rem;
}

.form_control {
  -webkit-appearance: none;
  appearance: none;
  background-color: inherit;

  position: absolute;
  display: flex;
  justify-content: space-between;
  font-size: 2.4rem;
  color: #000000;
  right: 0;
  left: 0;
  margin-top: 1.5rem;

  &_container-time-input {
    background: none;
  }

  &_container>span {
    font-size: 1.4rem;
    font-family: "SatoshiRegular";
  }
}

.products {
  width: 100%;
  height: 100%;

  @media (max-width: 350px) {
    justify-content: center;
  }

  &-wrapper {
    @media (max-width: 990px) {
      display: flex;
      justify-content: space-between;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;
    align-items: flex-end;

    &-filterSmall {
      display: none;
      background-color: #f0f0f0;
      border-radius: 50%;
      width: 3.2rem;
      height: 3.2rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @media (max-width: 990px) {
        display: flex;
      }

      & img {
        margin: 1rem;
        width: 1.35rem;
        height: 1.25rem;

      }
    }

    @media (max-width: 990px) {
      gap: 1rem;
    }

    &-sortBy {
      cursor: pointer;
      display: flex;
      gap: 0.5rem;

      @media (max-width: 990px) {
        display: none;
      }
    }

    &-title {
      line-height: none;
      font-family: "SatoshiBold";
      font-size: 3.2rem;
      line-height: 1;
      text-transform: capitalize;

      @media (max-width: 490px) {
        line-height: 1;
        font-size: 2.4rem;
      }
    }

    &-infoBox {
      color: rgba(0, 0%, 0%, 60%);
      font-size: 1.6rem;
      display: flex;
      align-items: flex-end;
      gap: 1.2rem;
      font-family: "SatoshiRegular";

      @media (max-width: 768px) {
        font-size: 1.4rem;
      }

      & p {
        @media (max-width: 390px) {
          font-size: 1.2rem;
        }
      }

      & span {
        color: #000;
        font-family: "SatoshiMedium";
      }
    }
  }

  &-cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      row-gap: 2rem;
    }

    @media (max-width: 350px) {
      flex-direction: column;
      justify-content: center;
      column-gap: 1.4rem;
      align-items: center;
      width: 100%;
    }

    & .card {
      max-width: calc(100% / 3 - 1.4rem);
      margin-bottom: 1.6rem;

      @media (max-width: 1024px) {
        max-width: calc(100% / 2 - 1rem);
        width: 100%;
      }

      @media (max-width: 350px) {
        max-width: calc(100%);
        width: 100%;
      }

    }
  }
}

.pages {
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 526px) {
    gap: 1rem;
  }

  padding: 2rem 0;

  &-svg {
    @media (max-width: 526px) {
      width: 0.9rem;
      height: 0.9rem;
    }
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &-previous,
  &-next {
    display: flex;
    user-select: none;
    justify-content: space-between;
    padding: 0.8rem 1.4rem;
    align-items: center;
    cursor: pointer;
    border-radius: 0.8rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;



    @media (max-width: 526px) {
      padding: 0.6rem 0.9rem;
    }

    @media (max-width: 390px) {
      width: 3.6rem;
      height: 3.6rem;
      justify-content: center;
      text-align: center;
    }

    @media (max-width: 390px) {
      width: 3rem;
      height: 3rem;
    }
  }

  &-btn {
    border: none;
    background: none;
    user-select: none;
    outline: none;
    font-family: "SatoshiMedium";
    font-size: 1.4rem;
    cursor: pointer;
    background-color: #fff;

    @media (max-width: 390px) {
      display: none;
    }

    @media (max-width: 526px) {
      font-size: 1.2rem;
    }
  }

  &-count {
    display: flex;
    justify-content: center;
    user-select: none;
    align-items: center;
    max-width: 100%;
    overflow: hidden;
    flex-grow: 1;
    gap: 1.2rem;
  }

  &-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    white-space: nowrap;
    max-width: 100%;
    padding-bottom: 0.5rem;
    justify-content: space-evenly;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  &-number {
    font-family: 'SatoshiRegular';
    font-size: 1.4rem;
    transition: transform 0.4s ease, opacity 0.4s ease;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 2rem;
    border-radius: 1rem;
    width: 3.6rem;
    height: 3.6rem;
    cursor: pointer;
    flex: 0 0 auto;

    @media (max-width: 526px) {
      border-radius: 0.5rem;
      padding: 1rem;
      max-width: calc(100% / 6 - 1rem);
      width: 100%;
    }

    @media (max-width: 526px) {
      font-size: 1.2rem;

      @media (max-width: 526px) {
        width: 3rem;
        height: 3rem;
      }
    }

    &-isin {
      color: black;
      background-color: #f4f4f4;
    }
  }
}
</style>
