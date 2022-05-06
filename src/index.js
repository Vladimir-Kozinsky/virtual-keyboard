import Keyboard from "./keyboard/keyboard";
import { shiftPush, updateKeyboard } from "./keyboard/row/row";
import "./styles/index.scss";
import Textarea from "./textarea/textarea";
import Title from "./title/title";

let isCapsLock = false;
let lang = "EN";
let isShift = false;
let btnsArr = [];

window.onload = function () {
    let localStLang = localStorage.getItem("lang");

    if (localStLang) {
        lang = localStLang;
        console.log(lang);
    }
};

window.onload();


async function createContainer() {
    let div = document.createElement("div");
    div.className = "container";
    div.append(Title()); // add title
    div.append(Textarea()); // add textarea
    let keyboard = await Keyboard(lang);
    div.append(keyboard);
    let par1 = document.createElement("p");
    let par2 = document.createElement("p");
    par1.className = "discription";
    par2.className = "language";
    par1.textContent = "Клавиатура создана в операционной системе Windows";
    par2.textContent = "Для переключения языка комбинация: левыe Shift + Alt";
    div.append(par1);
    div.append(par2);
    document.body.append(div); // add keyboard
    btnsArr = Array.from(document.querySelectorAll(".btn"));
    return;
}

createContainer();

document.addEventListener("keydown", function (event) {
    if (event.detail.code) {
        event.code = event.detail.code;
    }

    if (event.detail.key) {
        event.key = event.detail.key;
    }


    const textarea = document.querySelector(".textarea");
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);
    if (curBtn && curBtn.id[0] === "K" && curBtn.id[1] === "e"
        || curBtn.id[0] === "D" && curBtn.id[1] === "i"
        || curBtn.id === "Backquote" || curBtn.id === "Minus" || curBtn.id === "Equal"
        || curBtn.id === "BracketLeft" || curBtn.id === "BracketRight"
        || curBtn.id === "Backslash" || curBtn.id === "Semicolon" || curBtn.id === "Quote"
        || curBtn.id === "Comma" || curBtn.id === "Period" || curBtn.id === "Slash") {
        event.preventDefault();
        textarea.value += curBtn.textContent;
    }

    if (curBtn.id === "CapsLock") {
        if (!isCapsLock) {
            isCapsLock = true;
            curBtn.classList.add("active");
            updateKeyboard(isCapsLock);
        } else {
            isCapsLock = false;
            curBtn.classList.remove("active");
            updateKeyboard(isCapsLock);
        }
    } else {
        curBtn.classList.add("active");
    }

    if (curBtn.id === "ShiftLeft" || curBtn.id === "ShiftRight") {
        curBtn.classList.add("active");
        isCapsLock ? shiftPush(false, lang) : shiftPush(true, lang);

        isShift = true;
    }

    if (isShift && curBtn.id === "AltLeft") {
        if (lang === "EN") {
            lang = "RU";
        } else {
            lang = "EN";
        }
    }
});

document.addEventListener("keyup", (event) => {
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);
    if (curBtn.id === "ShiftLeft" || curBtn.id === "ShiftRight") {
        curBtn.classList.remove("active");
        isCapsLock ? shiftPush(true, lang) : shiftPush(false, lang);
        isShift = false;
    }
    if (curBtn.id !== "CapsLock") {
        curBtn.classList.remove("active");
    }
});



setTimeout(() => {
    let textarea = document.querySelector(".textarea");
            textarea.addEventListener("click", ()=> {
                console.log(textarea);
            });
    btnsArr.map((btn) => {
        btn.addEventListener("click", () => {
            let textarea = document.querySelector(".textarea");
            
            console.log(textarea);
            textarea.checked = "true";
            if (btn && btn.id[0] === "K" && btn.id[1] === "e"
                || btn.id[0] === "D" && btn.id[1] === "i"
                || btn.id === "Backquote" || btn.id === "Minus" || btn.id === "Equal"
                || btn.id === "BracketLeft" || btn.id === "BracketRight"
                || btn.id === "Backslash" || btn.id === "Semicolon" || btn.id === "Quote"
                || btn.id === "Comma" || btn.id === "Period" || btn.id === "Slash") {
                textarea.value += btn.textContent;
            } else if (btn.id === "Backspace") {
                textarea.value = textarea.value.slice(0, textarea.value.length - 1);
            } else if (btn.id === "Delete") {
                textarea.wrap = "virtual";
                textarea.value = textarea.value.slice(1, textarea.value.length);
            }
        });
    });
}, 1000);


window.onbeforeunload = function () {
    localStorage.setItem("lang", lang);
};



window.onbeforeunload();

