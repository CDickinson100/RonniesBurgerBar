import React, {useState} from 'react';
import {Header} from "./components/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Sidebar} from "./components/sidebar/Sidebar";
import {Login} from "./components/login/Login";

export default function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <BrowserRouter>
            <Header toggleSidebar={() => setSidebarVisible(!sidebarVisible)}/>
            <Sidebar sidebarVisible={sidebarVisible}/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}