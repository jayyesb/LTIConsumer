const jsonwebtoken=require('jsonwebtoken');
const crypto=require('crypto');
const fs=require('fs');



var private,public,pass;

var payload;

var privateKEY  = fs.readFileSync('../private.key', 'utf8');
var publicKEY  = fs.readFileSync('../public.key', 'utf8');

const tokenGen=(inputData,queryData)=>{

    // console.log(inputData);

    console.log(Buffer.from('Test4LTI13', "base64"));
    
    private=inputData.priKey;
    public=inputData.pubKey;
    pass=inputData.pass;

    // console.log(private);

    var i  = 'http://localhost:8000';          
    var s  = '121212';        
    var a  = '123321';


    payload={
        nonce:queryData.nonce,
        state:queryData.state
    }

    var signOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "3600",
        algorithm:  "RS256"
       };

    var token = jsonwebtoken.sign(payload, decryptKey(), signOptions);

    return token;
}

const decryptKey=()=>{

    var pKey = crypto.privateDecrypt({
        key: privateKEY.toString(),
        passphrase: pass,
        padding:crypto.constants.RSA_PKCS1_PADDING
      },Buffer.from('Test4LTI13', "base64"));
    console.log(pKey)
    
    return pKey.toString('utf-8');
}

const verifyToken=(inputData)=>{


    return tokenData;
}

module.exports=tokenGen;