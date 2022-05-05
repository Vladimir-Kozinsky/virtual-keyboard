import Keyboard from "./keyboard/keyboard";
import { shiftPush, updateKeyboard } from "./keyboard/row/row";
import "./styles/index.scss";
import Textarea from "./textarea/textarea";
import Title from "./title/title";

let isCapsLock = false;
let lang = "EN";
let isShift = false;

async function createContainer() {
    let div = document.createElement("div");
    div.className = "container";
    div.append(Title()); // add title
    div.append(Textarea()); // add textarea
    let keyboard = await Keyboard();
    div.append(keyboard);
    document.body.append(div); // add keyboard
    return;
}

createContainer();

document.addEventListener("keydown", function (event) {
    const textarea = document.querySelector(".textarea");
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);


    if (curBtn.id[0] === "K" && curBtn.id[1] === "e"
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
        console.log(lang);
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


