import Row from "./row/row";

const getData = async () => {
    let response = await fetch("/keyboard/keyboard.json");
    let payload = await response.json();
    return payload.keyboard;
};


const Keyboard = async () => {
    let keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    let rows = await getData();
    rows.map((row) => {
        keyboard.append(Row(row.keys));
    });
    console.log(keyboard);
    return keyboard;
};

export default Keyboard;