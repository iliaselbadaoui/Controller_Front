var logout = document.getElementById("logout");
logout.onclick = function(){
	localStorage.removeItem("user");
	location.assign("../index.html");
}