function goLog() {


    window.location = 'TodoLogin.html'
};


function goReg() {

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
        username: newName, 
        pass: newPassword 
    };


    console.log(JSON.stringify(jsonReg));


    const urlCreate = "http://localhost:8080/TodoBackend/api/Users/create";





    makeRequest('POST', urlCreate, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if(value.Success == "True") {

            window.alert("Account made Successfully");
            window.location = 'TodoLogin.html';
        }else{
            window.alert("Username Taken");
            document.getElementById("name").value ="";


        }
        


    });

    return true;

}