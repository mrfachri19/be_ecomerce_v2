const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();
const sendMail = data => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    secure: false,
    auth: {
      user: process.env.EMAIL_SMTP,
      pass: process.env.PASS_SMTP
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.use("compile", hbs({
    viewEngine: {
      extname: ".html",
      partialsDir: path.resolve("./src/templates/email"),
      defaultLayout: false
    },
    viewPath: path.resolve("./src/templates/email"),
    extName: ".html"
  }));
  const mailOptions = {
    from: '"Coffee-Brings App" <mailtes260@gmail.com>',
    to: data.to,
    subject: data.subject,
    template: data.template,
    context: data.data
  };
  if (data.attachment) {
    if (data.attachment.length > 0) {
      mailOptions.attachment = data.attachment;
    }
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      reject(error);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Email sent ! ${info.response}`);
      resolve(info.response);
    }
  });
  // eslint-disable-next-line no-console
  console.log("SEND MAIL PROCESS WORKS!");
});
module.exports = sendMail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJub2RlbWFpbGVyIiwicmVxdWlyZSIsImhicyIsInBhdGgiLCJjb25maWciLCJzZW5kTWFpbCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRyYW5zcG9ydGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJIT1NUX1NNVFAiLCJwb3J0IiwiUE9SVF9TTVRQIiwic2VjdXJlIiwiYXV0aCIsInVzZXIiLCJFTUFJTF9TTVRQIiwicGFzcyIsIlBBU1NfU01UUCIsInRscyIsInJlamVjdFVuYXV0aG9yaXplZCIsInVzZSIsInZpZXdFbmdpbmUiLCJleHRuYW1lIiwicGFydGlhbHNEaXIiLCJkZWZhdWx0TGF5b3V0Iiwidmlld1BhdGgiLCJleHROYW1lIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwidGVtcGxhdGUiLCJjb250ZXh0IiwiYXR0YWNobWVudCIsImxlbmd0aCIsImVycm9yIiwiaW5mbyIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9lbWFpbC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlbWFpbGVyID0gcmVxdWlyZShcIm5vZGVtYWlsZXJcIik7XG5jb25zdCBoYnMgPSByZXF1aXJlKFwibm9kZW1haWxlci1leHByZXNzLWhhbmRsZWJhcnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5yZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xuXG5jb25zdCBzZW5kTWFpbCA9IChkYXRhKSA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICBob3N0OiBwcm9jZXNzLmVudi5IT1NUX1NNVFAsXG4gICAgICBwb3J0OiBwcm9jZXNzLmVudi5QT1JUX1NNVFAsXG4gICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgYXV0aDoge1xuICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5FTUFJTF9TTVRQLFxuICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5QQVNTX1NNVFAsXG4gICAgICB9LFxuICAgICAgdGxzOiB7XG4gICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdHJhbnNwb3J0ZXIudXNlKFxuICAgICAgXCJjb21waWxlXCIsXG4gICAgICBoYnMoe1xuICAgICAgICB2aWV3RW5naW5lOiB7XG4gICAgICAgICAgZXh0bmFtZTogXCIuaHRtbFwiLFxuICAgICAgICAgIHBhcnRpYWxzRGlyOiBwYXRoLnJlc29sdmUoXCIuL3NyYy90ZW1wbGF0ZXMvZW1haWxcIiksXG4gICAgICAgICAgZGVmYXVsdExheW91dDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHZpZXdQYXRoOiBwYXRoLnJlc29sdmUoXCIuL3NyYy90ZW1wbGF0ZXMvZW1haWxcIiksXG4gICAgICAgIGV4dE5hbWU6IFwiLmh0bWxcIixcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgZnJvbTogJ1wiQ29mZmVlLUJyaW5ncyBBcHBcIiA8bWFpbHRlczI2MEBnbWFpbC5jb20+JyxcbiAgICAgIHRvOiBkYXRhLnRvLFxuICAgICAgc3ViamVjdDogZGF0YS5zdWJqZWN0LFxuICAgICAgdGVtcGxhdGU6IGRhdGEudGVtcGxhdGUsXG4gICAgICBjb250ZXh0OiBkYXRhLmRhdGEsXG4gICAgfTtcblxuICAgIGlmIChkYXRhLmF0dGFjaG1lbnQpIHtcbiAgICAgIGlmIChkYXRhLmF0dGFjaG1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBtYWlsT3B0aW9ucy5hdHRhY2htZW50ID0gZGF0YS5hdHRhY2htZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCAoZXJyb3IsIGluZm8pID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coYEVtYWlsIHNlbnQgISAke2luZm8ucmVzcG9uc2V9YCk7XG4gICAgICAgIHJlc29sdmUoaW5mby5yZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhcIlNFTkQgTUFJTCBQUk9DRVNTIFdPUktTIVwiKTtcbiAgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRNYWlsO1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxZQUFZLENBQUM7QUFDeEMsTUFBTUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEQsTUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzVCQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0FBRTFCLE1BQU1DLFFBQVEsR0FBSUMsSUFBSSxJQUNwQixJQUFJQyxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFQyxNQUFNLEtBQUs7RUFDL0IsTUFBTUMsV0FBVyxHQUFHVixVQUFVLENBQUNXLGVBQWUsQ0FBQztJQUM3Q0MsSUFBSSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUztJQUMzQkMsSUFBSSxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csU0FBUztJQUMzQkMsTUFBTSxFQUFFLEtBQUs7SUFDYkMsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRVAsT0FBTyxDQUFDQyxHQUFHLENBQUNPLFVBQVU7TUFDNUJDLElBQUksRUFBRVQsT0FBTyxDQUFDQyxHQUFHLENBQUNTO0lBQ3BCLENBQUM7SUFDREMsR0FBRyxFQUFFO01BQ0hDLGtCQUFrQixFQUFFO0lBQ3RCO0VBQ0YsQ0FBQyxDQUFDO0VBRUZmLFdBQVcsQ0FBQ2dCLEdBQUcsQ0FDYixTQUFTLEVBQ1R4QixHQUFHLENBQUM7SUFDRnlCLFVBQVUsRUFBRTtNQUNWQyxPQUFPLEVBQUUsT0FBTztNQUNoQkMsV0FBVyxFQUFFMUIsSUFBSSxDQUFDSyxPQUFPLENBQUMsdUJBQXVCLENBQUM7TUFDbERzQixhQUFhLEVBQUU7SUFDakIsQ0FBQztJQUNEQyxRQUFRLEVBQUU1QixJQUFJLENBQUNLLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztJQUMvQ3dCLE9BQU8sRUFBRTtFQUNYLENBQUMsQ0FDSCxDQUFDO0VBRUQsTUFBTUMsV0FBVyxHQUFHO0lBQ2xCQyxJQUFJLEVBQUUsNENBQTRDO0lBQ2xEQyxFQUFFLEVBQUU3QixJQUFJLENBQUM2QixFQUFFO0lBQ1hDLE9BQU8sRUFBRTlCLElBQUksQ0FBQzhCLE9BQU87SUFDckJDLFFBQVEsRUFBRS9CLElBQUksQ0FBQytCLFFBQVE7SUFDdkJDLE9BQU8sRUFBRWhDLElBQUksQ0FBQ0E7RUFDaEIsQ0FBQztFQUVELElBQUlBLElBQUksQ0FBQ2lDLFVBQVUsRUFBRTtJQUNuQixJQUFJakMsSUFBSSxDQUFDaUMsVUFBVSxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQzlCUCxXQUFXLENBQUNNLFVBQVUsR0FBR2pDLElBQUksQ0FBQ2lDLFVBQVU7SUFDMUM7RUFDRjtFQUVBN0IsV0FBVyxDQUFDTCxRQUFRLENBQUM0QixXQUFXLEVBQUUsQ0FBQ1EsS0FBSyxFQUFFQyxJQUFJLEtBQUs7SUFDakQsSUFBSUQsS0FBSyxFQUFFO01BQ1RoQyxNQUFNLENBQUNnQyxLQUFLLENBQUM7SUFDZixDQUFDLE1BQU07TUFDTDtNQUNBRSxPQUFPLENBQUNDLEdBQUcsQ0FBRSxnQkFBZUYsSUFBSSxDQUFDRyxRQUFTLEVBQUMsQ0FBQztNQUM1Q3JDLE9BQU8sQ0FBQ2tDLElBQUksQ0FBQ0csUUFBUSxDQUFDO0lBQ3hCO0VBQ0YsQ0FBQyxDQUFDO0VBQ0Y7RUFDQUYsT0FBTyxDQUFDQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBQ0pFLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHMUMsUUFBUSJ9