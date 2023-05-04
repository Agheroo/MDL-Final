const USER_URL = "http://localhost:3001/data";
const table = document.querySelector("#users");
let page = 0;
let userslen;
let last_id =0;
const user_checker = {
  first: /^[A-Za-z-]+$/,
  last: /^[A-Za-z-]+$/,
  email: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,3}$/,
  company: /^[A-Za-z- ]+$/,
  country: /^[A-Za-z- ]+$/
};
const specs = ["first","last","email","company","country"];

const getUsers = function(){
  fetch(USER_URL)
  .then(res => res.json())
  .then(json =>{
    userslen = json.length;
    last_id = json[json.length-1].id;
    console.log(last_id);
    refreshTable(json,page);
  });
}

const changePage = (param) =>{
  if(param == 'next' && page < parseInt(userslen/20))
    page++;
  if(param == 'prev' && page > 0)
    page--;
  if(param == 'first')
    page = 0;
  if(param == 'last')
    page = parseInt(userslen/20);

  document.getElementById("page").innerHTML = page+1;
  getUsers();
}
const refreshTable = (users,startid) => {
  table.innerHTML = "";
  let split =20;

  for (let i=startid*split;i<split*(startid+1); i++) {
    let row = document.createElement("tr");
    row.id = "user" + users[i].id;

    //Display:
    row.innerHTML = `
    <td>${users[i].id}</td>
    <td>${users[i].first}</td>
    <td>${users[i].last}</td>
    <td>${users[i].email}</td>
    <td>${users[i].company}</td>
    <td>${users[i].country}</td>
    <td>${users[i].created_at}</td>
    <td id = edit-table><img id = "edit" onclick = "editUser(${users[i].id})" src = "images/edit.png" height = "30"></td>
    <td id = delete-table><img id = "delete" onclick = "delUser(${users[i].id})" src = "images/delete.png" height = "30"></td>
    `

    table.appendChild(row);
  }
};

const delUser = (id) => {
  if (!confirm("Etes-vous sur de supprimer l'utilisateur ?"))
    return;


  fetch(USER_URL, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          id: id
      })
  }).then(getUsers);
  window.location.reload();
};

const editUser = (id) => {
  let row = document.getElementById("user"+id);
  let userspecs = row.children;
  curr_user = {id:id};

  //Editing of user-id starting
  for(let i=0; i<specs.length;i++){
    curr_user[specs[i]] = userspecs[i+1].textContent;
    userspecs[i+1].innerHTML = `<input id = "${specs[i]+id}" type = "text" value = "${curr_user[specs[i]]}">`;
  }
  userspecs[7].innerHTML = `<img id = "confirm" onclick = "confirmEdit()" src = "images/validate.png" height = "30">`
  userspecs[7].id = "confirm-table";
  userspecs[8].innerHTML = `<img id = "delete" onclick = "cancelEdit()" src = "images/cancel.png" height = "30">`
}

const confirmEdit = () =>{
  let new_user = {};
  let spec;

  //Gathering new user infos
  for(let i=0; i<specs.length; i++){
    spec = document.getElementById(specs[i]+curr_user.id).value;
    if(!spec.match(user_checker[spec])){
      alert("Veuillez vérifier les informations en entrée");
      return cancelEdit();
    }
    new_user[specs[i]] = spec;
  }

  //Get new user in the database
  fetch(USER_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: curr_user.id,
        to_edit: new_user
    })
  }).then(getUsers());
  window.location.reload();
}

const cancelEdit = () =>{
  let row = document.getElementById("user"+curr_user.id);
  let userspecs = row.children;
  for(let i=0; i<specs.length;i++){
    userspecs[i+1].innerHTML = curr_user[specs[i]];
  }
  userspecs[7].innerHTML = `<img id = "edit" onclick = "editUser(${curr_user.id})" src = "images/edit.png" height = "30">`
  userspecs[7].id = "edit-table";
  userspecs[8].innerHTML = `<img id = "delete" onclick = "delUser(${curr_user.id})" src = "images/delete.png" height = "30">`
}

const confirmForm = ()=>{
  let spec;
  let user = {};
  //Verifying if inputs are correct
  for(let i=0; i<specs.length; i++){
    spec = document.getElementById("user-"+specs[i]).value;
    if(!spec.match(user_checker[spec])){
      alert("Veuillez vérifier les informations en entrée");
      return;
    }
    user[specs[i]] = spec;
  }

  //If all infos are correct, begin user adding
  addUser(user);
}

const addUser = (user) => fetch(USER_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
}).then(getUsers());

getUsers();