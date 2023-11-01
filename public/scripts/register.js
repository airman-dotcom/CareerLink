let email = document.getElementById("email");

let psw = document.getElementById("psw");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let btn = document.getElementById("submit");
let modal_title = document.getElementById("title");
let modal_message = document.getElementById("message");
let close_btn = document.getElementById("close");
let modal = document.getElementById("alert");

btn.onclick = function(){
  const send_data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email: email.value, password: psw.value, fname: fname.value, lname: lname.value})
  }
  fetch("/auth", send_data)
  .then(res => res.json())
  .then(function(json){
    if (json.status){
      message(true);
    } else {
      message(false, json.message)
    }
  })
}

function message(type, m){
  modal.style.display = "grid";
  if (type == true){
    modal_title.innerHTML = "Account Created! Check your email inbox!";
    modal_message.innerHTML = "Check the inbox of the email you entered for a email confirmation link to confirm that you are in fact a real person."
    document.cookie = ""
  } else if (type =="close"){
    modal.style.display = "none";
    modal_title.innerText = "";
    modal_message.innerText = "";
  }else {
    modal_title.innerHTML = "An error has occured";
    modal_message.innerHTML = m;
  }
}

document.body.onclick = function(e){
  if (e.srcElement != modal && modal.style.display != "none"){
    message("close", 1);
  }
}