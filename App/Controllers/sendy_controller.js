const axios = require('axios');
const sendyBaseUrl = "https://apitest.sendyit.com/v1/";
const sendyApiKey = process.env.sendyApiKey;
const sendyApiUsername = process.env.sendyUsername;
const sendyVendorType = 1;
const sendyFromName = "SpireSure";

module.exports = {
  //request delivery
  requestDelivery: (req, res) => {
    axios
      .post(sendyBaseUrl + "##request", {
        "command": "request",
        "data": {
          "api_key": sendyApiKey,
          "api_username": sendyApiUsername,
          "vendor_type": 1,
          "from": {
            "from_name": "Green House",
            "from_lat": -1.300577,
            "from_long": 36.78183,
            "from_description": ""
          },
          "to": {
            "to_name": "KICC",
            "to_lat": -1.28869,
            "to_long": 36.823363,
            "to_description": ""
          },
          "recepient": {
            "recepient_name": "Sender Name",
            "recepient_phone": "0709779779",
            "recepient_email": "sendyer@gmail.com",
            "recepient_notes": "recepient specific Notes"
          },
          "sender": {
            "sender_name": "Sendyer Name",
            "sender_phone": "0709 779 779",
            "sender_email": "sendyer@gmail.com",
            "sender_notes": "Sender specific notes"
          },
          "delivery_details": {
            "pick_up_date": "2016-04-20 12:12:12",
            "collect_payment": {
              "status": false,
              "pay_method": 0,
              "amount": 10
            },
            "return": true,
            "note": " Sample note",
            "note_status": true,
            "request_type": "delivery",
            "order_type": "ondemand_delivery",
            "ecommerce_order": false,
            "express": false,
            "skew": 1,
            "package_size": [
              {
                "weight": 20,
                "height": 10,
                "width": 200,
                "length": 30,
                "item_name": "laptop"
              }
            ]
          }
        },
        "request_token_id": "request_token_id"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  //complete delivery
  completeDelivery: (req, res) => {
    axios
      .post(sendyBaseUrl + "#complete", {
        command: "complete",
        data: {
          api_key: sendyApiKey,
          api_username: sendyApiUsername,
          order_no: "AA23MS878",
          delivery_details: {
            pick_up_date: "2016-04-15 12:12:12",
            collect_payment: {
              status: false,
              pay_method: 0,
              amount: 10
            },
            return: false,
            note: "Sample note",
            note_status: true
          }
        },
        request_token_id: "request_token_id"
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  //track sendy delivery
  trackDelivery: (req, res) => {
    axios
      .post(sendyBaseUrl + "#track", {
        command: "track",
        data: {
          api_key: sendyApiKey,
          api_username: sendyApiUsername,
          order_no: "AA34BE331"
        },
        request_token_id: "request_token_id"
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  //Cancel Deliery
  cancelDelivery: (req,res) => {
    axios
      .post(sendyBaseUrl + "#cancel", {
        command: "track",
        data: {
          api_key: sendyApiKey,
          api_username: sendyApiUsername,
          order_no: "AA2395374"
        },
        request_token_id: "request_token_id"
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
