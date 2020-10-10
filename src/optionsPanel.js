class OptionsPanel {
    constructor() {
        this.sidebar = document.getElementById("optionsSidebar");
        this.options = document.getElementById("options");
    }

    addCheckbox(displayName, idName, func, checked = false) {
        let label = document.createElement("label");
        label.className = "checkboxContainer";
        label.id = idName;
        label.innerHTML = displayName;
        label.addEventListener("mousedown", func, false)
        this.options.appendChild(label);
        
        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = checked;
        label.appendChild(input);

        let span = document.createElement("span");
        span.className = "checkmark";
        label.appendChild(span);
    }

    addSlider(displayName, idName, func, min = 1, max = 100, value = 50, step = 1) {
        let div = document.createElement("div");
        div.className = "sliderContainer";
        div.innerHTML = displayName;
        this.options.appendChild(div);
        
        let input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.value = value;    // for some reason, this will always round to the nearest integer (I'll look into a fix at some point)
        input.step = step;
        input.className = "slider";
        input.id = idName;
        div.appendChild(input);

        let content = document.createElement("div");
        content.innerHTML = document.getElementById(idName).value;
        div.appendChild(content);

        input.oninput = function() {
            content.innerHTML = this.value;
            func(this.value);
        }
    }
}
