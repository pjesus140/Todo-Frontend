const helloUser = document.getElementById('helloName');
helloUser.innerText = 'Hello ' + sessionStorage.getItem('username');

function goLog(event) {
    sessionStorage.removeItem('userId');


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


    const urlCheck = "http://35.246.3.91:8081/TodoBackend/api/Users/CheckDel/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCheck, JSON.stringify(jsonReg)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            const urlDelete = "http://35.246.3.91:8081/TodoBackend/api/Users/delete/" + sessionStorage.getItem("userId");





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

    const urlCreateList = "http://35.246.3.91:8081/TodoBackend/api/Lists/create/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCreateList, JSON.stringify(jsonCreateList)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            

            
                $('#addListModal').modal('hide');
            



            // window.alert("List created: " + newName);

            getAllList();




        } else { window.alert("please add a List Name") };







    });
}

function renameListF() {
    const urlRename = "http://35.246.3.91:8081/TodoBackend/api/Lists/update/" + ListIdRename;


    const input = document.getElementById("NewName").value;

    // document.getElementById("ListName" + renameID).innerText = input.value;
    let jsonRename = {
        listName: input
    };

    makeRequest('Post', urlRename, JSON.stringify(jsonRename)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {
            $("#RenameModal").modal('hide');

            getAllList();


        } else { window.alert("Please set a new List Name") }



    });

};


var task = document.getElementById("task");

task.style.display = "none";

function delAcc() {






    let delPass = document.getElementById("delPassword").value

    console.log(delPass.value);

    let jsonDel = {
        pass: delPass
    };


    console.log(JSON.stringify(jsonDel));


    const urlCheck = "http://35.246.3.91:8081/TodoBackend/api/Users/CheckDel/" + sessionStorage.getItem("userId");





    makeRequest('Post', urlCheck, JSON.stringify(jsonDel)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {

            const urlDelete = "http://35.246.3.91:8081/TodoBackend/api/Users/delete/" + sessionStorage.getItem("userId");



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
let ListIdRename;

function getAllList() {

    const urlCheck = "http://35.246.3.91:8081/TodoBackend/api/Lists/getAll/" + sessionStorage.getItem("userId");





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
            if (divCard.id == ListIdTasks) {
                divCard.className = "card card-body bg-success"
            }

            const title = document.createElement('h5');

            title.innerText = x.listName;
            const renameList = document.createElement('button');
            const deleteListB = document.createElement('button');
            deleteListB.className="btn btn-danger";

            divCard.addEventListener('click', () => {


                ListIdTasks = divCard.id;
                getAllTask(divCard.id);
                getAllList();

                if (task.style.display === "none") {
                    task.style.display = "block";

                }

            });




            renameList.addEventListener('click', () => {
                $("#RenameModal").modal('toggle');
                ListIdRename = divCard.id;
                // renameID = ev.target.parentNode.id.substring(listID.length);
            });

            deleteListB.addEventListener('click', () => {


                DeleteList(divCard.id);

                const parentDel = document.getElementById('listTasks');
                while (parentDel.firstChild) {
                    parentDel.removeChild(parentDel.firstChild);
                }


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




    const urlDeleteList = "http://35.246.3.91:8081/TodoBackend/api/Lists/delete/" + ListId;





    makeRequest('DELETE', urlDeleteList, null).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            window.alert("list Deleted");

            getAllList();




        } else { window.alert("something bad happened") };







    });
}

function addTask(ListId) {

    const info = document.getElementById("taskText").value;

    const urlAddTask = "http://35.246.3.91:8081/TodoBackend/api/Tasks/create/" + ListId;

    let jsonCreateTask = {
        taskText: info
    };



    makeRequest('Post', urlAddTask, JSON.stringify(jsonCreateTask)).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            

            getAllTask(ListIdTasks);
            $('#TaskModal').modal('hide');




        } else { window.alert("please enter your task") };







    });

}

function getAllTask(ListId) {

    const urlCheckTask = "http://35.246.3.91:8081/TodoBackend/api/Tasks/getAll/" + ListId;





    makeRequest('Get', urlCheckTask).then(value => {

        console.log('IT WORKS', value);


        const parent2 = document.getElementById('listTasks');
        while (parent2.firstChild) {
            parent2.removeChild(parent2.firstChild);
        }


        for (x of value) {


            const divCardTask = document.createElement('div');
            divCardTask.id = 'taskId' + x.taskId;
            divCardTask.className = "card card-body";

            const title = document.createElement('p');

            title.innerText = x.taskText;

            const deleteTaskB = document.createElement('button');
            deleteTaskB.className="btn btn-danger";







            deleteTaskB.addEventListener('click', () => {

                DeleteTask(divCardTask.id.substring(6));


                getAllTask(ListIdTasks);


            });

            deleteTaskB.innerText = 'Delete Task';


            divCardTask.append(title);

            divCardTask.append(deleteTaskB);


            parent2.append(divCardTask);

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


function DeleteTask(taskId) {

    const urlDeleteList = "http://35.246.3.91:8081/TodoBackend/api/Tasks/delete/" + taskId;





    makeRequest('DELETE', urlDeleteList, null).then(value => {

        console.log('IT WORKS', value);
        if (value.Success == "True") {



            window.alert("list Deleted");

            getAllTask(ListIdTasks);




        } else { window.alert("something bad happened") };







    });

}
