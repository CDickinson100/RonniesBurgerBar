import React, {useState} from 'react';
import {Header} from "./components/header/Header";
import {BrowserRouter} from "react-router-dom";
import {Sidebar} from "./components/sidebar/Sidebar";

export default function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <BrowserRouter>
            <Header toggleSidebar={() => setSidebarVisible(!sidebarVisible)}/>
            <Sidebar sidebarVisible={sidebarVisible}/>
        </BrowserRouter>
    );
}