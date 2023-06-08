import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/netflix",
        component : () => import('../pages/NetflixPage.vue'),
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/movie",
        component: () => import('../pages/MoviePage.vue'),
        redirect : '/movielanding',
        children: [
            {
                path: "/movielanding",
                component : () => import('../pages/MovieLandingPage.vue')
            },
             {
                path: "/movielibrary",
                component : () => import('../pages/MovieLibraryPage.vue')
            }
        ]
    },
    {
        path : "/tv",
        component: () => import('../pages/TVPage.vue'),
        redirect : '/tvlanding',
        children: [
            {
                path: "/tvlanding",
                component : () => import('../pages/TVLandingPage.vue')
            },
             {
                path: "/tvlibrary",
                component : () => import('../pages/TVLibraryPage.vue')
            }
        ]
    },
    {
        path : "/comic",
        component: () => import('../pages/ComicPage.vue'),
        redirect : '/comiclanding',
        children: [
            {
                path: "/comiclanding",
                component : () => import('../pages/ComicLandingPage.vue')
            },
             {
                path: "/comiclibrary",
                component : () => import('../pages/ComicLibraryPage.vue')
            }
        ]
    },
    {
        path : "/tvshow",
        component: () => import('../pages/TvShowPage.vue'),
        redirect : '/tvshowlanding',
        children: [
            {
                path: "/tvshowlanding",
                component : () => import('../pages/TVShowLandingPage.vue')
            },
             {
                path: "/tvshowlibrary",
                component : () => import('../pages/TVShowLibraryPage.vue')
            }
        ]
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
    {
        path : "/",
        component : () => import('../pages/Home.vue'),
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;