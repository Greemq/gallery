const routes =[
    {
        path:'/list',
        component:()=>import('../Pages/Gallery/List.vue'),
        name:'list'
    },
    {
        path:'/home',
        component:()=>import('../Pages/Home.vue'),
        name:'home'
    },
    {
        path:'/',
        component:()=>import('../Pages/Agora/Try1'),
        name: 'Agora'
    }
]

export default routes;