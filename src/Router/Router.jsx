import { createBrowserRouter } from "react-router";
import Roots from "../Root/Roots";
import Home from "../Pages/Home/Home";
import AllProperty from "../Pages/AllProperty/AllProperty";

export const router  = createBrowserRouter([
    {
        path : '/' ,
        Component : Roots,
        children : [
            {index : true , Component : Home},
            {path : '/allproperty',Component:AllProperty}
        ]
    }
]) ;