const apiServ = require("./back/api/APIPres");
const port = 3001;

function main(){
    apiServ.start(port);
}

main();