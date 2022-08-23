const express=require('express');
const fs=require('fs');
const path=require('path')
const request=require('request');
const tokenGen=require('./utils/tokenGen.js');
const keyGen=require('./utils/keyGen');


const app=express();

var qRes = {};
var launchURL;

var privateKey,publicKey,passPhrase;

var token;


const publicDirFolder=path.join(__dirname,'../public');

app.use(express.static(publicDirFolder))
app.use(express.json());


app.get('',(req,res)=>{
    res.render(index);
})

app.get('/authme',(req,res)=>{
    qRes=req.query;
     console.log(qRes)
    launchURL=qRes.redirect_uri

    request({launchURL,json:true},(error,res)=>{
        if(error){
            
        }else if(res.error){
            
        }else{
            
        }
    });
});

app.get('/getkey',(req,res)=>{
    let p=keyGen();
    // console.log(p);
    // res.send(p);.
    
    privateKey=p.privateKey;
    publicKey=p.publicKey;
    passPhrase=p.keyID;

    //  fs.writeFileSync('./private.key',privateKey.toString());
    // fs.writeFile('notes.txt',privateKey.toString());
    // fs.writeFileSync('./public.key',publicKey.toString());

    res.send({PUBLICKEY:publicKey})
    
})

app.get('/getToken',(req,res)=>{
    token=tokenGen({pubKey:publicKey,priKey:privateKey,pass:passPhrase},qRes);

    res.send(token);

})


app.listen(8000,()=>{
    console.log("Server is up in 8000 port");
})