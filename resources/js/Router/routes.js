const routes =[
    {
        path:'/',
        component:()=>import('../Pages/Gallery/List.vue'),
        name:'list'
    },
    {
        path:'/home',
        component:()=>import('../Pages/Home.vue'),
        name:'home'
    },
]

export default routes;