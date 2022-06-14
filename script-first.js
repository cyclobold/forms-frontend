const createUserForm = document.querySelector("#create-user-form");




//When the form is submitted
createUserForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    //get the username
    let username = createUserForm.username.value.trim();
    let password = createUserForm.password.value.trim();


    //submit the data using ajax
    const xhr = new XMLHttpRequest;

    //open 
    xhr.open("POST", "http://localhost:4000/create-user");

    //load 
    xhr.addEventListener("load", function(){

        const response = JSON.parse(xhr.response);

        console.log(response)
        let cssClassName;
        if(response.code == "error"){
            cssClassName = "error";
        
        }else{
            cssClassName = "success";
            createUserForm.username.value = "";
            createUserForm.password.value = "";
        }
        const divElement = `<div class='${cssClassName}'>${response.message}</div>`

        document.querySelector("#form-info").innerHTML = divElement;

        

    })


    console.log(username);

    //send
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`username=${username}&password=${password}`);


});