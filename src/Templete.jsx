import NavbarComp from "./components/NavbarComp";
import { Outlet } from "react-router-dom";

export default function Templete() {
    return (
        <>
            <NavbarComp />
            <Outlet />
        </>
    )
}