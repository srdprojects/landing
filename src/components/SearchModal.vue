<template>
    <div class="modal-overlay" v-if="isInputVisible" @click="closeInputModal">
        <div class="modal-content" @click.stop >
            <div class="close-btn" @click="closeInputModal">
                <img src="../assets/img/Krest.svg" class="close-btn-img">
            </div>
            <input type="text" v-model="searchQuery" placeholder="Search for clothes..." @input="filterGoods" />
            <ul>
                <li @click="redirectTo(item)" v-for="(item, index) in filteredProducts" :key="index">
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
    isInputVisible: {
        type: Boolean,
        required: true,
    },
});

onMounted(() => {
    filteredProducts.value = JSON.parse(localStorage.getItem('filteredProducts'))
    if(filteredProducts.value > 0){
        filteredProducts.value.forEach(element => {
            goods.value.push({
                title: element.title,
                id: element.product_id
            })
        });
    }
})

function redirectTo(el) {
    router.push(`/product/${el.product_id}`)
    closeInputModal()
}

const emit = defineEmits(['close']);

const closeInputModal = () => {
    emit('close');
};

const searchQuery = ref('');

const goods = ref([]);
const filteredGoods = ref(goods.value);

const filteredProducts = ref([])

const filterGoods = () => {
    console.log(filteredGoods.value);
    filteredGoods.value = searchQuery.value
        ? goods.value.filter(item => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        : goods.value;
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    font-family: 'SatoshiRegular';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    // padding: 0 2rem;
}

.modal-content {
    position: relative;
    background: #fff;
    padding: 2rem;
    border-radius: 2rem;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.2);
    max-width: 40rem;
    max-height: 40rem;
    width: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 490px) {
        max-width: 34rem;
        max-height: 38rem;
    }

    @media (max-width: 390px) {
        max-height: 25rem;
        max-width: 20rem;
    }
}

.close-btn {
    position: absolute;
    padding: 1rem;
    top: -8rem;
    right: -1rem;
    z-index: 90;
    background: #fff;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media (max-width:510px) {
        width: 2.5rem ;
        height: 2.5rem;
        top: -5rem;
        right: 0;
        padding: 0.6rem;
    }
    
    @media (max-width:390px) {
        width: 2.5rem ;
        height: 2.5rem;
        padding: 0.6rem;
        top: -5rem;
        right: 0;
    }
}

input {
    width: calc(100% - 2rem);
    padding: 1rem;
    border: 0.1rem solid #ddd;
    border-radius: 0.6rem;
    margin-top: 1rem;
    font-size: 1.6rem;
    outline: none;
    color: rgba(0, 0, 0, 0.8);
}

ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 20rem;
    gap: 0.5rem;

    li {
        line-height: 1;
        padding: 1rem 0.8rem;
        text-overflow: ellipsis;
        font-size: 1.6rem;
        cursor: pointer;
        white-space: nowrap;
        // overflow-y: ;: hidden;
        display: flex;
        align-items: start;
        height: 1rem !important;
        transition: background 0.3s ease;
        border-radius: 1rem;
        color: rgba(0, 0, 0, 0.6);

        &:hover {
            color: rgba(0, 0, 0, 1);
            background: rgba(0, 0, 0, 0.05);
        }

        @media (max-width:490px) {
            font-size: 1.4rem;
        }
    }

}
</style>