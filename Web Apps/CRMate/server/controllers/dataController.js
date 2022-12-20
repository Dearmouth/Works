const {mongoose} = require('../models/index.js')
const Contact = mongoose.model('Contact');
const fs = require('fs');
const { Parser } = require('json2csv');
const path = require('path');
const fastcsv = require("fast-csv");
const makeDirectory = require("../utils/mkdir")
const REQUIRED_HEADERS = ["firstName", "lastName", "email", "phone", "notes", "tags"];

const convertMultiples = (data) => {
  if (data === '[]' || data === '') return JSON.parse(data);
  else return JSON.parse(data)
}

const exportContacts = async (req, res) => {
  
try {
    const contacts = await Contact.find({'userId': req.params.id});
    
    if (!contacts || !contacts.length) {
        res.status(400);
        return res.send('Query failed');
    }

    // removes fields that the user might not find necessary ie. ID fields
    let dataWithoutIdFields = contacts.map(c=> {return {
      firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone, 
      notes: c.notes, tags: c.tags
    }})


    let data; 

    // now check directory existence
    makeDirectory(__dirname + `/../public/files`)
    let filePath = __dirname + `/../public/files/${req.query.filename}.${req.query.format}`
    let resolved = path.resolve(filePath)

    switch(req.query.format) {
      case('csv'): 
        const json2csvParser = new Parser();
        data = json2csvParser.parse(dataWithoutIdFields);
        break;
      case('json'): 
        data = JSON.stringify(dataWithoutIdFields)
        break;
      default:
        null
    }
    fs.writeFile(resolved, data, function (err) {
      if (err) res.status(500).send(err);
      else {
        res.sendFile(resolved)
    }
  })

} catch (err) {
    res.status(400);
    return res.send('Query failed');
}
}


const addContactToDB = async (userId, data) => {
  return new Promise((resolve, reject) => {
  data = data.map(d => new Contact(Object.assign(d, userId)))
  const savedPromises = data.map(contact => {
    return new Promise((resolve, reject) => {
      contact.save((error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result);
      })
    })
  });
  Promise.all(savedPromises).then((results) => {
    resolve({message: "Import Successful"});
  }, (error) => {
     reject(new Error("Import failed"));
  })
})
}

const checkCorrectHeaders = (headers) => {
  return headers.join("") === REQUIRED_HEADERS.join("");     
}

const parseJSON = (file) => {
  let rawData = fs.readFileSync(file);
  let json = JSON.parse(rawData);
  let headers = Object.keys(json[0]);
  if (!checkCorrectHeaders(headers)) {
    throw new Error("Incorrect headers")
  }
  return json;
}



const parseCSV = async (file) => {
  let stream = fs.createReadStream(file);
  let csvData = [];

  return new Promise((resolve, reject) => {
  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push({
        firstName: data[0],
        lastName: data[1],
        email: data[2],
        phone: data[3],
        notes: data[4],
        tags: data[5],
      });
    })
    .on("end", function() {
      let headers = Object.values(csvData[0])
      if (!checkCorrectHeaders(headers)) {
        // then we cannot import this data. 
        reject({message: "Invalid Schema"})
        return;
      }
      csvData.shift();
      csvData = csvData.map(c => {
        c = {
          ...c,
          email: convertMultiples(c.email),
          phone: convertMultiples(c.phone),
          tags: convertMultiples(c.tags)
        }
        return c
      })
     resolve(csvData);
    })
    .on('error', error => {
      reject(error)
    });
    stream.pipe(csvStream);
  });
}


const importContacts = async (req, res) => {
  const userId = {'userId': req.params.id}
  let data; 

  if (req.file.mimetype === 'application/json') {
    try {
      data = parseJSON(req.file.path)
    }
    catch(e) {
      res.status(400).send();
    }
  }

  else if (req.file.mimetype === 'text/csv') {
    try {
      data = await parseCSV(req.file.path);
    }
    catch(e) {
      res.status(400).send();
    }
  }
  
  else {
    // wrong mime type 
    res.status(400).send();

  }
  
  
  try {
      let response = await addContactToDB(userId, data);
      res.send(response);
    } 
    catch(e) {
      res.status(400).send();
    }
  }

module.exports = {exportContacts, importContacts}
