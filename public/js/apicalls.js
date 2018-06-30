function log() {


var url = "https://bms-yoga-dev.herokuapp.com/user/login/"

var user=document.getElementById("email_login").value;
var pw=document.getElementById("password_login").value;
var data = {};
data.email = user;
data.password  = pw;

var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
var users = JSON.parse(xhr.responseText);

if (xhr.readyState == 4 && xhr.status == "401") {
  alert("WRONG EMAIL ID OR PASSWORD");
} else {
  alert("LOGIN SUCCESSFUL!");
}
}
xhr.send(json);

}


function valid()
  {
   
var pw=document.getElementById("password").value;
var cpw=document.getElementById("password_con").value; 
    if (pw != cpw)
    {
      alert("Mismatch in Pw");
    }
    else
    {
      res();
    }
  }
  function res() {


var url = "https://bms-yoga-dev.herokuapp.com/user/signup/"

var user=document.getElementById("email").value;
var pw=document.getElementById("password").value;
var data = {};
data.email = user;
data.password  = pw;

var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
var users = JSON.parse(xhr.responseText);

if (xhr.readyState == 4 && xhr.status == "201") {
  alert("REGISTERED SUCCESSFULLY");
} else {
  alert("ALL FIELDS REQUIRED");
}
}
xhr.send(json);

}

