<template>
    <div class="sign-in-sign-up-page" @mousemove="updateShadow" @mouseleave="resetShadow"
        :style="{ boxShadow: boxShadow }">
        <div class="tabs">
            <button class="tab-button" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">
                Login
            </button>
            <button class="tab-button" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">
                Register
            </button>
        </div>
        <div v-if="activeTab === 'login'" class="tab-content">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <input type="text" placeholder="Email or Phone Number" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
        <div v-if="activeTab === 'register'" class="tab-content">
            <h2>Register</h2>
            <form @submit.prevent="handleRegister">
                <input type="text" placeholder="Email or Phone Number" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
const activeTab = 'login'
</script>

<style lang="scss" scoped>
.sign-in-sign-up-page {
    max-width: 40rem;
    font-family: 'SatoshiRegular';
    margin: 5rem auto;
    padding: 2rem;
    border: 0.1rem dotted #000;
    background-color: #fefefe;
    border-radius: 0.8rem;
    transition: box-shadow 0s; // Instant transition

    &:hover {
        box-shadow: #898989 2rem 2rem; // Optional hover effect
    }

    .tabs {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    }

    .tab-button {
        background-color: #f1f1f1;
        border: none;
        padding: 1rem;
        cursor: pointer;
        font-size: 1.8rem;
        flex: 1;
        transition: background-color 500ms;

        &.active {
            background-color: #ccc;
        }
    }

    .tab-content {
        font-size: 1.8rem;
        display: block;

        h2 {
            margin-bottom: 1.5rem;
        }

        input {
            font-size: 1.6rem;
            width: 100%;
            padding: 1rem;
            margin-bottom: 1rem;
            border: 0.2rem dotted rgba(#000000, 0.3);
            border-radius: 0.4rem;
            outline: none;
        }

        button {
            width: 100%;
            padding: 1rem;
            background-color: #000;
            font-size: 1.8rem;
            color: white;
            border: none;
            border-radius: 0.4rem;
            cursor: pointer;
            transition: background-color 300ms;

            &:hover {
                background-color: #303942;
            }
        }
    }
}
</style>