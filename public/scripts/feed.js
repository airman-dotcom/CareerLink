let modal_title = document.getElementById("title");
let modal_message = document.getElementById("message");
let modal = document.getElementById("alert");

function show_alert(title, message){
    modal.style.display = "grid";
    modal_title.innerHTML = title;
    modal_message.innerHTML = message;
}
document.body.onclick = function(e){
    if (e.srcElement != modal && modal.style.display != "none"){
        modal.style.display = "none";
        modal_title.innerText = "";
        modal_message.innerText = "";
    }
  }