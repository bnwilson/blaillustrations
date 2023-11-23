# Send Form Email Function

### Netlify Event Object
```TYPESCRIPT
interface ExampleNetlifyEvent {
  "path": string;
  "httpMethod": string; // Incoming request's method name,
  "headers": {[key: string]: string}; // Incoming request headers,
  "queryStringParameters": {[key: string]: string }; // query string parameters 
  "body": JSON<string>; // A JSON string of the request payload.
  "isBase64Encoded": string | boolean // A boolean flag to indicate if the applicable request payload is Base64-encode
}
```

### Example Message
```JSON
{
    "to": "testing@gmail.com",
    "from": "noreply@gmail.com",
    "subject": "Just tryin' it out",
    "text": "Blah blah blah x 100",
    "html": HTMLElement // <table><tbody><tr><td>Yep, you can send html</td></tr></tbody></table>
}
```