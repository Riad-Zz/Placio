import { createBrowserRouter } from "react-router";
import Roots from "../Root/Roots";
import Home from "../Pages/Home/Home";
import AllProperty from "../Pages/AllProperty/AllProperty";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PropertyDetails from "../Components/PropertyDetails/PropertyDetails";
import PrivateRoute from "../Provider/PrivateRoutes/PrivateRoute";
import MyRating from "../Pages/MyRating/MyRating";
import AddProperty from "../Pages/AddProperty/AddProperty";

export const router  = createBrowserRouter([
    {
        path : '/' ,
        Component : Roots,
        children : [
            {index : true , Component : Home},
            {path : '/allproperty',Component:AllProperty},
            {path : '/login' , Component:Login} ,
            {path : '/register' , Component : Register},
            {path : '/details/:id' , element : <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>},
            {path : '/myrating' , element : <PrivateRoute><MyRating></MyRating></PrivateRoute>},
            {path : '/addproperty' , element : <PrivateRoute><AddProperty></AddProperty></PrivateRoute>}
        ]
    }
]) ;