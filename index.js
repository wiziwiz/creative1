const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

router.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'hello.html'));
});

app.use(express.static(path.join(__dirname, '/')), router);
app.listen(process.env.PORT || 3000);
console.log('listening on port 3000');