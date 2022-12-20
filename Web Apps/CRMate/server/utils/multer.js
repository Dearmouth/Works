
const multer = require('multer');
let upload = multer({ dest: 'files/exports' })

module.exports = upload