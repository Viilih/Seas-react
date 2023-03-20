import React from "react";
import style from "./Sidebar.module.scss";
import { slide as Menu } from "react-burger-menu";
import { BsArrowBarRight } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import { Link, Route } from "react-router-dom";

export const styles = {
    bmBurgerButton: {
        position: "fixed",
        width: "36px",
        height: "24px",
        left: "1rem",
        top: "1.3rem",
    },
    bmBurgerBars: {
        height: "4px",
        width: "30px",
        background: "#fff",
    },
    bmBurgerBarsHover: {
        background: "##0084a4",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "#fff",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#0e131f",
        padding: "2.5em 1.5em 0",
        fontSize: "1.5em",
    },
    bmMorphShape: {
        fill: "#373a47",
    },
    bmItemList: {
        color: "#ffffff",
        padding: "0.8em",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    bmItem: {
        display: "flex",
        justifyContent: "center",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.3)",
    },
};

export default function Sidebar() {
    return (
        <>
            <Menu styles={styles} className={style.menu}>
                <a id="home" className="menu-item" href="/">
                    Home
                </a>

                <a id="about" className="menu-item" href="/about">
                    Planos
                </a>

                <div>
                    <a href="/login">
                        <BsArrowBarRight className={style.icon} />
                    </a>
                </div>
            </Menu>
        </>
    );
}
