function MessageBox(title, message)
{
	var mb = {},
		back = document.createElement('div'),
		container = document.createElement('div'),
		t = document.createElement('h2'),
		m = document.createElement('h4'),
		buttons = document.createElement('div'),
		yes = document.createElement('button'),
		no = document.createElement('button');
	mb.close = function ()
	{
		container.parentNode.removeChild(container);
		back.parentNode.removeChild(back);
	};
	mb.show = function()
	{
		var res = "void",
			inter,
			asyn = new Promise((resolve, reject) => {
				inter = setInterval(function(){
					if(res === "YES" || res === "NO")
					{
						resolve(res);
						clearInterval(inter);
					}
				}, 1);
			});
		back.className = "mb_back";
		container.className = "messageBox";
		t.className = "mb_title";
		t.textContent = title;
		m.className = "mb_message";
		m.textContent = message;
		buttons.className = "mb_buttons";
		yes.className = "mb_yes";
		yes.innerHTML = '<i class="fas fa-check"></i>';
		yes.onclick = function(){ mb.close(); res = "YES" };
		no.onclick = function(){ mb.close(); res = "NO" };
		no.className = "mb_no";
		no.innerHTML = '<i class="fas fa-times"></i>';
		buttons.append(yes, no);
		container.append(t, m, buttons);
		document.body.append(container, back);
		return asyn;
	};
	return mb;
}

function checkRole()
{
	var user = JSON.parse(localStorage.getItem("user")),
		employee = document.getElementById("employeeTag"),
		sale = document.getElementById("saleTag");
	if(user !== null)
	{
		if(!location.href.includes("index.html"))
		{
			if(user.role === "employee")
			{
				if(employee !== undefined && employee != null)
				{
					employee.remove();
				}
			}
		}
		else
		{
			if(user.role === "admin")
			{
				location.assign("./pages/employees.html");
			}
			else
			{
				location.assign("./pages/sales.html");
			}
		}
	}
	else if(!location.href.includes("index.html")){
		location.assign("../index.html");
	}
}

function checkEmail(email)
{
	var emailPattern = /\S+@\S+\.\S+/;
	if (emailPattern.test(email.toLocaleLowerCase()))
	{
		return true;
	}
	else
	{
		return false;
	}
}
function TimedToast(message, interval, isError, root, Class, ClassError)
{
	var t= {},
		toast = document.createElement("div"),
		parent = document.getElementById("app");
	if (!isError)
	{
		toast.className = "toast_success";
	}
	else{
		toast.className = "toast_failure";
	}
	toast.textContent = message;
	t.show = function (){
		if(root === undefined || root === null)
		{
			parent.appendChild(toast);
		}
		else{
			root.append(toast)
		}
		setTimeout(function(){
			if(root === undefined || root === null)
			{
				parent.removeChild(toast);
			}
			else{
				root.removeChild(toast);
			}
		},interval);
	}
	return (t);
}

function CompanyFrom()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		name = document.createElement("input"),
		adress = document.createElement("input"),
		fix = document.createElement("input"),
		email = document.createElement("input"),
		website = document.createElement("input"),
		fileUploader = document.createElement("div"),
		upload = document.createElement("button"),
		uplodedImage = document.createElement("img"),
		logo = document.createElement("input"),
		type = document.createElement("select"),
		sarl = document.createElement("option"),
		defaultType = document.createElement("option"),
		sa = document.createElement("option"),
		snc  = document.createElement("option"),
		scs = document.createElement("option"),
		sca = document.createElement("option"),
		fname = document.createElement("input"),
		lname = document.createElement("input"),
		uname = document.createElement("input"),
		passwd = document.createElement("input"),
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
	back.className = "form_Background";
	form.className = "form_form";
	title.className = "form_Title";
	name.className = "form_Text ui_padding_8";
	adress.className = "form_Text ui_padding_8";
	fix.className = "form_Text ui_padding_8";
	email.className = "form_Text ui_padding_8";
	website.className = "form_Text ui_padding_8";
	fileUploader.className = "form_Uploader";
	upload.className = "form_Ok_Button";
	create.className = "form_Ok_Button";
	create.textContent = "Crèer";
	uplodedImage.className = "form_uploaded_image";
	logo.className = "form_File";
	type.className = "form_Select ui_padding_8";
	defaultType.textContent = "Sélectionner un type";
	defaultType.value = "0";
	sarl.textContent = "SARL";
	sarl.value = "SARL";
	sa.textContent = "SA";
	sa.value = "SA";
	snc.textContent = "SNC";
	snc.value = "SNC";
	scs.textContent = "SCS";
	scs.value = "SCS";
	sca.textContent = "SCA";
	sca.value = "SCA";
	type.append(defaultType, sarl, sa, snc, scs, sca);
	uname.className = "form_Text ui_padding_8";
	fname.className = "form_Text ui_padding_8";
	lname.className = "form_Text ui_padding_8";
	passwd.className = "form_Text ui_padding_8";
	title.textContent = "Créer un compte société";
	upload.textContent = "Ajouter un logo";
	name.type = "text";
	fname.type = "text";
	lname.type = "text";
	adress.type = "text";
	fix.type = "text";
	email.type = "email";
	website.type = "text";
	logo.type = "file";
	logo.accept="image/*";
	uname.type = "text";
	passwd.type = "password";
	name.placeholder = "Nom";
	adress.placeholder = "Addresse";
	fix.placeholder = "Fixe";
	email.placeholder = "Email";
	website.placeholder = "Site web";
	uname.placeholder = "Nom d'utilisateur";
	fname.placeholder = "Prénom du gérant";
	lname.placeholder = "Nom du gérant";
	passwd.placeholder = "Mot de passe";
	fileUploader.append(uplodedImage, upload, logo);
	form.append(title, name, adress, fix, email, website, fileUploader, type, fname, lname, uname, passwd, create);
	CForm.append(back, form);
	document.body.append(CForm);
	};
	create.onclick = function (){
		if (name.value === "")
		{
			name.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			name.style.border = "thin solid #222222";
		}
		if (email.value === "" || !checkEmail(email.value))
		{
			email.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			email.style.border = "thin solid #222222";
		}
		if (adress.value === "")
		{
			adress.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			adress.style.border = "thin solid #222222"
		}
		if (uname.value === "")
		{
			uname.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			uname.style.border = "thin solid #222222"
		}
		if (fname.value === "")
		{
			fname.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			fname.style.border = "thin solid #222222"
		}
		if (lname.value === "")
		{
			lname.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			lname.style.border = "thin solid #222222"
		}
		if (passwd.value === "")
		{
			passwd.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			passwd.style.border = "thin solid #222222"
		}
		if (type.value === "0")
		{
			type.style.border = "2px solid #e74c3c";
			return 0;
		}
		else{
			type.style.border = "thin solid #222222"
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/companyEndPoint.php",
			data: {
				"operation":"create",
				"name":name.value,
				"address":adress.value,
				"email":email.value,
				"fix":fix.value,
				"website":website.value,
				"logo":uplodedImage.src,
				"type":type.value,
				"active":"1",
				"AUname":uname.value,
				"AFname":fname.value,
				"ALname":lname.value,
				"APasswd":passwd.value,
			},
			good:function(data, status){
				if (data == "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Email déja utilisé";
				}
				else if (data == "Username taken")
				{
					uname.style.border = "2px solid #e74c3c";
					uname.value = "Nom d'utilisateur déja utilisé";
				}
				else if (data = "OK")
				{
					var toast = new TimedToast("Compte créer avec succés", 3000, false);
					toast.show();
					back.click();
				}
				else{
					var toast = new TimedToast("Une erreur est apparue", 3000, true);
					toast.show();
					back.click();
				}
			},
			bad:function(data, status)
			{
				var toast = new TimedToast("Une erreur est apparue", 3000, true);
				toast.show();
			}
		});
	};
	upload.onclick = function (){
		logo.click();
	};
	logo.onchange = function (event){
		var file = new FileReader(),
			blob = event.target.files[0];
		file.onload = function (evn)
		{
			uplodedImage.src = evn.target.result.toString();
		}
		file.readAsDataURL(blob);
	};
	return cf;
}


function Login(uname, passwd)
{
	bridge({
		method:"POST",
		url:"https://controller.nuniverse.org/controllers/loginEndPoint.php",
		data:{"operation":"login","uname":uname, "passwd":passwd},
		good:function(data, status){
			if (data == "refuse")
			{
				var toast = new TimedToast("Login ou mot de passe incorrecte", 3000, true);
				toast.show();
			}
			else{
				localStorage.setItem("user", data);
				if(JSON.parse(data).role === "admin")
				{
					location.assign("./pages/employees.html");	
				}
				else{
					location.assign("./pages/sales.html");
				}
			}
		},
		bad:function(data, status)
		{
			var toast = new TimedToast("Une erreur est apparue", 3000, true);
			toast.show();
		}
	});
}

document.onreadystatechange = function(){
	if (document.readyState === 'complete' && location.href.includes("index.html"))
	{
		checkRole();
		var create = document.getElementById("create"),
			connect = document.getElementById("loginButton");
		connect.addEventListener("click", function (){
			var uname = document.getElementById("uname").value,
				passwd = document.getElementById("passwd").value;
			Login(uname, passwd);
		});
		create.onclick = function (){
			var cf = new CompanyFrom();
			cf.create();
		};
	}
}