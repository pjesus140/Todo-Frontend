function goTodos() {


    window.location = 'Todos.html'
};

function goLog() {


    window.location = 'TodoLogin.html'
};

function changeUsername() {
    let name = document.getElementById("name").value

    console.log(name.value);

    let jsonReg = {
        username: name
    };


    console.log(JSON.stringify(jsonReg));


    const urlEdit = "http://localhost:8080/TodoBackend/api/Users/updateName/"+sessionStorage.getItem("userId");





    makeRequest('POST', urlEdit, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            window.alert("New username:"+name);
            sessionStorage.setItem('username',name)


        } else {
            window.alert("Username taken");
         }



        });

    return true;
} 

function changePassword() {
    let newName = document.getElementById("name").value

    console.log(newName)



    if (document.getElementById("password").value == document.getElementById("Confirm").value) {
        newPassword = document.getElementById("Confirm").value

        console.log(newPassword.innertext);
    }else{
        window.alert("Passwords dont match")
        return null;
    }

    let jsonReg = {
        pass: newPassword
    };


    console.log(JSON.stringify(jsonReg));


    const urlEdit = "http://localhost:8080/TodoBackend/api/Users/updatePass/"+sessionStorage.getItem("userId");





    makeRequest('POST', urlEdit, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            window.alert("password changed");


        } else {
            window.alert("no account match");
         }



        });

    return true;
} 