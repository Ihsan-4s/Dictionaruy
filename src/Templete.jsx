import NavbarComp from "./components/NavbarComp";
import { Outlet } from "react-router-dom";
import './App.css'

export default function Templete() {
    return (
        <>
            <NavbarComp />
            <Outlet />
        </>
    );
}