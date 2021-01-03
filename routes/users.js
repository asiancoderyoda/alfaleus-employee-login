const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
//For reset passwordwe need crypto
const crypto = require('crypto');

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");


//For mail service using nodemailer
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  }
}))


//Register Router
router.post("/signup", (req, res) => {
  const { name, email, password,  } = req.body;

  //make employee ID
  const employee_id = "ALF_EMP"+name[0].toUpperCase()+name[1].toUpperCase()+(Date.now());

  if (!email || !password || !name) {
    return res.status(422).json({
      success: false,
      error: "Field missing, Please add all the fields",
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({
            success: false,
            error: "Employee already exists with this Email ID",
          });
        } else {
          //Encrypting password and saving details to Database
          bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new User({
              email: email,
              password: hashedpassword,
              name: name,
              employee_id: employee_id
            });
            user
              .save()
              .then((user) => {
                //Email to employee
                transporter.sendMail({
                  to:user.email,
                  from:"avigyanbhaktacontai@gmail.com",
                  subject:"Alfaleus Employee Account Activation",
                  html:`
                  <head>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
                    <style>
                      /* Reset styles */ 
                      body {
                        font-family: 'Roboto', Arial, sans-serif;
                        height: 100% !important;
                        margin: 0; 
                        min-width: 100%;
                        padding: 0; 
                        width: 100% !important; 
                      }
                      body, table, td, div, p, a {
                        line-height: 100%;
                        text-size-adjust: 100%;
                        -webkit-font-smoothing: antialiased; 
                        -ms-text-size-adjust: 100%; 
                        -webkit-text-size-adjust: 100%;
                      }
                      table, td {
                        border-collapse: collapse !important; 
                        border-spacing: 0;
                        mso-table-lspace: 0pt; 
                        mso-table-rspace: 0pt; 
                      }
                      img {
                        border: 0; 
                        line-height: 100%; 
                        outline: none; 
                        text-decoration: none; 
                        -ms-interpolation-mode: bicubic;
                      }
                      .action-item {
                        border: 1px solid #005f7f;
                        color: #005f7f;
                        padding: 8px 20px;
                      }
                      .action-item:hover {
                        background-color: #2a923d;
                        border: 1px solid #2a923d;
                        color: #fff;
                      }
                      #outlook a {padding: 0;}
                      .ReadMsgBody {width: 100%;}
                      .ExternalClass {width: 100%;}
                      .ExternalClass, 
                      .ExternalClass p, 
                      .ExternalClass span, 
                      .ExternalClass font, 
                      .ExternalClass td, 
                      .ExternalClass div {line-height: 100%;}

                      /* Rounded corners for advanced mail clients only */ 
                      @media all and (min-width: 560px) {
                        .container {
                          border-radius: 8px; 
                          -webkit-border-radius: 8px; 
                          -moz-border-radius: 8px; 
                          -khtml-border-radius: 8px;
                        }
                      }
                      /* Set color for auto links (addresses, dates, etc.) */ 
                      a, a:hover {color: #005f7f;}
                      .footer a, 
                      .footer a:hover {
                        color: #999999;
                      }
                    </style>
                    <!-- MESSAGE SUBJECT -->
                    <title>Laptop Auction</title>
                  </head>
                  <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; background-color: #ececec; color: #333333;" bgcolor="#ececec" text="#333333">
                  <!-- WRAPPER TABLE -->
                  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;">
                    <tr>
                      <br>
                      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#ececec">
                        <!-- WRAPPER -->
                        <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 560px; margin: 30px 0 0 0;" class="container">
                        <!-- BRANDING -->
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 20px;">
                              <h1 style="color: lightblue; font-family: 'Roboto', Arial, sans-serif; font-size: 18px; font-weight: 600; line-height: 120%; margin-bottom: 15px; text-transform: uppercase;">Greetings from</h1>
                              <h1 style="color: #333; font-family: 'Roboto', Arial, sans-serif; font-size: 26px; font-weight: 800; margin: 0; text-transform: capitalize;">ALFALEUS TECH</h1>
                            </td>
                          </tr>
                          <!-- PRIMARY IMAGE -->
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 20px;">
                              <img border="0" vspace="0" hspace="0" src="https://alfaleus.in/Assets/TestimonialsVector.png" alt="Laptop Auction" width="560" style="border: none; color: #333333; display: block; font-size: 13px; margin: 0; max-width: 560px; padding: 0; outline: none; text-decoration: none; width: 100%; -ms-interpolation-mode: bicubic;"/>
                            </td>
                          </tr>
                          <!-- CONTENT -->
                          <tr>
                            <td valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; line-height: 150%; padding-top: 5px;">
                              <h3 style="color: #005f7f; font-family: 'Roboto', Arial, sans-serif; font-size: 20px; font-weight: 600; line-height: 100%; margin: 40px 0 20px 0; padding: 0;">Your Employee ID: ${employee_id}</h3>
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif; margin-bottom: 15px;">You need your Employee ID to login. Keep it safe, store it somewhere secure.</p>
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif; margin-bottom: 15px;"></p>
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif; margin-bottom: 15px;"></p>
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif; margin-bottom: 15px;"></p>
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif; margin-bottom: 15px;"></p>
                            </td>
                          </tr>
                          <!-- ACTION ITEM  -->
                          <tr>
                            <td style="padding: 20px 0;" align="center">
                              <table border="0" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                  <td align="center" style="background-color: #005f7f; border-radius: 3px; font-family: 'Roboto', Arial, sans-serif; font-size: 17px; letter-spacing: 1px; padding: 10px;">
                                    <a href="#http://localhost:3000/login" target="_blank" style="background-color: #005f7f; border-radius: 3px; color: #fff; display: inline-block; font-weight: 400; line-height: 30px; text-align: center; text-decoration: none; width: 260px; -webkit-text-size-adjust: none;">
                                      Go back to Login
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <!-- CONTENT -->
                          <tr>
                            <td valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;">
                              <p style="font-size: 15px; font-weight: 400; line-height: 160%; color: #333333; font-family: 'Roboto', Arial, sans-serif;">&nbsp;</p>
                            </td>
                          </tr>
                        </table>
                        <!-- FOOTER -->
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 560px;" class="wrapper">
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; font-size: 12px; font-weight: 400; line-height: 150%; padding-top: 20px; padding-bottom: 20px; color: #999999; font-family: 'Roboto', Arial, sans-serif;" class="footer">
                                Copyright © 2021 Alfaleus. All Rights Reserved.
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  </body>

                  `
                })

                res.status(201).json({
                  success: true,
                  message: "User successfully created. Check email to view Employee ID",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});


//Signin Route
router.post("/signin", (req, res) => {
  const { employee_id, password } = req.body;
  if (!employee_id || !password) {
    res.status(422).json({
      success: false,
      error: "Please provide email and correct password",
    });
  }
  User.findOne({ employee_id: employee_id }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({
        success: false,
        error: "Invalid Employee ID or password",
      });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        //signing jwt and sending the token and user details to client
        if (doMatch) {
          const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
          const {_id, employee_id, name, email} = savedUser
          res.json({ token, user:{_id, employee_id, name, email} });
        } else {
          return res.status(422).json({
            success: false,
            error: "Invalid Employee ID or password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


module.exports = router;