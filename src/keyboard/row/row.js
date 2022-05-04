const Row = (keys) => {
    let row = document.createElement("div");
    row.className = "row";
    keys.map((btn) => {
        let button = document.createElement("span");
        button.className = "btn";
        let btnClass = btn.id;
        button.classList.add(btnClass);
        button.textContent = btn.key;
        row.append(button);
    });
    return row;
};

export default Row;