import { createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
// import homeLayout from "@/layouts/DefaultLayout.vue"
import homeView from "@/views/index.vue";
import MessageView from "@/views/Message.vue";
import ProfileView from "@/views/Profile.vue";
import AuthView from "@/views/auth.vue";

const routes: RouteRecordRaw[]= [
    {
        path: "/auth",
        name: "Auth",
        component: AuthView,
    },
    {
        path: "/",
        name: "Home",
        component: homeView,
    },
    {
        path: "/:username/",
        name: "Messages",
        component: MessageView
    },
    {
        path: "/profile/:username",
        name: "Profile",
        component: ProfileView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _from, next) => {
    const logged = localStorage.getItem("jwt_re");
    if (to.name == 'Home' && !logged) {
        next({ name: "Auth" });
    }
    if (to.name == 'Auth' && logged) {
        next({ name: "Home" })
    }
    next();
})

export default router;