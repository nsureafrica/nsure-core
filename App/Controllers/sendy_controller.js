// @ts-check

const axios = require("axios");
const sendyBaseUrl = process.env.sendyBaseUrl;
const sendyApiKey = process.env.sendyApiKey;
const sendyApiUsername = process.env.sendyUsername;
const sendyVendorType = 1;
const sendyFromName = "SpireSure";
const uuidv1 = require("uuid/v1");
const SendyModel = require("../Models/Sendy");

module.exports = {
  //request delivery
  requestDelivery: (req, res) => {
    //get recepient details from user object
    axios.default
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.to_lat},${req.body.to_long}&key=${process.env.googleMapsApiKey}`
      )
      .then(googleMapsResponse => {
        axios.default
          .post(sendyBaseUrl + "##request", {
            command: "request",
            data: {
              api_key: sendyApiKey,
              api_username: sendyApiUsername,
              vendor_type: sendyVendorType,
              from: {
                from_name: "Green House",
                from_lat: -1.300577,
                from_long: 36.78183,
                from_description: ""
              },
              to: {
                to_name: googleMapsResponse.data.results[0].formatted_address,
                to_lat: req.body.to_lat,
                to_long: req.body.to_long,
                to_description: req.body.to_description
              },
              recepient: {
                recepient_name: "Sender Name",
                recepient_phone: "0709779779",
                recepient_email: "sendyer@gmail.com",
                recepient_notes: "recepient specific Notes"
              },
              sender: {
                sender_name: sendyFromName,
                sender_phone: "0709 779 779",
                sender_email: "sendyer@gmail.com",
                sender_notes: "Sender specific notes"
              },
              delivery_details: {
                pick_up_date: "2016-04-20 12:12:12",
                collect_payment: {
                  status: false,
                  pay_method: 0,
                  amount: 0
                },
                return: true,
                note: "Sample note",
                note_status: true,
                request_type: "delivery",
                order_type: "ondemand_delivery",
                ecommerce_order: false,
                express: false,
                skew: 1,
                package_size: [
                  {
                    weight: 20,
                    height: 10,
                    width: 200,
                    length: 30,
                    item_name: "Laptop"
                  }
                ]
              }
            },
            request_token_id: uuidv1()
          })
          .then(function(sendyResponse) {
            //if status is true save the data else ?
            if (sendyResponse.data.status) {
              //SAVE IT!
              const sendyResponseData = sendyResponse.data.data;
              SendyModel.create({
                order_no: sendyResponseData.order_no,
                amount: sendyResponseData.amount,
                currency: sendyResponseData.currency,
                vendor: sendyResponseData.vendor,
                distance: sendyResponseData.distance,
                eta: sendyResponseData.eta,
                etd: sendyResponseData.eta,
                amount_return: sendyResponseData.amount_return,
                order_status: sendyResponseData.order_status,
                pick_up_date: sendyResponseData.pick_up_date,
                drop_shipping_order: sendyResponseData.drop_shipping_order,
                pairing_response: JSON.stringify(sendyResponseData.pairing_response),
                tracking_link:
                 sendyResponseData.tracking_link,
                request_token_id: sendyResponseData.request_token_id,
                policyId:req.body.policy_id,
                PolicyTypeId:req.body.policy_type_id
              })
                .then(sequelizeResponse => {
                  res.status(200).send(sendyResponse);
                })
                .catch(err => {
                  res.status(500).send(err);
                });
            }
          })
          .catch(function(err) {
            res.status(500).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  //complete delivery
  completeDelivery: (req, res) => {
    axios.default
      .post(sendyBaseUrl + "#complete", {
        command: "complete",
        data: {
          api_key: sendyApiKey,
          api_username: sendyApiUsername,
          order_no: req.body.order_no,
          delivery_details: {
            pick_up_date: req.body.pick_up_date,
            collect_payment: {
              status: false,
              pay_method: 0,
              amount: 0
            },
            return: false,
            note: req.body.note,
            note_status: true
          }
        },
        request_token_id: req.body.request_token_id
      })
      .then(response => {
        res.status(200).send(response.data);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },

  //track sendy delivery
  trackDelivery: (req, res) => {
    axios.default
      .post(sendyBaseUrl + "#track", {
        command: "track",
        data: {
          api_key: sendyApiKey,
          api_username: sendyApiUsername,
          order_no: req.body.order_no
        },
        request_token_id: req.body.request_token_id
      })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  //Cancel Deliery
  cancelDelivery: (req, res) => {
    axios.default
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
        res.send(response.data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
