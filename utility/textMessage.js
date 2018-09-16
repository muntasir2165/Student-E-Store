var puretext = require("puretext");
require("request");

var text = {
  apiToken: "5xchzk",
  // To Number is the number you will be sending the text to.
  // toNumber: '+X-XXX-XXX-XXXX',
  fromNumber: "+14148776344"
  // Text Content
  // smsBody: "Sending SMS using Node.js",
};

module.exports = function(toNumber, smsBody) {
  text.toNumber = toNumber;
  text.smsBody = smsBody;
  puretext.send(text, function(error, response) {
    if (error) {
      console.log(
        "SMS/Text message delivery failed.\n" + JSON.stringify(error)
      );
    } else {
      // response object example:
      /* { 
                    id: '5b9d2bf8f43e1e0014ba2772',
                    textCount: 1,
                    toNumber: '+15875014865',
                    fromNumber: '+14148776344',
                    amount: 0.05,
                    apiToken: '5xchzk',
                    status: 200,
                    type: 'single' 
                }
            */
      console.log("SMS/Text message sent to: " + response.toNumber);
    }
  });
};
