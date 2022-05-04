import Row from "./row/row";

export const getData = async () => {
    let response = await fetch("/keyboard/keyboard.json");
    let payload = await response.json();
    return payload;
};


const Keyboard = async () => {
    let keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    let rows = await getData();
    rows.keyboard.map((row) => {
        keyboard.append(Row(row.keys));
    });
    return keyboard;
};

export default Keyboard;