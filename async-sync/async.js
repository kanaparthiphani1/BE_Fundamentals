const fs = require("fs");

fs.readFile("hellow.txt", (err, data) => console.log(data.toString()));

console.log("Executed first");
