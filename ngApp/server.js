const express  = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname,'dist'))); // folder where angular code is kept

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/api',api);
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port,function(){
    console.log("SERVER RUNNING ON PORT"+port);
})