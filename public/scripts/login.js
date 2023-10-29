let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let btn = document.getElementById("submit");
btn.onclick = function(){
  const send_data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username: uname, password:psw})
  }
  fetch("/auth", send_data)
}