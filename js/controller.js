function EmployeFrom()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		fname = document.createElement("input"),
		lname = document.createElement("input"),
		adress = document.createElement("input"),
		tel = document.createElement("input"),
		cni = document.createElement("input"),
		embauche = document.createElement("input"),
		email = document.createElement("input"),
		sexe = document.createElement("select"),
		def = document.createElement("option"),
		male = document.createElement("option"),
		female = document.createElement("option"),
		uname = document.createElement("input"),
		passwd = document.createElement("input"),
		user = JSON.parse(localStorage.getItem("user"));
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		title.className = "form_Title";
		fname.className = "form_Text";
		lname.className = "form_Text";
		adress.className = "form_Text";
		tel.className = "form_Text";
		email.className = "form_Text";
		sexe.className = "form_Select";
		cni.className = "form_Text";
		embauche.className = "form_Text";
		embauche.title = "Date d'embauche";
		create.className = "form_Ok_Button";
		create.textContent = "Crèer";
		uname.className = "form_Text";
		passwd.className = "form_Text";
		title.textContent = "Créer un compte employé";
		name.type = "text";
		adress.type = "text";
		tel.type = "text";
		embauche.type = "date";
		email.type = "email";
		cni.type = "text";
		uname.type = "text";
		passwd.type = "password";
		adress.placeholder = "Addresse";
		tel.placeholder = "Téléphone";
		email.placeholder = "Email";
		cni.placeholder = "CNI";
		def.textContent = "Sexe";
		def.value = "sex";
		male.textContent = "Homme";
		male.value = "m";
		female.textContent = "Femme";
		female.value = "f";
		fname.placeholder = "Prénom";
		lname.placeholder = "Nom";
		uname.placeholder = "Nom d'utilisateur";
		passwd.placeholder = "Mot de passe";
		sexe.append(def, male, female);
		form.append(title, lname, fname, adress, tel, email, sexe, cni, embauche,uname, passwd, create);
		CForm.append(back, form);
		document.body.append(CForm);
	};
	create.onclick = function (){
		var flag = false;
		if (sexe.value === "sex")
		{
			sexe.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			sexe.style.border = "thin solid #222222";
		}
		if (fname.value === "")
		{
			fname.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			fname.style.border = "thin solid #222222";
		}
		if (lname.value === "")
		{
			lname.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			lname.style.border = "thin solid #222222";
		}
		if (email.value === "" || !checkEmail(email.value))
		{
			email.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			email.style.border = "thin solid #222222";
		}
		if (adress.value === "")
		{
			adress.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			adress.style.border = "thin solid #222222"
		}
		if (uname.value === "")
		{
			uname.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			uname.style.border = "thin solid #222222"
		}
		if (passwd.value === "")
		{
			passwd.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			passwd.style.border = "thin solid #222222"
		}
		if (embauche.value == "")
		{
			embauche.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else
		{
			embauche.style.border = "thin solid #222222";
		}
		if (flag)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/employeeEndPoint.php",
			data: {
				"operation":"create",
				"fname": fname.value,
				"lname": lname.value,
				"uname": uname.value,
				"email": email.value,
				"passwd": passwd.value,
				"cni": cni.value,
				"sex":sexe.value,
				"adress": adress.value,
				"tel": tel.value,
				"company": user.company,
				"embauche": embauche.value
			},
			good:function(data, status){
				if (data === "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Email déja utilisé";
				}
				else if (data === "Username taken")
				{
					uname.style.border = "2px solid #e74c3c";
					uname.value = "Nom d'utilisateur déja utilisé";
				}
				else if (data === "CNI taken")
				{
					cni.style.border = "2px solid #e74c3c";
					cni.value = "CNI déja utilisé";
				}
				else if (data === "OK")
				{
					var toast = new TimedToast("Compte créer avec succés", 3000, false);
					toast.show();
					back.click();
					getEmployees();
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
	return cf;
}

function updateEmployee(employee)
{
	var cf = {},
	CForm = document.createElement("div"),
	back = document.createElement("div"),
	form = document.createElement("div"),
	title = document.createElement("h3"),
	fname = document.createElement("input"),
	lname = document.createElement("input"),
	adress = document.createElement("input"),
	tel = document.createElement("input"),
	cni = document.createElement("input"),
	embauche = document.createElement("input"),
	release = document.createElement("input"),
	email = document.createElement("input"),
	uname = document.createElement("input"),
	sexe = document.createElement("select"),
	def = document.createElement("option"),
	male = document.createElement("option"),
	female = document.createElement("option"),
	user = JSON.parse(localStorage.getItem("user"));
	create = document.createElement("button");
back.onclick = function (){
	CForm.parentElement.removeChild(CForm);
};
cf.create = function (){
	CForm.className = "form_Container";
	back.className = "form_Background";
	form.className = "form_form";
	title.className = "form_Title";
	fname.className = "form_Text";
	lname.className = "form_Text";
	adress.className = "form_Text";
	tel.className = "form_Text";
	email.className = "form_Text";
	sexe.className = "form_Select";
	cni.className = "form_Text";
	uname.className = "form_Text";
	embauche.className = "form_Text";
	release.className = "form_Text";
	create.className = "form_Ok_Button";
	create.textContent = "Valider";
	title.textContent = "Mettre à jour un employé";
	name.type = "text";
	adress.type = "text";
	tel.type = "text";
	embauche.type = "date";
	release.type = "date";
	embauche.title = "Date d'embauche";
	release.title = "Date fin d'embauche";
	email.type = "email";
	cni.type = "text";
	adress.placeholder = "Addresse";
	tel.placeholder = "Téléphone";
	email.placeholder = "Email";
	uname.placeholder = "Nom d'utilisateur";
	cni.placeholder = "CNI";
	def.textContent = "Sexe";
	def.value = "sex";
	male.textContent = "Homme";
	male.value = "m";
	female.textContent = "Femme";
	female.value = "f";
	fname.placeholder = "Prénom";
	lname.placeholder = "Nom";
	sexe.append(def, male, female);
	form.append(title, lname, fname, uname,adress, tel, email, sexe, cni, embauche, release, create);
	CForm.append(back, form);
	document.body.append(CForm);
	sexe.value = employee.sex;
	fname.value = employee.fname;
	lname.value = employee.lname;
	adress.value = employee.adress;
	email.value = employee.email;
	uname.value = employee.uname;
	embauche.value = employee.embauche;
	cni.value = employee.cni;
	tel.value = employee.tel;
	if (employee.release != null)
	{
		release.value = employee.release;
	}
};
create.onclick = function (){
	var flag = false;
	if (sexe.value === "sex")
	{
		sexe.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		sexe.style.border = "thin solid #222222";
	}
	if (fname.value === "")
	{
		fname.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		fname.style.border = "thin solid #222222";
	}
	if (uname.value === "")
	{
		uname.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		uname.style.border = "thin solid #222222";
	}
	if (lname.value === "")
	{
		lname.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		lname.style.border = "thin solid #222222";
	}
	if (email.value === "" || !checkEmail(email.value))
	{
		email.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		email.style.border = "thin solid #222222";
	}
	if (adress.value === "")
	{
		adress.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else{
		adress.style.border = "thin solid #222222"
	}
	if (embauche.value == "")
	{
		embauche.style.border = "2px solid #e74c3c";
		flag = true;
	}
	else
	{
		embauche.style.border = "thin solid #222222";
	}
	if (flag)
	{
		return 0;
	}
	bridge({
		method:"POST",
		url: "https://controller.nuniverse.org/controllers/employeeEndPoint.php",
		data: {
			"operation":"update",
			"fname": fname.value,
			"lname": lname.value,
			"uname": uname.value,
			"email": email.value,
			"passwd": employee.passwd,
			"cni": cni.value,
			"sex":sexe.value,
			"adress": adress.value,
			"tel": tel.value,
			"embauche": embauche.value,
			"release":release.value,
			"id":employee.id,
			"company":employee.company
		},
		good:function(data, status){
			if (data === "OK")
			{
				var toast = new TimedToast("Employé mis à jour avec succés", 3000, false);
				toast.show();
				getEmployees();
				back.click();
			}
			else if (data === "CNI taken")
			{
				cni.style.border = "2px solid #e74c3c";
				cni.value = "Une employè à dèja ce CNI";
			}
			else if (data === "Email taken")
			{
				email.style.border = "2px solid #e74c3c";
				email.value = "Une employè à dèja cet email";
			}
			else if (data === "Username taken")
			{
				uname.style.border = "2px solid #e74c3c";
				uname.value = "nom d'utilisateur pris";
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
return cf;
}

function createEmployeeCard(employee)
{
	var employees = document.getElementById("list_emp"),
		card = document.createElement("div"),
		user = localStorage.getItem("user");
		fullName = document.createElement("div"),
		update = document.createElement("button"),
		print = document.createElement("button");
	card.className = "ui_card";
	fullName.className = "ui_card_text";
	print.className = "ui_tab";
	update.className = "ui_tab";

	fullName.textContent = employee.lname+" "+employee.fname;
	print.innerHTML = '<i class="fal fa-print"></i>';
	update.innerHTML = '<i class="fal fa-edit"></i>';
	print.title = "Attestation de travail";
	update.title = "Modifier";
	card.append(fullName, print, update);
	employees.append(card);
	update.onclick = function (){
		var ep = new updateEmployee(employee);
		ep.create();
	};
	print.onclick = function(){
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/getWorkAttestation.php",
			data: {
				"emp":JSON.stringify(employee),
				"su":user
			},
			good:function(data, status){
				pdf = document.createElement("a");
				pdf.href = data;
				pdf.download = employee.fname+"_"+employee.lname;
				pdf.click();
			},
			bad:function(data, status)
			{
				var toast = new TimedToast("Une erreur de serveur", 3000, true);
				toast.show();
			}
		});
	};
}

function createEmployeesList(data)
{
	data.forEach(employee => {
		createEmployeeCard(employee)
	});
}

function getEmployees(key)
{
	var employees = document.getElementById("emptyList"),
		user = JSON.parse(localStorage.getItem("user")),
		list = document.getElementById("list_emp"),
		childes = document.getElementsByClassName("ui_card");
		for (let i = 0; i < childes.length; i++) {
			childes[i].remove();
			i--;
		}
	if (key === null || key === undefined || key === "")
	{
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/companyEndPoint.php",
			data: {
				"operation":"getEmployees",
				"id": user.company
			},
			good:function(data, status){
				if (data == "[]")
				{
					employees.textContent = "Vous n'avez aucun employé";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createEmployeesList(JSON.parse(data));
				}
			},
			bad:function(data, status)
			{
				
			}
		});
	}
	else{
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/employeeEndPoint.php",
			data: {
				"operation":"search",
				"key": search.value,
				company:user.company
			},
			good:function(data, status){
				if (data == "[]")
				{
					employees.textContent = "Aucun employé n'a été trouvé";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createEmployeesList(JSON.parse(data));
				}
			},
			bad:function(data, status)
			{
				
			}
		});
	}
}

document.onreadystatechange = function(){
	if (document.readyState === "complete")
	{
		checkRole();
		var add = document.getElementById("add"),
			timeout,
			search = document.getElementById("search");
		getEmployees();
		add.onclick = function(){
			var ef = new EmployeFrom();
			ef.create();
		};
		search.onkeyup = function () {
			clearInterval(timeout);
			timeout = setTimeout(function () {
					searchEmployee();
			}, 500);
		}
	}
}

function searchEmployee(){
	var search = document.getElementById("search");
	getEmployees(search.value);
}