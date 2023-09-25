/**
 * Name Field: When the page first loads, the first text field 
 * should have the focus state by default to prompt the user.
 */
const otherJobRole = document.querySelector("#other-job-role");
const jobRole = document.querySelector("#title");

window.onload = function() {
    document.querySelector("#name").focus();
    otherJobRole.style.display = "none";
}

/**
 * Job Role: If user selects "other", they can enter info into 
 * "other job role" text field. The field should be hidden by default
 * and only be displayed if "other is selected"
 */
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
})

/**
 * T-Shirt: User shouldn't be able to see or choose a color option until 
 * they have chosen a design
 */
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const colorOptions = color.children;

color.disabled = true;

design.addEventListener("change", (e) => {
    color.disabled = false;

    for (let i = 0; i < colorOptions.length; i++) {
        const dataTheme = colorOptions[i].getAttribute(["data-theme"]);
        const value = e.target.value;

        if (value === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].selected = true;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
        }
    }
    
});

