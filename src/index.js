import Keyboard from "./keyboard/keyboard";
import { shiftPush, updateKeyboard } from "./keyboard/row/row";
import "./styles/index.scss";
import Textarea from "./textarea/textarea";
import Title from "./title/title";
import svg from "../src/img/keyb.svg";

let isCapsLock = false;
let lang = "EN";
let isShift = false;
let btnsArr = [];

window.onload = function () {
    let localStLang = localStorage.getItem("lang");
    if (localStLang) {
        lang = localStLang;
    }
};

window.onload();

const addIcon = () => {
    let head = document.querySelector("head");
    let link = document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("type", "image/x-icon");
    link.setAttribute("href", svg);
    head.append(link); // add favicon
};

async function createContainer() {
    addIcon();
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
    let curPosition = textarea.selectionStart;
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);
    if (curBtn && curBtn.id[0] === "K" && curBtn.id[1] === "e"
        || curBtn && curBtn.id[0] === "D" && curBtn.id[1] === "i"
        || curBtn && curBtn.id === "Backquote" || curBtn && curBtn.id === "Minus" || curBtn && curBtn.id === "Equal"
        || curBtn && curBtn.id === "BracketLeft" || curBtn && curBtn.id === "BracketRight"
        || curBtn && curBtn.id === "Backslash" || curBtn && curBtn.id === "Semicolon" || curBtn && curBtn.id === "Quote"
        || curBtn && curBtn.id === "Comma" || curBtn && curBtn.id === "Period" || curBtn && curBtn.id === "Slash") {
        event.preventDefault();
        if (curPosition === textarea.value.length) {
            textarea.value += curBtn.textContent;
        } else if (curPosition === 0) {
            textarea.value = curBtn.textContent + textarea.value;
            textarea.setSelectionRange(curPosition + 1, curPosition + 1);
        } else if (curPosition > 0 && curPosition < textarea.value.length) {
            textarea.value = textarea.value.slice(0, curPosition) + curBtn.textContent + textarea.value.slice(curPosition, textarea.length);
            textarea.setSelectionRange(curPosition + 1, curPosition + 1);
        }
    }

    if (curBtn && curBtn.id === "CapsLock") {
        if (!isCapsLock) {
            isCapsLock = true;
            curBtn.classList.add("active");
            updateKeyboard(isCapsLock, lang);
        } else {
            isCapsLock = false;
            curBtn.classList.remove("active");
            updateKeyboard(isCapsLock, lang);
        }
    } else {
        if (curBtn) {
            curBtn.classList.add("active");
        }
    }

    if (curBtn && curBtn.id === "ShiftLeft" || curBtn && curBtn.id === "ShiftRight") {
        curBtn.classList.add("active");
        isCapsLock ? shiftPush(false, lang) : shiftPush(true, lang);

        isShift = true;
    }

    if (curBtn && isShift && curBtn.id === "AltLeft") {
        if (lang === "EN") {
            lang = "RU";
        } else {
            lang = "EN";
        }
    }

    if (curBtn && curBtn.id === "Tab") {
        event.preventDefault();
        if (curPosition === textarea.value.length) {
            textarea.value += "\t";
        } else if (curPosition === 0) {
            textarea.value = "\t" + textarea.value;
            textarea.setSelectionRange(curPosition + 1, curPosition + 1);
        } else if (curPosition > 0 && curPosition < textarea.value.length) {
            textarea.value = textarea.value.slice(0, curPosition) + "\t" + textarea.value.slice(curPosition, textarea.length);
            textarea.setSelectionRange(curPosition + 1, curPosition + 1);
        }
    }

});

document.addEventListener("keyup", (event) => {
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);
    if (curBtn && curBtn.id === "ShiftLeft" || curBtn && curBtn.id === "ShiftRight") {
        curBtn.classList.remove("active");
        isCapsLock ? shiftPush(true, lang) : shiftPush(false, lang);
        isShift = false;
    }
    if (curBtn && curBtn.id !== "CapsLock") {
        curBtn.classList.remove("active");
    }
});

setTimeout(() => {
    let textarea = document.querySelector(".textarea");
    textarea.addEventListener("click", () => {
    });
    btnsArr.map((btn) => {
        btn.addEventListener("click", () => {
            let textarea = document.querySelector(".textarea");
            textarea.focus();
            let curPosition = textarea.selectionStart;
            if (btn && btn.id[0] === "K" && btn.id[1] === "e"
                || btn.id[0] === "D" && btn.id[1] === "i"
                || btn.id === "Backquote" || btn.id === "Minus" || btn.id === "Equal"
                || btn.id === "BracketLeft" || btn.id === "BracketRight"
                || btn.id === "Backslash" || btn.id === "Semicolon" || btn.id === "Quote"
                || btn.id === "Comma" || btn.id === "Period" || btn.id === "Slash" || btn.id === "ArrowLeft"
                || btn.id === "ArrowRight" || btn.id === "ArrowUp" || btn.id === "ArrowDown") {

                if (curPosition === textarea.value.length) {
                    textarea.value += btn.textContent;
                } else if (curPosition === 0) {
                    textarea.value = btn.textContent + textarea.value;
                    textarea.setSelectionRange(curPosition + 1, curPosition + 1);
                } else if (curPosition > 0 && curPosition < textarea.value.length) {
                    textarea.value = textarea.value.slice(0, curPosition) + btn.textContent + textarea.value.slice(curPosition, textarea.length);
                    textarea.setSelectionRange(curPosition + 1, curPosition + 1);
                }


            } else if (btn.id === "Backspace") {
                if (curPosition > 0) {
                    textarea.value = textarea.value.slice(0, curPosition - 1) + textarea.value.slice(curPosition, textarea.length);
                    textarea.setSelectionRange(curPosition - 1, curPosition - 1);
                }

            } else if (btn.id === "Delete") {

                textarea.value = textarea.value.slice(0, curPosition) + textarea.value.slice(curPosition + 1, textarea.length);
                textarea.setSelectionRange(curPosition, curPosition);
            } else if (btn.id === "Enter") {
                textarea.value += "\n";
            } else if (btn.id === "CapsLock") {
                if (!isCapsLock) {
                    isCapsLock = true;
                    btn.classList.add("active");
                    updateKeyboard(isCapsLock, lang);
                } else {
                    isCapsLock = false;
                    btn.classList.remove("active");
                    updateKeyboard(isCapsLock, lang);
                }
            } else if (btn.id === "Space") {
                if (curPosition > 0 && curPosition < textarea.value.length) {
                    textarea.value = textarea.value.slice(0, curPosition) + " " + textarea.value.slice(curPosition, textarea.length);
                    textarea.setSelectionRange(curPosition + 1, curPosition + 1);
                }
            } else if (btn.id === "Tab") {

                if (curPosition === textarea.value.length) {
                    textarea.value += "\t";
                } else if (curPosition === 0) {
                    textarea.value = "\t" + textarea.value;
                    textarea.setSelectionRange(curPosition + 1, curPosition + 1);
                } else if (curPosition > 0 && curPosition < textarea.value.length) {
                    textarea.value = textarea.value.slice(0, curPosition) + "\t" + textarea.value.slice(curPosition, textarea.length);
                    textarea.setSelectionRange(curPosition + 1, curPosition + 1);
                }
            }
        });
    });
}, 1000);

window.onbeforeunload = function () {
    localStorage.setItem("lang", lang);
};

window.onbeforeunload();

