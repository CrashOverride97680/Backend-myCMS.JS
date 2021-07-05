const domain = (process.env.NODE_ENV_DOMAIN_NAME_SMTP) ? process.env.NODE_ENV_DOMAIN_NAME_SMTP : 'localhost';
module.exports = `
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0;">
   <meta name="format-detection" content="telephone=no"/>
   <style>
      /* Reset styles */ 
      body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
      body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
      img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
      /* Rounded corners for advanced mail clients only */ 
      @media all and (min-width: 560px) {
      .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px; }
      }
      /* Set color for auto links (addresses, dates, etc.) */ 
      a, a:hover {
      color: #FFFFFF;
      }
      .footer a, .footer a:hover {
      color: #828999;
      }
   </style>
   <title>Test Email</title>
</head>
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
   background-color: #2D3445;
   color: #FFFFFF;"
   bgcolor="#2D3445"
   text="#FFFFFF">
   <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
      <tr>
         <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
            bgcolor="#2D3445">
            <!-- WRAPPER -->
            <!-- Set wrapper width (twice) -->
            <table border="0" cellpadding="0" cellspacing="0" align="center"
               width="500" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
               max-width: 500px;" class="wrapper">
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 0px;" class="hero">
                     <a target="_blank" style="text-decoration: none;" href="${domain}">
                        <img border="0" vspace="0" hspace="0"
                        src="${domain}/mediaEmail/logoEmail.png"
                        alt="myCMS.JS Logo" title="Logo cms"
                        width="340" style="
                        width: 87.5%;
                        max-width: 340px;
                        color: #FFFFFF; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/>
                     </a>
                  </td>
               </tr>
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 14px; font-weight: 400; line-height: 150%; letter-spacing: 2px;
                     padding-top: 27px;
                     padding-bottom: 0;
                     color: #FFFFFF;
                     font-family: sans-serif;" class="supheader">
                     TESTING EMAIL USER
                  </td>
               </tr>
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;  padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                     padding-top: 5px;
                     color: #FFFFFF;
                     font-family: sans-serif;" class="header">
                     Test for see if server send email
                  </td>
               </tr>
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                     padding-top: 15px; 
                     color: #FFFFFF;
                     font-family: sans-serif;" class="paragraph">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus fermentum justo, faucibus viverra mauris accumsan sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus varius libero nec porttitor pulvinar. Phasellus nec commodo nisi, non sagittis ligula. Quisque neque nisi, posuere sit amet leo sed, laoreet consequat turpis. In aliquet consectetur maximus. Proin iaculis erat sit amet libero pulvinar, a tempor nisi placerat.
                  </td>
               </tr>
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                     padding-top: 25px;
                     padding-bottom: 5px;" class="button">
                     <a
                        href="https://github.com/CrashOverride97680/myCMS.JS" target="_blank" style="text-decoration: underline;">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                           <tr>
                              <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                                 bgcolor="#E9703E">
                                 <a target="_blank" style="text-decoration: underline;
                                 color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
                                 href="https://github.com/CrashOverride97680/myCMS.JS">
                                    View on Github
                                 </a>
                              </td>
                           </tr>
                        </table>
                     </a>
                  </td>
               </tr>
               <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                     padding-top: 30px;" class="line">
                     <hr
                        color="#565F73" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                  </td>
               </tr>
            </table>
         </td>
      </tr>
   </table>
</body>
</html>
`;
