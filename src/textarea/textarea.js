const Textarea = () => {
    let textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.setAttribute("rows", "50");
    textarea.setAttribute("cols", "50");
   // textarea.setAttribute("readonly", "true");
    return textarea;
};

export default Textarea;