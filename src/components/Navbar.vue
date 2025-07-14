<template>
  <div class="navbar">
    <LoginModal :isVisible="isModalVisible" @close="isModalVisible = false" />
    <SearchModal :isInputVisible="isInputModalVisible" @close="closeSearchModal" />
    <div class="navbar-wrapper">
      <div class="navbar-logo-wrapper">
        <img @click="showListOfLinks()" class="navbar-wrapper-img" src="../assets/img/BurgerNavbar.svg" alt="" />
        <router-link to="/" rel="preload" class="navbar-logo">SHOP.CO</router-link>
      </div>

      <ul class="navbar-productList">
        <li><router-link @click="showListOfLinks()" to="/category" class="navbar-link">On Sale</router-link>
        </li>
        <li><router-link @click="showListOfLinks()" to="/" class="navbar-link">New Arrivals</router-link>
        </li>
        <li><router-link @click="showListOfLinks()" class="navbar-link" to="/category">Categories</router-link>
        </li>
        </ul>

      <div class="navbar-search-wrapper">
        <div class="navbar-search">
          <img src="../assets/img/Vector.svg" alt="" />
          <input type="text" @click="openSearchModal" class="navbar-input" placeholder="Search for products..." />
        </div>
      </div>
      <div class="navbar-user">
        <img @click="openSearchModal" class="navbar-searchBtn" src="../assets/img/SearchNavbar.svg" alt="" />
        <router-link to="/cart" aria-label="Korzina"><img src="../assets/img/Korzina.svg" alt="" /></router-link>
        <button aria-label="Navbar-login" class="navbar-profile" @click="isModalVisible = true"><img src="../assets/img/Persona.svg"
            alt="" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginModal from "./LogInPage.vue";
import SearchModal from "./SearchModal.vue";

const isModalVisible = ref(false);
const isInputModalVisible = ref(false);

const openSearchModal = () => {
  isInputModalVisible.value = true;
};

const closeSearchModal = () => {
  isInputModalVisible.value = false;
};

function showListOfLinks() {
  document
    .querySelector(".navbar-productList")
    .classList.toggle("active");
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  color: #000;

  &-search-wrapper {
    display: flex;
    width: 100%;
    gap: 1.4rem;

    @media (max-width: 990px) {
      max-width: calc(100% - (5rem * 2));
    }
  }

  .navbar-searchBtn {
    display: none;

    @media (max-width: 990px) {
      display: inline-block;
      display: flex;
      align-items: start;
    }
  }

  &-logo-wrapper {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }

  &-user {
    display: flex;

    gap: 1.4rem;

    @media (max-width: 490px) {
      max-width: calc(100% - (5rem * 2));
    }
  }

  &-link {
    font-weight: 400;
    font-size: 1.6rem;
    white-space: nowrap;

    &--burger {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      &:hover {
        .navbar-burgerImg {
          transition: 0.5s;
          rotate: 180deg;
        }
      }
    }
  }

  &-burgerImg {
    margin-bottom: -0.3rem;
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6.5rem;
    max-width: calc(100% - (10rem * 2));
    width: 100%;
    margin: 0 auto;
    padding: 2rem 0;
    border-bottom: 0.1rem solid rgba($color: #000, $alpha: 0.1);

    @media (max-width: 490px) {
      max-width: calc(100% - (1.6rem * 2)) !important;
      width: 100%;
      gap: 0;
    }

    @media (max-width: 768px) {
      max-width: calc(100% - (3rem * 2));
      justify-content: center;
    }

    &-img {
      display: none;

      @media (max-width: 768px) {
        display: block;
      }
    }

    .navbar-logo {
      font-size: 3.2rem;
      font-family: "IntegralCF";
      font-weight: 700;
      margin-bottom: 0.5rem;
      font-display: swap;
      @media (max-width: 480px) {
        font-size: 2.5rem;
      }
    }
  }

  &-productList {
    list-style: none;
    display: flex;
    gap: 2.4rem;
    font-family: "SatoshiRegular";
    justify-content: space-between;
    font-weight: 700;


    @media (max-width: 768px) {
      position: absolute;
      gap: 1rem;
      top: 100%;
      left: -100%;
      flex-direction: column;
      z-index: 3;
      background-color: #f4f4f4;
      border-radius: 1rem;
      padding: 1rem 2rem;
      transition: all 300ms;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        display: flex;
        max-width: 100%;
        box-shadow: 0.1rem 1rem 0.8rem rgba($color: #000, $alpha: 0.3);
        top: 100%;
        left: 0;
        justify-content: start;
        background: white;
        border-radius: unset;
        transform: unset;

        .navbar-link:hover{
          border-bottom: 1px solid rgba($color: #000, $alpha: 0.3);
        }
      }


    }
  }

  &-search {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem 1.6rem;
    background-color: #f0f0f0;
    border-radius: 6.2rem;
    max-width: 57rem;
    width: 100%;

    &Btn {
      cursor: pointer;
      display: flex;
      align-items: start;
    }

    &-wrapper {
      display: flex;
      justify-content: center;
    }

    @media (max-width: 1024px) {
      max-width: 30rem;
    }

    @media (max-width: 990px) {
      display: none;
    }

    .navbar-input {
      width: 100%;
      font-family: "SatoshiRegular";
      font-size: 1.6rem;
      font-weight: 400;
      outline: none;
      background-color: inherit;
      border: none;

      color: rgba($color: #000, $alpha: 0.6);
    }
  }

  &-profile {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
}
</style>
