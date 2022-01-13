const routes =[
    // {
    //     path:'/',
    //     component:()=>import('../Pages/Gallery/List.vue'),
    //     name:'list'
    // },
    {
        path:'/home',
        component:()=>import('../Pages/Home.vue'),
        name:'home'
    },
    {
        path:'/',
        component:()=>import('../Pages/Agora/main'),
        name: 'list'
    }
]

export default routes;