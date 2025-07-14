import { createRouter, createWebHistory } from 'vue-router'
const Product = ()=> import('@/pages/Product.vue')
const Cart = ()=> import('@/pages/Busket.vue')
const NotFound = ()=> import('@/pages/NotFoundPage.vue')
const Categories = ()=> import('@/pages/ClothStyles.vue')
const HomePage = () => import("@/pages/HomePage.vue");
const Category = () => import("@/pages/Category.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      components: {
        default: HomePage,
        Banner: () => import("@/components/Banner.vue")
      }
    },
    {
      path: '/category/:style',
      components: {
        default: Category,
        // Banner: () => import("@/components/Banner.vue")
      }
    },
    {
      path: '/category',
      components: {
        default: Categories,
        Banner: () => import("@/components/Banner.vue")
      }
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/product/:id',
      component: Product,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      const checkElement = setInterval(() => {
        const element = document.getElementById('content-main');
        if (element) {
          clearInterval(checkElement);
          resolve({ el: '#content-main', behavior: 'smooth' });
        }
      }, 100); 
  
      setTimeout(() => {
        clearInterval(checkElement);
        resolve({ });
      }, 3000); 
    });
  }
})

export default router
