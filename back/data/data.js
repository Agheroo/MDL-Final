const fs = require("fs");

const usersfile = __dirname+"/users.json";

let data = {

    getAllUsers : function(){
        const rawdata = fs.readFileSync(usersfile);
        let users = JSON.parse(rawdata);
        
        return users;
    },

    getUser : function(userid){
        const rawdata = fs.readFileSync(usersfile);
        let users = JSON.parse(rawdata);

        return users[userid-1];
    },

    /**
     * Adds an user in the database (users.json)
     * @param {user} user if not all informations are specified, the user is not added to the file (specific order > first,last,email,country,company)
     * @returns {boolean} error or 1 if function has failed or succeeded
     */
    addUser : function(user){
        const rawdata =fs.readFileSync(usersfile);
        let users = JSON.parse(rawdata);
        let date = new Date().toJSON();
        let newid = users.length+1;

        for(let i=0; i<5;i++){          //asserting that all informations are specified correctly
            if(informations[i] == ""){
                console.log("ERROR : no information specified ");
                return false;      //ERROR, exiting the function
            }
        }
        
        user.id = newid;
        user.created_at = date;
        users.push(user);    //Successfully adding user
        
        // Writing to our JSON file
        var newUsers = JSON.stringify(users);
        fs.writeFileSync(__dirname+"/users.json", newUsers, (err) => {
            // Error checking
            if (err) throw err;
            console.log("User successfully added at id "+newid);
        });

        return true;
    },

    /**
     * 
     * @param {{id: number, to_edit: user}} modified_data as in "addUser(...) method, all informations must be specified even if not modified"
     * @returns {boolean} -1 or 1 if function has failed or succeeded
     */
    modifyUser : function(modified_data){
        const rawdata =fs.readFileSync(usersfile);
        let users = JSON.parse(rawdata);

        let user_ind = -1;
        for (let i = 0; i < seekLastID(users); i++){
            if (users[i].id == modified_data.id){
                user_ind = i;
                
                for (let key in modified_data.to_edit){
                    users[i][key] = modified_data.to_edit[key];                
                }
            }
        }

        if(user_ind == -1) return false

        // Writing to our JSON file
        var newUsers = JSON.stringify(users);
        fs.writeFileSync(__dirname+"/users.json", newUsers, (err) => {
            // Error checking
            if (err) throw err;
            console.log("User of ID "+modified_data.id+" informations successfully updated");
        });

        return true;
    }

}

module.exports = data;