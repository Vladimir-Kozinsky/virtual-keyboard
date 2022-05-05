import { getData } from "../keyboard";

export const updateKeyboard = (isCapsLock) => {
    let btns = Array.from(document.querySelectorAll(".btn"));
    btns.map((btn) => {
        if (isCapsLock && btn.id[0] === "K" && btn.id[1] === "e") {
            btn.textContent = btn.innerHTML.toUpperCase();
        } else if (!isCapsLock && btn.id[0] === "K" && btn.id[1] === "e") {
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
            btn.textContent = item.key;
        });
    });
};

const Row = (keys) => {
    let row = document.createElement("div");
    row.className = "row";
    keys.map((btn) => {
        let button = document.createElement("span");
        button.className = "btn";
        button.id = btn.id;
        let btnClass = btn.id;
        button.classList.add(btnClass);
        button.textContent = btn.key;
        row.append(button);
    });
    return row;
};

export default Row;