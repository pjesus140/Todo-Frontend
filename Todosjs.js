

function goLog(event) {


    window.location = 'TodoLogin.html'
};
function goEdit() {


    // window.location = 'TodoEdit.html'

    let editPassword = document.getElementById("editPassword").value

    console.log(editPassword.value);

    let jsonReg = {
        pass: editPassword
    };


    console.log(JSON.stringify(jsonReg));


    const urlCheck = "http://localhost:8080/TodoBackend/api/Users/CheckDel/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCheck, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            const urlDelete = "http://localhost:8080/TodoBackend/api/Users/delete/" + sessionStorage.getItem("userId");





            window.location = 'TodoEdit.html';



        } else { window.alert("no account match") }



    });

    return true;
};

// let idNum = 0;

// let renameID = 0;

// const listID = "ListID";

function addList() {

    

    const newName = document.getElementById('addListName').value;

    let jsonCreateList = {
        listName: newName

    };

    const urlCreateList = "http://localhost:8080/TodoBackend/api/Lists/create/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCreateList, JSON.stringify(jsonCreateList)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            window.alert("List created: " + newName);

            getAllList();




        } else { window.alert("something bad happened") };







    });
}

function renameListF() {


    const input = document.getElementById("NewName");
    document.getElementById("ListName" + renameID).innerText = input.value;
};


function delAcc() {






    let delPass = document.getElementById("delPassword").value

    console.log(delPass.value);

    let jsonDel = {
        pass: delPass
    };


    console.log(JSON.stringify(jsonDel));


    const urlCheck = "http://localhost:8080/TodoBackend/api/Users/CheckDel/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCheck, JSON.stringify(jsonDel)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            const urlDelete = "http://localhost:8080/TodoBackend/api/Users/delete/" + sessionStorage.getItem("userId");



            makeRequest('DELETE', urlDelete, null).then(value => {
                console.log('IT WORKS', value);
                window.alert("Account Deleted");

                window.location = 'TodoLogin.html';
            });


        } else { window.alert("no account match") }



    });

    return true;
};


let ListIdTasks;

function getAllList() {

    const urlCheck = "http://localhost:8080/TodoBackend/api/Lists/getAll/" + sessionStorage.getItem("userId");





    makeRequest('Get', urlCheck).then(value => {

        console.log('IT WORKS', value);


        const parent2 = document.getElementById('sideBar');
        while (parent2.firstChild) {
            parent2.removeChild(parent2.firstChild);
        }


        for (x of value) {


            const divCard = document.createElement('div');
            divCard.id = x.listId;
            divCard.className = "card card-body";

            const title = document.createElement('h5');
            
            title.innerText = x.listName;
            const renameList = document.createElement('button');
            const deleteListB = document.createElement('button');

            divCard.addEventListener('click', () => {


                var addTask = document.getElementById("task");
                if (addTask.style.display === "none") {
                    addTask.style.display = "block";

                    ListIdTasks = divCard.id;
                } else {
                    addTask.style.display = "none";
                }



            });




            renameList.addEventListener('click', (ev) => {
                $("#RenameModal").modal('toggle');
                renameID = ev.target.parentNode.id.substring(listID.length);
            });

            deleteListB.addEventListener('click', () => {


                DeleteList(divCard.id);


            });
            renameList.innerText = 'Rename List';

            deleteListB.innerText = 'Delete List';


            divCard.append(title);
            divCard.append(renameList);
            divCard.append(deleteListB);


            parent2.append(divCard);

        }


        // const parent2 = document.getElementById('sideBar');

        // const newName = document.getElementById('addListName').value;

        // const divCard = document.createElement('div');


        // divCard.id = "ListID" + idNum;
        // divCard.className = "card card-body";

        // const title = document.createElement('h5');
        // title.id = "ListName" + idNum;
        // title.innerText = newName;
        // const renameList = document.createElement('button');
        // const deleteListB = document.createElement('button');

        // renameList.toggleAttribute = 'modal'
        // renameList

        // renameList.addEventListener('click', (ev) => {
        //     $("#RenameModal").modal('toggle');
        //     renameID = ev.target.parentNode.id.substring(listID.length);
        // });

        // deleteListB.addEventListener('click', () => {

        //     parent2.removeChild(divCard);
        // });





        // renameList.innerText = 'Rename List';

        // deleteListB.innerText = 'Delete List';


        // divCard.append(title);
        // divCard.append(renameList);
        // divCard.append(deleteListB);


        // parent2.append(divCard);

        // idNum++;


    });

}

function DeleteList(ListId) {




    const urlDeleteList = "http://localhost:8080/TodoBackend/api/Lists/delete/" + ListId;





    makeRequest('DELETE', urlDeleteList, null).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            window.alert("list Deleted");

            getAllList();




        } else { window.alert("something bad happened") };







    });
}

function addTask(ListId){

    const info = document.getElementById("taskText").value;

    const urlAddTask = "http://localhost:8080/TodoBackend/api/Tasks/create/" + ListId;

    let jsonCreateTask = {
        taskText: info
    };



    makeRequest('Post', urlAddTask, JSON.stringify(jsonCreateTask)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            window.alert("task Added");

            getAllList();




        } else { window.alert("something bad happened") };







    });

}

function getAllTask(listId) {

    const urlCheck = "http://localhost:8080/TodoBackend/api/Lists/getAll/" + sessionStorage.getItem("userId");





    makeRequest('Get', urlCheck).then(value => {

        console.log('IT WORKS', value);


        const parent2 = document.getElementById('sideBar');
        while (parent2.firstChild) {
            parent2.removeChild(parent2.firstChild);
        }


        for (x of value) {


            const divCard = document.createElement('div');
            divCard.id = x.listId;
            divCard.className = "card card-body";

            const title = document.createElement('h5');
            
            title.innerText = x.listName;
            const renameList = document.createElement('button');
            const deleteListB = document.createElement('button');

            divCard.addEventListener('click', () => {


                var addTask = document.getElementById("task");
                if (addTask.style.display === "none") {
                    addTask.style.display = "block";
                } else {
                    addTask.style.display = "none";
                }



            });




            renameList.addEventListener('click', (ev) => {
                $("#RenameModal").modal('toggle');
                renameID = ev.target.parentNode.id.substring(listID.length);
            });

            deleteListB.addEventListener('click', () => {


                DeleteList(divCard.id);


            });
            renameList.innerText = 'Rename List';

            deleteListB.innerText = 'Delete List';


            divCard.append(title);
            divCard.append(renameList);
            divCard.append(deleteListB);


            parent2.append(divCard);

        }


        // const parent2 = document.getElementById('sideBar');

        // const newName = document.getElementById('addListName').value;

        // const divCard = document.createElement('div');


        // divCard.id = "ListID" + idNum;
        // divCard.className = "card card-body";

        // const title = document.createElement('h5');
        // title.id = "ListName" + idNum;
        // title.innerText = newName;
        // const renameList = document.createElement('button');
        // const deleteListB = document.createElement('button');

        // renameList.toggleAttribute = 'modal'
        // renameList

        // renameList.addEventListener('click', (ev) => {
        //     $("#RenameModal").modal('toggle');
        //     renameID = ev.target.parentNode.id.substring(listID.length);
        // });

        // deleteListB.addEventListener('click', () => {

        //     parent2.removeChild(divCard);
        // });





        // renameList.innerText = 'Rename List';

        // deleteListB.innerText = 'Delete List';


        // divCard.append(title);
        // divCard.append(renameList);
        // divCard.append(deleteListB);


        // parent2.append(divCard);

        // idNum++;


    });

}



