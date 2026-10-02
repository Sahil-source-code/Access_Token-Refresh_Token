import Profile from '../features/auth/pages/Profile'
import Register from '../features/auth/pages/Register'
import {createBrowserRouter} from 'react-router'
 const routes=createBrowserRouter([
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"</profile>",
        element:<Profile/>
    }

 ])
 export default routes