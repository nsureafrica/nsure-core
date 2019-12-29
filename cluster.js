//@ts-check

const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
  const numberOfCpus = os.cpus().length;
  console.log(`forking ${numberOfCpus} CPUS`);
  for (let i = 0; i < numberOfCpus; i++) {
    cluster.fork();
  }

  //incase a worker dies lazarus it!
  cluster.on("exit", function() {
    console.log("one died");
    cluster.fork();
  });
} else {
  require("./App/index");
}
