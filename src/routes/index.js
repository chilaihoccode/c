import Home from "~/pages/home";
import News from "~/pages/news";
import About from "~/pages/about";
import Login from "~/pages/Login/login";
import NotFound from "~/pages/404NotFound";

const publicRoutes = [
    { path: '/about', component : About },
    { path : '/news', component : News },
    { path : '/login', component : Login  },
    { path : '/', component : Home},
    { path : '*', component : NotFound }
]

const privateRoutes = []

export { publicRoutes,privateRoutes }