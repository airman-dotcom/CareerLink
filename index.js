const express = require("express")
const app = express();
const http = require("http");
const API_KEY = "497bc1d03a0821a85fe76f672121288b";
const SECRET = "ef366fcf0176d1cb7f74a49d90840c74";
const server = http.createServer(app);
const fs = require("fs");
const mailjet = require("node-mailjet")
let client = mailjet.Client.apiConnect(API_KEY, SECRET);

const { Server } = require("socket.io");
const io = new Server(server);
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { json } = require("express");
let MONGO_URI = "mongodb+srv://careerlinkdhs:sahra253@careerlink.ktuwj9q.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI)
let db = mongoose.connection
const kittySchema = new mongoose.Schema()
app.use(express.static("public"));
app.use(express.json());
let users = {};
const port = process.env.PORT || 8000;
let num = 1;
let info;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let user1;
server.listen(port, function() {
  console.log("Server Starting")
})
let credentials = db.collection("Credentials")
mongoose.connection.on("connected", (err) => {
  if (err) {
    console.log(err)
  }
  console.log("Connected to database")
  console.log(credentials)
})
let list_files = fs.readdirSync("public");
list_files = list_files.filter((name) => name.includes("."));
for (let i=0; i<list_files.length; i++) {
  let file = list_files[i].slice(0, list_files[i].indexOf("."));
  app.get(`/${file}`, (req, res) => {
    res.sendFile(__dirname + `/public/${file}.html`)
  })
}
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
})

async function send_mail(sender, rec, title, message, html){
  const request = client.post("send", {version: "v3.1"})
  .request({
    "Messages":[
      {
        "From": sender,
        "To": rec,
        "Subject": title,
        "TextPart": message,
        "HTMLPart": html
      }
    ]
  })
  request.then((result) => {
    share_result_email(result.body);
  })
}

function share_result_email(info){
  
}

app.post("/auth", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (Object.keys(req.body).includes("email")){
    //Registration
    credentials.findOne({username: username}, (err, data) => {
      if (data != null){
        res.json({status: false, message:  "Username already exists"})
      } else {
        let uuid = uuidv4();
        
        credentials.insertOne({username: username, password: password, email: req.body.email, id: uuid})
        console.log(credentials)
        res.json({status: true});
        return;
      }
    })
  }
    
  else {
    //login
    credentials.findOne({username: username}, (err, data) => {
      console.log(data);
    })
  }
})

let a = "<h1>Hellow!</h1>";
send_mail({"Email": "careerlink.dhs@gmail.com", "Name": "Career Link"}, [{"Email": "amathakbari@gmail.com", Name: "Arman Akbari"}], "test!", "Hellow!", a);