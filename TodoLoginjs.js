function goReg() {


    window.location = 'TodoReg.html'
};



function goTodos() {


    // window.location = 'Todos.html'

    let user = document.getElementById("name").value

    console.log(user)



    let pass = document.getElementById("password").value

    console.log(pass.innertext);
  
    let jsonReg = { 
        username: user, 
        pass: pass 
    };


    console.log(JSON.stringify(jsonReg));


    const urlCheck = "http://35.246.3.91:8081/TodoBackend/api/Users/Check";





    makeRequest('POST', urlCheck, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if(value.Success == "True"){
            sessionStorage.setItem("userId", value.userId);
            sessionStorage.setItem("username",value.username);

            window.location = 'Todos.html';


        }else{window.alert("no account match")}



    });

    return true;
};