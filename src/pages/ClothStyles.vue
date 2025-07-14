<template>
    <div id="content-main" class="category">
        <BreadCrumb></BreadCrumb>
        <h2 class="category-title">Categories</h2>
        <div class="category-style">
            <routerLink v-for="i in categories" :key="i.id" :to="`/category/${i.category_id}`"
                class="category-style-wrapper">
                <h2 class="category-style-name">{{ i.category_name }}</h2>
                <img :src="styles[randomImg()].image" class="category-style-image" alt="" />
            </routerLink>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import casual from '@/assets/img/Casual-new.jpg';
import formal from '@/assets/img/Formal-new.jpg';
import party from '@/assets/img/Party-new.jpg';
import gym from '@/assets/img/Gym-new.jpg';
import BreadCrumb from '@/components/BreadCrumb.vue';
const styles = [
    { id: 1, title: "casual", image: casual },
    { id: 2, title: "formal", image: formal },
    { id: 3, title: "party", image: party },
    { id: 4, title: "gym", image: gym },
];

const randomImg = () => {
    return Math.floor(Math.random() * 3);
}

const props = defineProps({
    title: String,
    description: String,
    image: String,
});

const categories = JSON.parse(localStorage.getItem('categories'))
</script>

<style lang="scss" scoped>
.category {
    max-width: 100%;
    border-radius: 2rem;
    gap: 5rem;
    margin-top: 2rem;
    width: 100%;

    &-title {
        font-size: 5rem;
        font-family: 'IntegralCF1';
        text-align: center;
        margin-bottom: 3rem;

        @media (max-width: 490px) {
            font-size: 3.6rem;
            margin-bottom: 2rem;
        }
    }

    &-style-wrapper {
        position: relative;
        max-width: calc(100% /2 - 6rem);
        width: 100%;
        height: 28rem;
        padding: 2.5rem;
        background: white;
        border-radius: 2rem;
        overflow: hidden;
        cursor: pointer;
        border-radius: 4rem;

        @media (max-width: 490px) {
            max-width: 100%;
            width: 100%;
        }
    }

    &-style {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        gap: 2rem;

        @media (max-width: 490px) {
            // flex-direction: column;
            max-width: 100%;
            width: 100%;
        }

        &-name {
            font-family: 'SatoshiBold', 'Roboto' !important;
            position: absolute;
            z-index: 2;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba($color: #000000, $alpha: 0.5);
            color: #fff;

            font-size: 5rem;
            text-transform: capitalize;
            line-height: 1;

            @media (max-width: 1100px) {
                font-size: 3.6rem;
            }
            @media (max-width: 768px) {
                font-size: 2.4rem;
            }

        }

        &-image {
            position: absolute;
            right: 0;
            z-index: 0;
            top: 0;
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
    }

}
</style>