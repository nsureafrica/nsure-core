// @ts-check

const ClaimModel = require("../Models/Claim");
const policyTypeModel = require("../Models/policy_type");
const transporter = require("../Utils/mailService");
const Sequelize = require("sequelize");
const UserModel = require("./../Models/User");
module.exports = {
  uploadClaim: (req, res) => {
    var photosNameArray = [];
    var claimFormsArray = [];
    console.log(req);
    req.files.claimPhotos.forEach((fileName) => {
      photosNameArray.push(fileName.filename);
    });
    req.files.claimDocs.forEach((fileName) => {
      claimFormsArray.push(fileName.filename);
    });
    ClaimModel.create({
      descriptionOfClaim: req.body.descriptionOfClaim,
      UserId: req.body.userId,
      PolicyTypeId: req.body.policyTypeId,
      claimForms: claimFormsArray.toString(),
      claimPhotos: photosNameArray.toString(),
      policyId: req.body.policyId,
    })
      .then((response) => {
        res.status(200).send(response);
        var mailOptions = {
          from: process.env.senderEmailAddress,
          to: `${req.user.email}`,
          subject: "Claim Created",
          html: `<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>*|MC:SUBJECT|*</title></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader"><tr><td valign="top" class="preheaderContainer" style="padding-top:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 0px 9px 18px;color: #e67643;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 11px;font-weight: normal;">Claim Email</td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 12px 18px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader"><tr><td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock"><tbody class="mcnImageBlockOuter"><tr><td valign="top" style="padding:9px" class="mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer"><tbody><tr><td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0;"><img align="left" alt="" src="https://i.ibb.co/FzG7pKj/image.png" width="564" style="max-width:800px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 20px 18px 0px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #EBEBEB;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody"><tr><td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #302B2F;font-family: Georgia, Times, 'Times New Roman', serif;font-size: 16px;font-weight: normal;line-height: 150%;text-align: justify;text-transform:capitalize;"><div>Dear ${req.user.firstName}</div></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 0px 18px 10px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 0px 18px 10px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #302B2F;font-family: Georgia, Times, 'Times New Roman', serif;font-size: 16px;font-weight: normal;line-height: 150%;text-align: justify;"><div>We would like to acknowledge receipt of your claim notification and will be getting in touch with you for further direction<br><br>Regards<br/> Team spire</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateFooter"><tr><td valign="top" class="footerContainer" style="padding-bottom:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 50px 18px 4px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #EBEBEB;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #e67643;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 11px;font-weight: normal;line-height: 150%;text-align: center;">This e-mail was sent by Spire Insurance Brokers. 14 March,2020</td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr></table></td></tr></table></center></body></html>`,
        };
        transporter.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            const notice = `Email sent: ` + info.response;
            console.log(notice);
          }
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getClaim: (req, res) => {
    ClaimModel.findOne({
      where: { id: req.params.claimId },
      include: [UserModel],
    })
      .then((claim) => {
        res.status(200).send(claim);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getUserClaims: (req, res) => {
    ClaimModel.findAll({
      order: [["updatedAt", "DESC"]],
      include: [policyTypeModel],
      where: { UserId: req.params.userId },
    })
      .then((userClaims) => {
        res.status(200).send(userClaims);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getAllClaims: (req, res) => {
    ClaimModel.findAll({
      order: [["updatedAt", "DESC"]],
      include: [UserModel],
    })
      .then((userClaims) => {
        res.status(200).send(userClaims);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
