/**
 * Treehouse Techdegree:
 * FSJS Project 3 - Interactive Form
 */


/**
 * When the page first loads, the name field should have the 
 * focus state by default & other job role should be hidden
 */
const userName = document.querySelector("#name");
const jobRole = document.querySelector("#title");
const otherJobRole = document.querySelector("#other-job-role");

window.onload = function() {
    userName.focus();
    otherJobRole.style.display = "none";
}


/**
 * Event listener to handle Job Role section. If user selects "other",
 * "other job role" text field will display. Otherwise it will remain hidden. 
 */
jobRole.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
})


/**
 * Event listener to handle T-Shirt section. User won't be able to see or choose 
 * a color option until they have chosen a design
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
 * Event listener to handle Activities section. Based on selected activities,
 * "Total: $" paragraph section will update to reflect the total cost 
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
 * Add event listener to handle Payment Section. Credit card payment option 
 * should be selected by default. When user selects a diff payment option, the 
 * form should update to display only the chosen payment method section.
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

/**
 * Form validation: Add event listener to handle when form is submitted. Users shouldn't 
 * be able to submit a form without the required information, or invalid information.
 */
const form = document.querySelector("form");
const email = document.querySelector("#email");
const ccNumber = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");

// helper functions to validate user inputs
const isValidName = () => /^[\S\s]+[\S]+$/i.test(userName.value);
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
const isValidCardNum = () => /^\d{13,16}$/i.test(ccNumber.value);
const isValidZip = () => /^\d{5}$/i.test(zip.value);
const isValidCVV = () => /^\d{3}$/i.test(cvv.value);
const isValidTotal = () => {return total > 0};

form.addEventListener("submit", (e) => {
    const validator = (inputElement, validationFunction) => {
        if (!validationFunction()) {
            e.preventDefault();
            inputElement.parentElement.classList.add("error-border", "not-valid");
            inputElement.parentElement.classList.remove("valid");
            inputElement.nextElementSibling.style.display = "block";  
        } else {
            inputElement.parentElement.classList.add("valid");
            inputElement.parentElement.classList.remove("error-border", "not-valid");
            inputElement.nextElementSibling.style.display = "none";  
        }
    };
    validator(userName, isValidName);
    validator(email, isValidEmail);
    validator(ccNumber, isValidCardNum);
    validator(zip, isValidZip);
    validator(cvv, isValidCVV);
    validator(activitiesTotal, isValidTotal);
});


// Accessibility: Add visible focus states to checkboxes
const checkboxes = document.querySelectorAll("input[type='checkbox']");

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("focus", () => {
        checkboxes[i].closest("label").classList.add("focus");
    });

    checkboxes[i].addEventListener("blur", () => {
        checkboxes[i].closest("label").classList.remove("focus");
    });
};