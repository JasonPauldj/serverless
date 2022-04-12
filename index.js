const AWS = require('aws-sdk')
var ses = new AWS.SES();

exports.handler = async (event) => {
 
    console.log(event);
    const sns = event.Records[0].Sns;
    console.log(sns);

    const message = JSON.parse(sns.Message);

    const to = message.username;
    const token = message.token;

    console.log(to);
    console.log(token);

    const inputParams = {
        SourceArn: "arn:aws:ses:us-east-1:502560949037:identity/dev.jasonpauldj.me",
        Source:"test@dev.jasonpauldj.me",
        Destination: {
            ToAddresses: ["success@simulator.amazonses.com"]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "This is the message body in text format."
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Test email"
            }
        }
    }

    ses.sendEmail(inputParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });


    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};



//event object
// Records: [
//     {
//       EventSource: 'aws:sns',
//       EventVersion: '1.0',
//       EventSubscriptionArn: 'arn:aws:sns:us-east-1:502560949037:TestTopic:349cda3a-d959-4f2a-986c-23363615e435',
//       Sns: [Object]
//     }
//   ]

//sns Object
// Type: 'Notification',
//   MessageId: '2cc31e30-80e7-5e3b-9c25-44fe52950456',
//   TopicArn: 'arn:aws:sns:us-east-1:502560949037:TestTopic',
//   Subject: null,
//   Message: '{"username":"jane9.doe@example.com","token":"123456789"}',
//   Timestamp: '2022-04-12T01:04:50.815Z',
//   SignatureVersion: '1',
//   Signature: 'GeVo2Qolz2k+yJtDL3fy8DDt5rLUQig9eyYYPmTBG5dpvCAfdwQbnSntMW3v+avCYhU2OivtP2L51F4NKRCGyKR7trzHcifUTI4nwgwKlNHX6zn8Bh+K3IsjyAQP1VZqUKc0XT8ftH0TxQu7NBx64XxQV7Y1me1SWqBRgnZhmpeK5hJWFh01wI756FR72ukFKWH5++dxMGiUybxiQhc9eOe2/FpArR+MSzXvYMWk0O/mnOZOVLgi2jPvAdmjyVS1CU4WnH5sah8SwjOwodJxTjXU071SgGttE8yNuqaDtQZUVfXA9kEWXyBU0G09yJt/wmAjp+XUU2AbgajFVjXMxw==',
//   SigningCertUrl: 'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem',
//   UnsubscribeUrl: 'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:502560949037:TestTopic:349cda3a-d959-4f2a-986c-23363615e435',
//   MessageAttributes: {}