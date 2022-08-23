const { generateKeyPairSync } = require("crypto");
const crypto = require("crypto");

const keyGen=function(){
    var keys = {};
    var kid = passPhrase();
    
    const { publicKey, privateKey } = generateKeyPairSync(
        "rsa",
        {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: kid
        }
        },
        (err, publicKey, privateKey) => {
        var sign = crypto.createSign("RSA-SHA256");
        sign.update("Test4LTI13");
        const signature = sign.sign(privateKey, "base64");
        console.log("signature: %s", signature);

        const verify = crypto.createVerify("RSA-SHA256");
        verify.update("Test4LTI13");
        const verified = verify.verify(publicKey, "base64");
        console.log("is signature ok? %s", verified);
        }

       
    );
    
    keys = { 'publicKey': publicKey , 'privateKey': privateKey, keyID: kid };
    return keys;
}

const passPhrase=function(){
    var phrase = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 255; i++) {
    phrase += characters.charAt(Math.random() * characters.length);
  }
  
  return phrase.toString();
}

module.exports=keyGen