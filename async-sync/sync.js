const fs = require("fs");

const data = fs.readFileSync("hellow.txt");

console.log(data.toString());
