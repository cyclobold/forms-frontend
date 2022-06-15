const registerUserForm = document.querySelector("#register-user-form");

// let firstname = registerUserForm.firstname.value.trim();
// let lastname = registerUserForm.lastname.value.trim();
// let username = registerUserForm.username.value.trim();
// let email = registerUserForm.email.value.trim();
// let password = registerUserForm.password.value.trim();


let email = registerUserForm.email;

email.addEventListener('blur', function(){

    //create instance
    const xhr = new XMLHttpRequest;

    //OPEN
    xhr.open("GET", `http://localhost:4000/check-email?email=${email.value}`);


    //load
    xhr.addEventListener("load", function(){
        //response
        let response = JSON.parse(xhr.response)

        console.log(response);

        if(response.code == "error"){
            document.querySelector(".check-info").innerHTML = "<strong>x</strong>";
            console.log(document.querySelector(".check-info").classList)
            document.querySelector(".check-info").classList.remove('checked');
            document.querySelector(".check-info").classList.add('not-checked');

            

        }else{
            document.querySelector(".check-info").innerHTML = "<strong>checked</strong>";
            document.querySelector(".check-info").classList.remove('not-checked');
            document.querySelector(".check-info").classList.add('checked');
        }

        

    })

    //send
    xhr.send();

})