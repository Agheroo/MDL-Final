const data =  require("../data/data.js");



const business = {
    /**
     * 
     * @returns all users from the customer list
     */
    getAllUsers : function(){
        return data.getAllUsers(); 
    },

    /**
     * 
     * @param {int} userid 
     * @returns specified user's information
     */
    getUser : function(userid){
        return data.getUser(userid);
    },

    /**
     * Adds an user in the database (users.json)
     * @param {string[5]} informations if not all informations are specified, the user is not added to the file (specific order > first,last,email,country,company)
     * @returns {int} -1 or 1 if function has failed or succeeded
     */
    addUser : function(informations){
        return data.addUser(informations);
    },

    modifyUser:function(userid, informations){
        return data.modifyUser(userid,informations);
    }
};

module.exports = business;