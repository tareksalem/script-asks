//function to check the username and email
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

validationFor(document.querySelector("#login-form"), [document.querySelector("#login-form input[name=email]"), document.querySelector("#login-form input[name=password]")], "يجب ادخل اسم المستخدم وكلمة المرور");

