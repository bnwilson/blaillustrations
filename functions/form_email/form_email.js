// ******** Netlify event object ********
// {
//   "path": "Path parameter",
//   "httpMethod": "Incoming request's method name"
//   "headers": {Incoming request headers}
//   "queryStringParameters": {query string parameters }
//   "body": "A JSON string of the request payload."
//   "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
// }

// ******** Send Grid email object sample ********
// exampleMsg = {
//     to: "testing@gmail.com",
//     from: "noreply@gmail.com",
//     subject: "Just tryin' it out",
//     text: "Blah blah blah x 100",
//     html: <table><tbody><tr><td>Yep, you can send html</td></tr></tbody></table>
// }

// Packages
const sgMail = require('@sendgrid/mail');

// Env Variables
const blaEmail = process.env.BLA_EMAIL || "test@example.com";
const senderEmail = process.env.SENDER_EMAIL || "test@example.com";
const sendGridApiKey = process.env.SENDGRID_API_KEY;

// handler for Netlify/Lambda function
exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const {firstName, lastName, subject, messageBody, email} = data;
  const subjectText = (firstName || lastName) ? 
    `${subject} from ${firstName} ${lastName}` :
    `${subject} from ${email.split("@")[0]}`;
  const plainTextBody = `${messageBody} \r\n\r\n\nFrom: ${email}`;
  const emailHtmlBody = buildHtmlBody(data);
  const emailMessage = {
    to: blaEmail,
    from: senderEmail,
    subject: subjectText,
    html: emailHtmlBody
  }

  sgMail.setApiKey(sendGridApiKey); 

  sgMail
  .send(emailMessage)
  .then((response) => {
    // If the message was successfully sent, we log the object to the console.
    // This enables us to see what was sent directly in the Netlify logs.
    console.log("Message sent => ", emailMessage, "\nResponse => ", response);
    // The callback in this form tells the service initiating this function
    // that it was successful.
    callback(null, {
      statusCode: 200,
      body: "Message sent successfully",
    });
  })
  .catch((err) => {
    callback(null, {
      statusCode: 501,
      body: {
        message: "Email was not sent or parsed correctly",
        error: err
      }
    });
  });
};

function buildHtmlBody (formData) {
  const {firstName, lastName, subject, messageBody, email} = formData;
  const tableStyle = "font-family:arial sans-serif;border-collapse: collapse; width:100%;"
  const msgBody = `<p style="font-size:1.5rem">${messageBody.replace(/(\r\n|\n|\r)/gm, "<br>")}</p>` + 
                  `<br><br>` +
                  `<p><strong> Respond to: </strong>${email}</p>`
  const msgTable =  `<table style=${tableStyle}>` + 
                    `<tr><th>Subject</th><td>${subject}</td></tr>`
                    `<tr><th>First Name</th><td>${firstName}</td></tr>` +
                    `<tr><th>Last Name</th><td>${lastName}</td></tr>` +
                    `<tr><th>Email</th><td>${email}</td></tr>` +
                    `<tr><th>Message</th><td style="overflow:scroll">${messageBody}</td></tr>` +
                  `</table>`
  return `${msgBody}<br><br>${msgTable}`;
}