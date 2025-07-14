<template>
  <div class="subscribe">
    <h2 class="subscribe-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
    <label for="email" class="subscribe-label">
      <div class="subscribe-label-wrapper">
        <img src="../../assets/img/EmailSubscribe.svg" alt="" class="subscribe-label-input-img">
        <input class="subscribe-input" type="email" name="email" placeholder="Enter your email address" />
      </div>
      <button class="subscribe-button">Subscribe to Newsletter</button>
    </label>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.subscribe {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;
  background: #000;
  border-radius: 2rem;
  margin-top: -20rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
  
  &-label-wrapper {
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    padding: 1.2rem 2rem;
    border-radius: 5rem;
    gap: 1.2rem;
    @media (max-width: 1340px) {
      max-width: unset !important;
      width: unset !important;
      justify-content: stretch;
    }
  }
  
  @media (max-width: 480px) {
    padding: 3rem 2rem;
  }
  
  &-title {
    color: #fff;
    font-family: "IntegralCF1";
    font-size: 4rem;
    font-weight: 700;
    // stroke-linejoin: 130%;
    
    
    @media (max-width: 768px) {
      font-size: 3.2rem;
    }
    @media (max-width: 390px) {
      font-size: 2.5rem;
    }
  }
  
  &-label {
    row-gap: 1rem;
    display: flex;
    width: 100%;
    gap: 2rem;
    
    @media (max-width: 1340px) {
      flex-direction: column;
      max-width: 100%;
    }

  }
  
  &-input {
    font-family: "SatoshiRegular";
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 100%;
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
  }
  
  &-button {
    font-family: "SatoshiRegular";
    padding: 1.2rem 0;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 100%;
    border-radius: 5rem;
    border: none;
    background: #fff;
    color: #000;
    max-width: 50%;
    width: 100%;
    cursor: pointer;
    @media (max-width: 1100px) {
      max-width: 100%;
    }
    @media (max-width: 1340px) {
      max-width: 100%;
    }
  }
}
</style>