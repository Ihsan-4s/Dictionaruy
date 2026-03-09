import { createBrowserRouter } from "react-router-dom";
import Templete from "../Templete";
import App from "../App";
import DetailWord from "../pages/DetailWord";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Templete />,
        children:[
            {
                path : "/",
                element : <App />
            },
            {
                path : "/word/:word",
                element: <DetailWord />
            }
        ]
    }
])