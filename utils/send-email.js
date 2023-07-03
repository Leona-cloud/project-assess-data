const sgMail = require("@sendgrid/mail");

const sendEmail = async function (token, email) {
  sgMail.setApiKey(process.env.project);
  const msg = {
    to: email,
    from: process.env.senderEmail, 
    subject: "Email Verification",
    text: "Hi, thanks for signing up",
    html: `<table border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout:fixed;background-color:#f9f9f9' id='bodyTable'>
    <tbody>
      <tr>
        <td style='padding-right:10px;padding-left:10px;' align='center' valign='top' id='bodyCell'>
          <table border='0' cellpadding='0' cellspacing='0' width='100%' class='wrapperBody' style='max-width:600px'>
            <tbody>
              <tr>
                <td align='center' valign='top'>
                  <table border='0' cellpadding='0' cellspacing='0' width='100%' class='tableCard' style='background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;'>
                    <tbody>
                      <tr>
                        <td style='background-color:#00d2f4;font-size:1px;line-height:3px' class='topBorder' height='3'>&nbsp;</td>
                      </tr>
                      <tr>
                        <td style='padding-top: 60px; padding-bottom: 20px;' align='center' valign='middle' class='emailLogo'>
                          <a href='#' style='text-decoration:none' target='_blank'>
                          <b style='font-size: 90px; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;'>Data access</b>
                          </a>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style='padding-bottom: 5px; padding-left: 20px; padding-right: 20px;' align='center' valign='top' class='mainTitle'>
                          <h2 class='text' style='color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0'>Hi</h2>
                        </td>
                      </tr>
                      <tr>
                        <td style='padding-bottom: 30px; padding-left: 20px; padding-right: 20px;' align='center' valign='top' class='subTitle'>
                          <h4 class='text' style='color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0'>Please Verify Your Email Address</h4>
                        </td>
                      </tr>
                      <tr>
                        <td style='padding-left:20px;padding-right:20px' align='center' valign='top' class='containtTable ui-sortable'>
                          <table border='0' cellpadding='0' cellspacing='0' width='100%' class='tableDescription' style=''>
                            <tbody>
                              <tr>
                                <td style='padding-bottom: 20px;' align='center' valign='top' class='description'>
                                  <p class='text' style='color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0'>Thanks for signing up for Data access. Please enter the code below to confirm your email address.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table border='0' cellpadding='0' cellspacing='0' width='100%' class='tableButton' style=''>
                            <tbody>
                              <tr>
                                <td style='padding-top:20px;padding-bottom:20px' align='center' valign='top'>
                                  <table border='0' cellpadding='0' cellspacing='0' align='center'>
                                    <tbody>
                                      <tr>
                                        <td style='background-color: rgb(34, 37, 37); padding: 12px 35px; border-radius: 5px;' align='center' class='ctaButton'> <a href='#' style='color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block' target='_blank' class='text'>${token}</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style='font-size:1px;line-height:1px' height='20'>&nbsp;</td>
                      </tr>
                      <tr>
                        <td align='center' valign='middle' style='padding-bottom: 40px;' class='emailRegards'>
                          <!-- Image and Link // -->
                          <a href='#' target='_blank' style='text-decoration:none;'>
                            <h3 style='font-family: cursive;'>Myver Tech Team</h3>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border='0' cellpadding='0' cellspacing='0' width='100%' class='space'>
                    <tbody>
                      <tr>
                        <td style='font-size:1px;line-height:1px' height='30'>&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>`,
  };
  sgMail
  .send(msg)
  .then(() => {
    console.log(`Email sent to ${email}`)
    return true;
  })
  .catch((error) => {
    console.log('Send-email-failed:',error.message);
      return false;
  });
  return true;
};


module.exports = sendEmail;
