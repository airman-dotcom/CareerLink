let modal_title = document.getElementById("title");
let modal_message = document.getElementById("message");
let modal = document.getElementById("alert");

function show_alert(title, message) {
    modal.style.display = "grid";
    modal_title.innerHTML = title;
    modal_message.innerHTML = message;
}
document.body.onclick = function (e) {
    if (e.srcElement != modal && modal.style.display != "none") {
        modal.style.display = "none";
        modal_title.innerText = "";
        modal_message.innerText = "";
    }
}

document.body.onload = function () {
    let code = (document.cookie.split(";")[0]).split("=")[1];
    const send_data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({code: code})
    }
    fetch("/validate", send_data)
    .then(res => res.json())
    .then(function(json){
        if (json.status == false){
            show_alert("You must sign in to access CareerLink", "Redirecting you to the home page in 3 seconds.");
            setTimeout(function(){
                window.location.href = "/home";
            }, 2000)
        }
    })
}