import { getData } from "../keyboard";

export const updateKeyboard = (isCapsLock, lang) => {
    let btns = Array.from(document.querySelectorAll(".btn"));
    btns.map((btn) => {
        if (lang === "EN" ? isCapsLock && btn.id[0] === "K" && btn.id[1] === "e"
            : isCapsLock && btn.id[0] === "K" && btn.id[1] === "e" || isCapsLock && btn.id === "BracketLeft"
            || isCapsLock && btn.id === "BracketRight" || isCapsLock && btn.id === "Semicolon" || isCapsLock && btn.id === "Quote"
            || isCapsLock && btn.id === "Comma" || isCapsLock && btn.id === "Period" || isCapsLock && btn.id === "Backquote"
        ) {
            btn.textContent = btn.innerHTML.toUpperCase();
        } else if (lang === "EN" ? !isCapsLock && btn.id[0] === "K" && btn.id[1] === "e"
            : !isCapsLock && btn.id[0] === "K" && btn.id[1] === "e" || !isCapsLock && btn.id === "BracketLeft"
            || !isCapsLock && btn.id === "BracketRight" || !isCapsLock && btn.id === "Semicolon" || !isCapsLock && btn.id === "Quote"
            || !isCapsLock && btn.id === "Comma" || !isCapsLock && btn.id === "Period" || !isCapsLock && btn.id === "Backquote") {
            btn.textContent = btn.innerHTML.toLowerCase();
        }
    });
};


export const shiftPush = async (isPush, lang) => {
    let keyboard = await getData();
    let data = isPush
        ? lang === "EN"
            ? keyboard.keyboardUpper
            : keyboard.keyboardRuUpper
        : lang === "RU"
            ? keyboard.keyboardRu
            : keyboard.keyboard;
    data.map((row) => {
        row.keys.map((item) => {
            let btn = document.getElementById(item.id);
            if (btn) {
                btn.textContent = item.key;
            }
        });
    });
};

const Row = (keys) => {
    let row = document.createElement("div");
    row.className = "row";
    keys.map((btn) => {
        let btnWrap = document.createElement("div");
        btnWrap.className = "btnWrap";
        let btnWrapClass = `wrap${btn.id.toLowerCase()}`;
        btnWrap.classList.add(btnWrapClass);
        let button = document.createElement("span");
        button.className = "btn";
        button.id = btn.id;
        let btnClass = btn.id.toLowerCase();
        button.classList.add(btnClass);
        button.textContent = btn.key;
        btnWrap.append(button);
        row.append(btnWrap);


    });
    return row;
};

export default Row;