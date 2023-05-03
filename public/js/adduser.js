const keys = ["first", "last", "email", "company", "country"];
let curr_user;


form.addEventListener("submit", event => {
    let rawdata = new FormData(form);
    let data = {};

    rawdata.forEach((value, key) => {
        // There is an error on given information
        if (value.match(user_checker[key]) == null) {
            document.getElementById("error").innerHTML = "Vérifiez les informations";
            event.preventDefault();
            return;
        }

        data[key] = value;
    });

    // Delete form
    for (let input of document.querySelectorAll("form input:not([type='submit'])")) {
        input.value = "";
    }

    event.preventDefault();
    return add_user(data);
});