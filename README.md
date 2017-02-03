## Chat App

This is a chat app developed using Node.js, Express, Socket.io and Angular2 to meet the requirements of the Arctic Empire code test. For the purposes of this test I have created a mock database however it would be considerably more elegant to wire this app up with MongoDB&Mongoose for persistence. 

## Usage

1. Clone repo or unzip from file provided 
2. "cd" into the root directory chat-app-arctic/
3. Run "npm install"
4. Run "npm start"
5. When creating a room the creator email is already added so no need to include your own email and each email must be separated with a ',' 



## Bugs

Due to the short turn around on the deadline that I received from Andrea, there exits a bug where chat room connections can persist after having left the conversation. This can result in multiple calls being made from the same event. I believe that this is caused by the Angular2 routing and should be possible to fix by firing a disconnect between page views.


