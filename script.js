const createUserForm = document.querySelector("#create-user-form");

//check if the password is filled
let passwordField = createUserForm.password;

const allowedEvents = ['blur', 'keypress'];


for(let i = 0; i < allowedEvents.length; i++){

    passwordField.addEventListener(allowedEvents[i], function(event){
            if(event.type == 'keypress'){
                if(event.charCode == 13){
                    //proceed
                    processForm();
                }

            }else if(event.type == 'blur'){
                //proceed
                processForm();
            }



    })

}

function processForm(){
    let usernameField = createUserForm.username;
    let username = usernameField.value.trim().length > 0 ? usernameField.value : null;

    let password = passwordField.value.trim().length > 0 ? passwordField.value : null;

    if(username == null || password == null){
        document.querySelector("#form-info").innerHTML = `<div class='error'>All fields are required</div>`;
    }else{

        //use ajax to submit the form 
        const xhr = new XMLHttpRequest;

        //open
        xhr.open("POST", "http://localhost:4000/create-user");

        //load
        xhr.addEventListener("load", function(){
            //response
            console.log(xhr.response);
            response = JSON.parse(xhr.response);

            let cssClassName;
            if(response.code == "error"){
                cssClassName = "error";
            
            }else{
                cssClassName = "success";
                createUserForm.username.value = "";
                createUserForm.password.value = "";
            }
            let divElement = `<div class='${cssClassName}'>${response.message}</div>`
                divElement += `<div class='${cssClassName} mt-2 mb-2'>Here are your details: <strong>Username</strong>: ${response.data.username} and <strong>Password</strong>: ${response.data.password}</div>`
            document.querySelector("#form-info").innerHTML = divElement;

        })

        //send
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`username=${username}&password=${password}`);

    }


}


function loadRegistrationPage(){
    
    const xhr = new XMLHttpRequest;

    //open
    xhr.open("GET", "register.html");

    //load
    xhr.addEventListener("load", function(){
        //response
        const response = xhr.response
        //console.log(response);

        //let responseChildren = response.childNodes[0].childNodes[1];
        
        // console.log(responseChildren)


        document.querySelector("#wrapper").innerHTML = response;
        
        //document.body.appendChild(responseChildren)
        let scriptElement = document.createElement("script")
        scriptElement.src='script2.js'

        document.body.appendChild(scriptElement)

        






    });
    
    //xhr.responseType = 'document';
    //send
    xhr.send()

}

