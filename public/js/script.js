const USER_URL = "http://localhost:3001/data";
const table = document.querySelector("#users");
let page = 0;
let userslen;
const user_checker = {
  first: /^[A-Za-z-]+$/,
  last: /^[A-Za-z-]+$/,
  email: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,3}$/,
  company: /^[A-Za-z- ]+$/,
  country: /^[A-Za-z- ]+$/
};


const getUsers = function(){
  fetch(USER_URL)
  .then(res => res.json())
  .then(json =>{
    refreshTable(json,page);
    userslen = json.length;
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
  if (!confirm("Etes-vous sur de supprimer l'utilisateur ?")) {
      return;
  }

  fetch(USER_URL, {
      method: "delete",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          id: id
      })
  }).then(getUsers);
};

getUsers();