<template>
  <div>
    <div id="content-main" class="cart">
      <BreadCrumb></BreadCrumb>
      <p class="content-title">Your cart</p>
      <div class="content">
        <div class="content-goodsInCart">
          <div class="goods">
            <div class="goods-card">
              <div v-for="(item, index) in cart" :key="index" class="goods-card-wrapper">
                <router-link :to="`/product/${item.itemId}`" class="goods-card-imageBox">
                  <img :src="item.image" alt="" />
                </router-link>
                <div class="goods-card-otherinfoBox">
                  <div class="goods-card-otherinfoBox-header">
                    <p class="goods-card-otherinfoBox-header-goodsName">{{ item.name }}</p>
                    <img @click="removeItem(index)" src="../assets/img/DeleteCart.svg" alt=""
                      class="goods-card-otherinfoBox-header-deleteBtn" />
                  </div>

                  <div class="goods-card-otherinfoBox-furtherDetails">
                    <p class="goods-card-otherinfoBox-furtherDetails size">
                      Size: <span>{{ item.size }}</span>
                    </p>
                    <p class="goods-card-otherinfoBox-furtherDetails color">
                      Color: <span>{{ item.color }}</span>
                    </p>
                  </div>

                  <div class="goods-card-otherinfoBox-priceNQuantity">
                    <p class="goods-card-otherinfoBox-priceNQuantity-price">${{ item.price }}</p>
                    <div class="goods-card-otherinfoBox-priceNQuantity-actions">
                      <button @click="decrementCounter(index)">
                        <img src="../assets/img/Minus.svg" />
                      </button>
                      <p class="goods-card-otherinfoBox-priceNQuantity-amountQuantity">
                        {{ item.quantity }}
                      </p>
                      <button @click="incrementCounter(index)">
                        <img src="../assets/img/Plus.svg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-link v-if="!hasElement" to="category" class="goods-card-buySome">
              Ooops, come back when you choose one
            </router-link>
          </div>
        </div>
        <div v-if="hasElement" class="cheque">
          <p class="cheque-header">Order Summary</p>

          <div class="cheque-calculations">
            <div class="cheque-calculations-totalCost">
              <div class="cheque-calculations-wrapper">
                <p class="cheque-calculations-totalCost-text">Subtotal</p>
                <p class="cheque-calculations-totalCost-value">${{ subtotal.toFixed(2) }}</p>
              </div>
            </div>

            <div class="cheque-calculations-totalCost">
              <div class="cheque-calculations-wrapper">
                <p class="cheque-calculations-totalCost-text">Discount (-20%)</p>
                <p class="cheque-calculations-totalCost-value">
                  <span>-${{ discountAmount.toFixed(2) }}</span>
                </p>
              </div>
            </div>

            <div class="cheque-calculations-totalCost">
              <div class="cheque-calculations-wrapper">
                <p class="cheque-calculations-totalCost-text">Delivery Fee</p>
                <p class="cheque-calculations-totalCost-value">${{ deliveryFee.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div class="cheque-finish">
            <div class="cheque-total">
              <div class="cheque-calculations-wrapper">
                <p class="cheque-total-text">Total</p>
                <p class="cheque-total-value">${{ totalCost.toFixed(2) }}</p>
              </div>
            </div>

            <div class="cheque-promo">
              <div class="cheque-promo-box">
                <img src="../assets/img/Promocode.svg" class="cheque-promo-box-img" alt="" />
                <input type="text" placeholder="Add promo code" class="cheque-promo-box-input" />
              </div>
              <btn type="text" class="cheque-promo-box-apply">Apply</btn>
            </div>

            <div class="cheque-checkout">
              <p class="cheque-checkout-text">Go to Checkout</p>
              <img src="../assets/img/RightArrowWhite.svg" class="cheque-checkout-svg" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup >
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref, computed, onMounted } from "vue";
const hasElement = computed(() => cart.value.length > 0);
const cart = ref([]);
const discountRate = ref(0.2);
const deliveryFee = ref(15);

onMounted(() => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
});



const removeItem = (index) => {
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const incrementCounter = (index) => {
  cart.value[index].quantity++;
};

const decrementCounter = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
  }
};

const subtotal = computed(() =>
  cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

const discountAmount = computed(() => subtotal.value * discountRate.value);

const totalCost = computed(() => subtotal.value - discountAmount.value + deliveryFee.value);

</script>

<style lang="scss" scoped>
.goods-card {
  &-wrapper {
    display: flex;
    gap: 1.6rem;
    padding: 2.4rem;

    @media (max-width: 576px) {
      gap: 1.4rem;
      padding: 1.6rem 1.4rem;
    }
  }

  &-buySome {
    font-size: 3.6rem;
    height: 50vh;
    font-family: 'IntegralCF1';
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    @media (max-width: 490px) {
      padding: 1rem;
    }
  }

  &-imageBox {
    max-width: 12.4rem;
    width: 100%;
    height: 12.4rem;
    border-radius: 0.8rem;
    overflow: hidden;
    cursor: pointer;

    @media (max-width: 576px) {
      max-width: 9.9rem;
      width: 100% !important;
      height: 9.9rem;
    }

    & img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }

  &-otherinfoBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: start;

      &-deleteBtn {
        cursor: pointer;
      }

      &-goodsName {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 2rem;
        font-family: "SatoshiBold";

        @media (max-width: 1120px) {
          font-size: 1.8rem;
        }

        @media (max-width: 490px) {
          font-size: 1.6rem;
        }

        @media (max-width: 390px) {
          font-size: 1.4rem;
          white-space: nowrap;
          font-weight: 900;
          width: 100%;
        }
      }
    }

    &-furtherDetails.size,
    &-furtherDetails.color {
      gap: 0.4rem;
      font-size: 1.4rem;

      & span {
        color: rgba(0, 0, 0, 0.6);
      }

      @media (max-width: 490px) {
        gap: 0.2rem;
        font-size: 1.2rem !important;
      }
    }

    &-priceNQuantity {
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-top: 1.5rem;

      @media (max-width: 490px) {
        margin-top: 0.1rem;
      }

      &-amountQuantity {
        font-size: 1.4rem;

        @media (max-width: 400px) {
          font-size: 1rem;
        }
      }

      &-price {
        font-size: 2.4rem;
        font-family: "SatoshiBold";

        @media (max-width: 576px) {
          font-size: 2rem;
        }
      }

      &-actions {
        display: flex;
        background-color: #f0f0f0;
        border-radius: 6.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.2rem;
        max-width: 12rem;
        width: 100%;

        @media (max-width: 400px) {
          max-width: 9rem;
        }

        & button {
          border: unset;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;

          @media (max-width: 400px) {
            width: 1.2rem;
            height: 1.2rem;

            & img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}



.content {
  font-family: "SatoshiRegular";
  // max-width: 60%;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 16rem;
  display: flex;
  gap: 2rem;
  align-items: start;
  // flex-wrap: wrap;

  @media (max-width: 890px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  &-title {
    padding-bottom: 2.4rem;
    font-size: 4rem;
    font-family: "IntegralCF1";
    width: 100%;

    // max-width: inherit;
    @media (max-width: 490px) {
      font-size: 3.2rem;
    }
  }

  &-goodsInCart {
    border: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
    // padding: 0 2.4rem;
    border-radius: 2rem;
    // max-width: calc(144rem * 7.16/10);
    width: 100%;

    @media (max-width: 890px) {
      width: 100%;
      // width: calc(100% - 3.2rem) ;
    }
  }
}

.card {
  display: flex;
  gap: 1.6rem;
  width: 100%;
  max-width: inherit;
  padding: 2.4rem 0;
  border-bottom: 0.1rem solid rgba($color: #000000, $alpha: 0.1);

  // margin: 0 2.4rem;
  &-delete {
    width: 2.4rem;
    height: 2.4rem;
  }

  &-amount {
    display: flex;
    background-color: #f0f0f0;
    padding: 1.2rem 2rem;
    // text-align: center;
    border-radius: 6.2rem;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;
    // width: 100%;
    // flex-grow: none;
    // flex-basis: 0;
    // max-width: 12.6em;
    // width: 100%;

    // &>img{
    //   max-width: 2rem;
    // }
    &Add {
      // font-size: 12.5rem;
      max-width: 1.25rem;
      max-height: 1.25rem;
      display: flex;
    }

    &Minus {
      max-width: 1.25rem;
      max-height: 1.25rem;
    }

    @media (max-width: 576px) {
      width: 100%;
      padding: 0.75rem 1.35rem;
      gap: 0;
      // max-width: 13rem;
      // width: calc(100% - 3.2rem) ;
    }

    &>img {
      width: 1.6rem;
      height: 1.6rem;
    }

    &Quantity {
      max-width: calc(12.6rem / 3 - 0.2rem);
      width: 100%;
      text-align: center;
    }
  }

  &-img {
    width: 12.4rem;
    height: 12.4rem;
    overflow: hidden;
    border-radius: 0.8rem;
    object-fit: cover;
    object-position: center;
    margin-left: 1.4rem;

    @media (max-width: 576px) {
      width: 9.9rem;
      height: 9.9rem;
    }
  }

  &-desc {
    position: relative;

    &-productName {
      font-size: 2rem;
      max-width: inherit;
      font-family: "IntegralCF1";
      padding-bottom: 0.2rem;

      @media (max-width: 1120px) {
        font-size: 1.8rem;
      }

      @media (max-width: 490px) {
        overflow: hidden;

        text-overflow: ellipsis;
        display: inline-block;
        animation: scrollText 5s linear infinite alternate;
        font-size: 1.6rem;
      }
    }

    &-details {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-top: 0.2rem;

      @media (max-width: 112rem) {
        font-size: 1.2rem;
      }

      &Size,
      &Color {
        &>span {
          color: rgba($color: #000000, $alpha: 0.6);
        }
      }
    }
  }
}

.goods {
  display: flex;
  flex-direction: column;

  &-card {
    &:last-child {
      border-bottom: none;
    }

    &-productBox {
      width: 100%;
      max-width: inherit;
      display: flex;
      justify-content: space-between;

      @media (max-width: 576px) {
        max-width: 100%;
        overflow: hidden;
      }
    }

    @keyframes scrollText {
      0% {
        transform: translateX(-80%);
      }

      100% {
        transform: translateX(calc(120% - 30rem));
      }
    }

    &-imageBox {
      @media (max-width: 576px) {
        // width: 25%;
        // padding: 0.75rem 1.35rem;
        // gap: 0;
        // max-width: 13rem;
        // width: calc(100% - 3.2rem) ;
      }
    }

    &-price {
      font-size: 2.4rem;
      font-family: "SatoshiBold";

      @media (max-width: 112rem) {
        font-size: 2rem;
      }
    }

    &-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media (max-width: 576px) {
        max-width: 40%;
        font-size: 1.6rem;
        overflow: hidden;
        white-space: nowrap;
        text-emphasis: ellipsis;
      }
    }

    &-actionBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      max-width: 12.6rem;
      width: 100%;
      margin-right: 1.4rem;
    }

    // &-desc {}
  }
}

.cheque {
  width: 43%;
  padding: 2rem 2.4rem;
  border: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
  border-radius: 2rem;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;

  @media (max-width: 890px) {
    // width: 100%;
    width: auto;
  }

  @media (max-width: 490px) {
    // width: 100%;
    padding: 2rem 2rem;
    width: auto;
  }

  &-header {
    font-size: 2.4rem;
    font-family: "SatoshiBold";

    @media (max-width: 490px) {
      font-size: 2rem;
    }
  }

  &-total {
    &-value {
      font-family: "SatoshiBold";
    }
  }

  &-calculations {
    &-wrapper {
      font-size: 2rem;
      display: flex;
      justify-content: space-between;
    }

    &-totalCost {
      &-value {
        font-family: "SatoshiBold";

        @media (max-width: 490px) {
          font-size: 1.6rem;
        }

        &>span {
          color: #ff3333;
        }
      }

      &-text {
        @media (max-width: 490px) {
          font-size: 1.6rem;
        }

        color: rgba($color: #000000, $alpha: 0.6);
      }

      &:last-child {
        border-bottom: 0.1rem solid rgba($color: #000000, $alpha: 0.1);
      }

      padding-bottom: 2rem;
    }
  }

  &-finish {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @media (max-width: 490px) {
      flex-direction: column;
      gap: 1.6rem;
    }
  }

  &-promo {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    font-size: 1.6rem;
    gap: 1.2rem;

    @media (max-width: 1120px) {
      flex-direction: column;
      gap: 2.4rem;
    }

    @media (max-width: 890px) {
      flex-direction: row;
      gap: 1.2rem;
      height: 4.8rem;
      // align-items: stretch;
    }

    @media (max-width: 390px) {
      flex-direction: column !important;
      height: unset;
    }

    &-box {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      border-radius: 6.2rem;
      padding: 1.2rem 1.6rem;
      background-color: #f0f0f0;
      width: 100%;

      @media (max-width: 112rem) {
        padding: 1.2rem 0;
      }

      @media (max-width: 890px) {
        padding: 1.4rem 0;
      }

      &-img {
        @media (max-width: 112rem) {
          margin-left: 1.6rem;
        }
        @media (max-width: 490px) {
          margin-left: 1rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &-apply {
        padding: 1.3rem 3.85rem;
        background-color: #000;
        border-radius: 6.2rem;
        color: #fff;
        vertical-align: middle;
        cursor: pointer;

        @media (max-width: 112rem) {
          width: 100%;
          text-align: center;
          padding: 1.3rem 0;
        }

        @media (max-width: 890px) {
          padding: 1.45rem 0;
          // vertical-align: middle;
          width: 35%;
        }

        @media (max-width: 490px) {
          font-size: 1.4rem;
          width: 100%;
        }
      }

      overflow: hidden;

      &-input {
        font-size: 1.6rem;
        font-family: "SatoshiRegular";
        background-color: #f0f0f0;
        outline: none;
        border: none;
        color: rgba($color: #000000, $alpha: 0.4);

        @media (max-width: 490px) {
          font-size: 1.4rem;
        }
      }
    }
  }

  &-checkout {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1.2rem;
    align-items: center;
    padding: 1.8rem 0;
    background-color: #000;
    border-radius: 6.2rem;
    color: #fff;
    font-size: 1.6rem;
    font-family: "SatoshiMedium";
    cursor: pointer;

    @media (max-width: 490px) {
      padding: 1.7rem 0;
    }
  }
}
</style>
