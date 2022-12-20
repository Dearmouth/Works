const fs = require('fs')

function makeDirectory(directory) {
  if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
  }
}

module.exports = makeDirectory;
