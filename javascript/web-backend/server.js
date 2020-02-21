"use strict";

const https = require("https");
const fs = require("fs");

const server = https.createServer({"key" : fs.readFileSync("privkey.pem"), "cert" : fs.readFileSync("fullchain.pem")}, function(request, response) {
  console.log(request.method, request.url);

  if(request.method === "OPTIONS") {
    response.writeHead(204,
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      });
    response.end();
  } else if(request.method === "POST") {
    // check request.url?
    getPostData().then(function(postData) {
      // sample jsonrpc post
      // curl -k -i -X POST -H 'Content-Type: application/json' -d '{"jsonrpc": "2.0", "id" : "id", "method" : "method", "params" : ["params"]}' https://127.0.0.1:8000
      console.log(postData["id"], postData["method"], postData["params"]);
      
      const clientRequestID = generateRandomID();
      response.writeHead(200,
        {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json"
        });
      response.end(JSON.stringify({"jsonrpc": "2.0", "id" : clientRequestID, "result" : "hello"}), "utf-8");
    });
  } else {
    response.writeHead(400);
    response.end();
  }
  
  function getPostData() {
    return new Promise(function(resolve) {
      let postData = "";
      request.on("data", function(chunk) {
        postData += chunk.toString();
      });
      request.on("end", function() {
        resolve(JSON.parse(postData));
      }); 
    });
  }
  
  // TODO crypto secure version
  function generateRandomID() {
    return Math.random().toString();
  }
});

server.listen(8000, "0.0.0.0");
console.log("Server running on 8000");
