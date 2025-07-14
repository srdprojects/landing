<template>
    <ul class="breadcrumb">
        <li class="breadcrumb-link"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-link">{{ ifCart() }}</li>
    </ul>
</template>

<script setup>
    import {useRouter} from 'vue-router'
    const router = useRouter()
    
    function ifCart (){
        if(Object.keys(router.currentRoute.value.params).length == 0){
            return router.currentRoute.value.path.slice(1)
        }
        else{
           return router.currentRoute.value.params.style
        }
    }
</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    list-style: none;
    padding: 1rem 0;
    font-family: "SatoshiRegular";
    font-size: 1.6rem;

    @media (max-width: 490px) {
        font-size: 1.4rem;
        padding: 2rem 0 0.8rem 0;
    }

    &-link {
        display: flex;
        align-items: center;

        & a {
            text-transform: capitalize;
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
</style>