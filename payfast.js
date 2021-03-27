const axios = require('axios');
const crypto = require('crypto');

exports.payfastOnSitePayment = async (dataString) => {
    console.log(`🛎️🛎️🛎️ attempt to make payment`);
    const result = await axios.post(
        `https://www.payfast.co.za/onsite/process`, dataString)
      .then((res) => {
        console.log(` 🛎️🛎️🛎️🛎️🛎️ Payfast uuid returned`);
        console.log(res.data.uuid); 
        return res.data.uuid || null;
      })
      .catch((error) => {
        console.error(error);
        console.log(`Error 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ${error}`)
      });

    console.log("res.data", result);
    return result;
}

exports.generateSignature = (data, passPhrase) => {
    let outputString = "";
    //passPhrase = "CPtQUZSv8PZY2dGb"; //Actual

    for (let key in data) {
        if(data.hasOwnProperty(key)){
          if (data[key] !== "") {
              console.log(`Obj {key} ${data[key]}`);
            outputString +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, " + ")}&`
          }
        }
    }

    // Remove last ampersand
    let getString = outputString.slice(0, -1);
    if (passPhrase !== null) {
        getString +=`&passphrase=${encodeURIComponent(passPhrase.trim())}`;
    }

    console.log(`🛎️ generate sig text: ${getString}`);

    return crypto.createHash("md5").update(getString).digest("hex");
} 

exports.generateStringFromData = (data) => {
    // Convert your data array to a string
    let pfParamString = "";
    for (let key in data) {
      if(data.hasOwnProperty(key)){pfParamString +=`${key}=${encodeURIComponent(data[key].trim())}&`;}
    }
    // Remove last ampersand
    return pfParamString.slice(0, -1);
};