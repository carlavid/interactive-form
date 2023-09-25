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

/**
 * Activities: "Total: $" paragraph below the "Register for Activities"
 * section should update to reflect the total cost of all the selected
 * activities
 */
const activities = document.querySelector("#activities");
const activitiesTotal = document.querySelector("#activities-cost");
let total = 0;

activities.addEventListener("change", e => {
    const dataCost = +e.target.getAttribute(["data-cost"]);
    
    if (e.target.checked === true) {
        total += dataCost;
    } else {
        total -= dataCost;
    }
    activitiesTotal.innerHTML = `Total: $${total}`;
})

/**
 * Payment Info: Credit card payment option should be selected by default.
 * When user selects a diff payment option, the form should update to display
 * only the chosen payment method section.
 */
const paymentMethod = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");



paypal.hidden = "true";
bitcoin.hidden = "true";
paymentMethod.children[1].setAttribute("selected", true);

paymentMethod.addEventListener("change", e => {
    const value = e.target.value;
    if (value === "paypal") {
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true; 
    } else if (value === "bitcoin") {
        bitcoin.hidden = false; 
        paypal.hidden = true;
        creditCard.hidden = true;
    } else if (value === "credit-card") {
        creditCard.hidden = false;
        bitcoin.hidden = true; 
        paypal.hidden = true;
        
    }
})