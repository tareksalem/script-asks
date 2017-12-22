//fucntion to validate the form

function validationFor(form, fields, message) {
    form.addEventListener("submit", function (event) {
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].value == "") {
                event.preventDefault();
                let alarm = document.querySelector(".alarm");
                alarm.textContent = message;
                alarm.style.visibility = "visible";

            }
        }
    });
}





