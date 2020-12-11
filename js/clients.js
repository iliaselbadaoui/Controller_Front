function clientForm()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		name = document.createElement("input"),
		lname = document.createElement("input"),
		address = document.createElement("input"),
		tel = document.createElement("input"),
		email = document.createElement("input"),
		cin = document.createElement("input"),
		user = JSON.parse(localStorage.getItem("user")),
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		title.className = "form_Title";
		name.className = "form_Text";
		lname.className = "form_Text";
		address.className = "form_Text";
		email.className = "form_Text";
		tel.className = "form_Text";
		cin.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Ajouter";
		title.textContent = "Ajouter un nouveau Client";
		name.type = "text";
		lname.type = "text";
		address.type = "text";
		cin.type = "text";
		tel.type = "text";
		email.type = "text";
		name.placeholder = "Prénom du Client";
		lname.placeholder = "Nom du Client";
		address.placeholder = "Addresse";
		tel.placeholder = "Téléphone";
		email.placeholder = "Email";
		cin.placeholder = "CNI"
		form.append(title, name, lname, cin, address, tel, email, create);
		CForm.append(back, form);
		document.body.append(CForm);
	};
	create.onclick = function (){
		var flags = false;
		
		if (name.value === "")
		{
			name.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			name.style.border = "thin solid #222222";
		}
		if (lname.value === "")
		{
			lname.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			lname.style.border = "thin solid #222222";
		}
		if (cin.value === "")
		{
			cin.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			cin.style.border = "thin solid #222222";
		}
		if (address.value === "")
		{
			address.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			address.style.border = "thin solid #222222";
		}
		if (tel.value === "")
		{
			tel.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			tel.style.border = "thin solid #222222";
		}
		if (email.value === "" || !checkEmail(email.value))
		{
			email.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			email.style.border = "thin solid #222222";
		}
		if (flags)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/clientEndPoint.php",
			data: {
				"operation":"create",
				"name": name.value,
				"lname": lname.value,
				"address": address.value,
				"tel":tel.value,
				"email":email.value,
				"cni":cin.value,
				"company":user.company
			},
			good:function(data, status){
				if (data === "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Email déja utilisé";
				}
				else if (data === "CNI taken")
				{
					cin.style.border = "2px solid #e74c3c";
					cin.value = "CNI déja utilisé";
				}
				else if (data === "OK")
				{
					var toast = new TimedToast("Client ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					search("");
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

function updateClient(client)
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		name = document.createElement("input"),
		lname = document.createElement("input"),
		address = document.createElement("input"),
		tel = document.createElement("input"),
		email = document.createElement("input"),
		cin = document.createElement("input"),
		user = JSON.parse(localStorage.getItem("user")),
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		title.className = "form_Title";
		name.className = "form_Text";
		lname.className = "form_Text";
		address.className = "form_Text";
		email.className = "form_Text";
		tel.className = "form_Text";
		cin.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Valider";
		title.textContent = "Mettre à jour un Client";
		name.type = "text";
		lname.type = "text";
		address.type = "text";
		cin.type = "text";
		tel.type = "text";
		email.type = "text";
		name.placeholder = "Prénom du Client";
		lname.placeholder = "Nom du Client";
		address.placeholder = "Addresse";
		tel.placeholder = "Téléphone";
		email.placeholder = "Email";
		cin.placeholder = "CNI"
		name.value = client.fname;
		lname.value = client.lname;
		email.value = client.email;
		address.value = client.address;
		tel.value = client.tel;
		cin.value = client.cni;
		form.append(title, name, lname, cin, address, tel, email, create);
		CForm.append(back, form);
		document.body.append(CForm);
	};
	create.onclick = function (){
		var flags = false;
		
		if (name.value === "")
		{
			name.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			name.style.border = "thin solid #222222";
		}
		if (lname.value === "")
		{
			lname.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			lname.style.border = "thin solid #222222";
		}
		if (cin.value === "")
		{
			cin.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			cin.style.border = "thin solid #222222";
		}
		if (address.value === "")
		{
			address.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			address.style.border = "thin solid #222222";
		}
		if (tel.value === "")
		{
			tel.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			tel.style.border = "thin solid #222222";
		}
		if (email.value === "" || !checkEmail(email.value))
		{
			email.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			email.style.border = "thin solid #222222";
		}
		if (flags)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/clientEndPoint.php",
			data: {
				"operation":"updateClient",
				"name": name.value,
				"lname": lname.value,
				"address": address.value,
				"tel":tel.value,
				"email":email.value,
				"cni":cin.value,
				"id":client.id
			},
			good:function(data, status){
				if (data === "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Email déja utilisé";
				}
				else if (data === "CNI taken")
				{
					cin.style.border = "2px solid #e74c3c";
					cin.value = "CNI déja utilisé";
				}
				else if (data === "OK")
				{
					var toast = new TimedToast("Client ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					search("");
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

function createClientCard(client)
{
	var clients = document.getElementById("list_clnt"),
		card = document.createElement("div"),
		clientName = document.createElement("div"),
		update = document.createElement("button");
	card.className = "ui_card";
	clientName.className = "ui_card_text";
	update.className = "ui_tab";

	clientName.textContent = client.fname +" "+client.lname;
	update.innerHTML = '<i class="fal fa-edit"></i>';
	update.title = "Modifier";
	card.append(clientName, update);
	clients.append(card);
	update.onclick = function (){
		var ep = new updateClient(client);
		ep.create();
	};
}

function createClientsList(data)
{
	data.forEach(provdier => {
		createClientCard(provdier)
	});
}

function getClients(key)
{
	var employees = document.getElementById("emptyList"),
		user = JSON.parse(localStorage.getItem("user")),
		list = document.getElementById("emptyList"),
		childes = document.getElementsByClassName("ui_card");
		for (let i = 0; i < childes.length; i++) {
			childes[i].remove();
			i--;
		}
	if (key === null || key === undefined || key === "")
	{
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/clientEndPoint.php",
			data: {
				"operation":"companyClients",
				"company": user.company
			},
			good:function(data, status){
				if (data == "[]")
				{
					employees.textContent = "Vous n'avez aucun client";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createClientsList(JSON.parse(data));
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
			url:"https://controller.nuniverse.org/controllers/clientEndPoint.php",
			data:{
				operation:"search",
				word:key,
				company:user.company
			},
			good:function(data, stat){
				if (data == "[]")
				{
					employees.textContent = "Aucun client n'a été trouvé";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createClientsList(JSON.parse(data));
				}
			},
			bad:function(data, stat){

			}
		});
	}
}

document.onreadystatechange = function ()
{
	if (document.readyState === 'complete')
	{
		checkRole();
		var add = document.getElementById('add'),
			search = document.getElementById("search"),
			timeout,
			cf = new clientForm();
		getClients("")
		search.onkeyup = function(){
			clearInterval(timeout);
			timeout = setTimeout(function () {
				searchField();
			}, 500);
		};
		add.onclick = function(){
			cf.create();
		};
	}
};

function searchField() {
	var search = document.getElementById("search");
	getClients(search.value);
}