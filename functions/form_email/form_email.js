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
  const emailBody = `${messageBody} \n\n\nFrom: ${email}`;
  const emailMessage = {
    to: blaEmail,
    from: senderEmail,
    subject: subjectText,
    text: emailBody,
    html: 
      `
        <p>
          ${messageBody.replace(/(\r\n|\n|\r)/gm, "<br>")}
        </p>
        <br><br>
        <p>
          <strong>
            Respond to:  
          </strong>${email}
        </p>`
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