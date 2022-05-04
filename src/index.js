import Keyboard from "./keyboard/keyboard";
import { shiftPush, updateKeyboard } from "./keyboard/row/row";
import "./styles/index.scss";
import Textarea from "./textarea/textarea";
import Title from "./title/title";

let isCapsLock = false;


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
    const btn = Array.from(document.querySelectorAll(".btn"));
    let curBtn = btn.find((item) => item.id === event.code);

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


    } else if (curBtn.id === "ShiftLeft") {
        curBtn.classList.add("active");
        shiftPush(true);
        document.addEventListener("keyup", () => {
            curBtn.classList.remove("active");
            shiftPush(false);
        });

    } else {
        curBtn.classList.add("active");
        document.addEventListener("keyup", () => {
            curBtn.classList.remove("active");
        });
    }

});

