<template>
  <div class="modal" v-if="isVisible">
    <div class="sign-in-sign-up-page">
      <button class="close" @click="closeModal">
        <img src="../assets/img/Krest.svg" alt="" />
      </button>
      <div
        class="tabs"
        v-if="activeTab === 'login' || activeTab === 'register'"
      >
        <button
          class="tab-button"
          :class="{ active: activeTab === 'login' }"
          @click="() => (activeTab = 'login')"
        >
          Login
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'register' }"
          @click="() => (activeTab = 'register')"
        >
          Register
        </button>
      </div>

      <div v-if="activeTab === 'login'" class="tab-content">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input
            type="text"
            placeholder="Enter your email"
            v-model="auth.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="auth.password"
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div v-if="activeTab === 'register'" class="tab-content">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <input type="text" placeholder="Username" v-model="user.username" />
          <input
            type="text"
            placeholder="Enter your email"
            v-model="user.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="user.password"
          />
          <button type="submit">Register</button>
        </form>
      </div>

      <div v-if="activeTab === 'enter'" class="otp-modal">
        <h3>Enter OTP</h3>
        <div class="otp-inputs">
          <input
            v-for="(digit, index) in digits"
            :key="index"
            v-model="digits[index]"
            maxlength="1"
            inputmode="numeric"
            @input="onInput(index)"
            @keydown.backspace="onBackspace(index)"
          />
        </div>
        <p>{{ formattedTime }}</p>
        <button @click="verifyOtp" :disabled="!isValidOtp">Verify OTP</button>
        <button @click="sendOtp" :disabled="isSended">Resend OTP</button>
      </div>

      <div v-if="activeTab === 'send'" class="tab-content">
        <h2>Send OTP</h2>
        <form @submit.prevent="sendOtp">
          <button type="submit">Send code</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
const USER_FETCH_HOST = "http://3.125.46.191";

function apiDataFetch(url, options) {
  const path = USER_FETCH_HOST + url;
  // const path = url;
  return fetch(path, options);
}

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const user = ref({
  username: "",
  email: "",
  password: "",
  roleId: "6a774c83-36de-47d2-85ae-70cbf4e3b7e7",
  image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
});

const auth = ref({
  email: "",
  password: "",
});

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const activeTab = ref("login");
const isSended = ref(false);
const digits = ref(["", "", "", "", "", ""]);
const isValidOtp = computed(() => digits.value.every((d) => /^\d$/.test(d)));
const totalSeconds = ref(180);
let interval;

const formattedTime = computed(() => {
  const minutes = Math.floor(totalSeconds.value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  totalSeconds.value = 180;

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
    } else {
      clearInterval(interval);
      isSended.value = false;
    }
  }, 1000);
};

function onInput(index) {
  if (digits.value[index] && index < digits.value.length - 1) {
    nextTick(() => {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`);
      nextInput?.focus();
    });
  }
}

function onBackspace(index) {
  if (!digits.value[index] && index > 0) {
    nextTick(() => {
      const prevInput = document.querySelector(`input:nth-child(${index})`);
      prevInput?.focus();
    });
  }
}

const sendOtp = async () => {
  digits.value = ["", "", "", "", "", ""];
  if (isSended.value) {
    alert("OTP already sent!");
    return;
  }
  const response = await apiDataFetch("/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: user.value.email, subject: "OTP Verification" }),
  });

  const result = await response.json();
  if (result.otp) {
    alert(result.message);
    activeTab.value = "enter";
    isSended.value = true;
    startTimer();
  } else{
    return alert("Failed to send OTP!");
  }
};

const verifyOtp = async () => {
  if (!isValidOtp.value) {
    alert("Please enter 6 valid digits!");
    return;
  }

  const otp = digits.value.join("");
  const response = await apiDataFetch("/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.value.email, otp_code: otp }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
    activeTab.value = "login";
    digits.value = ["", "", "", "", "", ""];
  } else {
    alert("OTP verification failed!");
    digits.value = ["", "", "", "", "", ""];
  }
};

const checkUserAlive = async (token) => {
  const response = await apiDataFetch(`/users/get-my-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) return true;
  else return false;
};

const handleLogin = async () => {
  if (!auth.value.email || !auth.value.password) {
    return alert("Заполните все поля!");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth.value),
    };

    await apiDataFetch(`/auth/sign-in`, options)
      .then((response) => response.json())
      .then(async (response) => {
        const data = response;
        if (!response.error) {
          localStorage.setItem("Authorization", data.accessToken);
          const isAlive = await checkUserAlive(data.accessToken);
          if (!isAlive) {
            localStorage.removeItem("Authorization");
            return alert("Вы неправильно ввели логин или пароль!");
          }
          if (response.message) {
            await alert(response.message);
            closeModal();
          }
        }
      });

    setActivityMiddleware(`Вошел в систему`, "user_signed_up");
  }
};

const handleRegister = async () => {
  if (!user.value.username || !user.value.email || !user.value.password) {
    return alert("Заполните все поля!");
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.value),
    };
    const res = await apiDataFetch(`/auth/sign-up`, options);
    const data = await res.json();
    if (!res.ok) {
      return alert(data.message);
    }
    await alert(data.message);
    activeTab.value = "send";
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  // padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.sign-in-sign-up-page {
  max-width: 40rem;
  font-family: "SatoshiRegular";
  padding: 4rem;
  background-color: #fefefe;
  border-radius: 2rem;
  position: relative;
  margin: 0 2rem;
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
    transition: 300ms;

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
      border: 0.1rem solid rgba(0, 0, 0, 0.3);
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
      border-radius: 5rem;
      cursor: pointer;
      transition: 300ms;

      &:hover {
        background-color: #303942;
      }
    }
  }
}

.close {
  position: absolute;
  top: -4rem;
  right: -5rem;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  background-color: #fff;
  padding: 1rem;
  border: none;

  @media (max-width: 580px) {
    top: -5rem;
    right: 0;
  }
}
</style>
