import Keyboard from "./keyboard/keyboard";
import "./styles/index.scss";

import Textarea from "./textarea/textarea";
import Title from "./title/title";

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
console.log(document);