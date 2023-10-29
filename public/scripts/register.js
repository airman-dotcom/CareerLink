let email = document.getElementById("email");
let psw = document.getElementById("psw");
let uname = document.getElementById("uname");
let btn = document.getElementById("submit");
btn.onclick = function(){
  const send_data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email: email.value, password: psw.value, username: uname.value})
  }
  fetch("/auth", send_data)
}