var flag = "private";
function providerForm()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		name = document.createElement("input"),
		address = document.createElement("input"),
		fix = document.createElement("input"),
		email = document.createElement("input"),
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
		address.className = "form_Text";
		email.className = "form_Text";
		fix.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Ajouter";
		title.textContent = "Ajouter un nouveau fournisseur";
		name.type = "text";
		address.type = "text";
		fix.type = "text";
		email.type = "text";
		name.placeholder = "Nom du fournisseur";
		address.placeholder = "Addresse";
		fix.placeholder = "Fixe";
		email.placeholder = "Email";
		form.append(title, name, address, fix, email, create);
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
		if (address.value === "")
		{
			address.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			address.style.border = "thin solid #222222";
		}
		if (fix.value === "")
		{
			fix.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			fix.style.border = "thin solid #222222";
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
			url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
			data: {
				"operation":"create",
				"name": name.value,
				"address": address.value,
				"fix":fix.value,
				"email":email.value,
				"company":user.company
			},
			good:function(data, status){
				if (data === "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Email déja utilisé";
				}
				else if (data === "Name taken")
				{
					name.style.border = "2px solid #e74c3c";
					name.value = "Nom déja utilisé";
				}
				else if (data === "OK")
				{
					var toast = new TimedToast("Fournisseur ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					getProviders("")
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

function updateProvider(provider)
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		name = document.createElement("input"),
		address = document.createElement("input"),
		fix = document.createElement("input"),
		email = document.createElement("input"),
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
		address.className = "form_Text";
		email.className = "form_Text";
		fix.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Valider";
		title.textContent = "Mettre à jour un fournisseur";
		name.type = "text";
		address.type = "text";
		fix.type = "text";
		email.type = "text";
		name.placeholder = "Nom du fournisseur";
		address.placeholder = "Addresse";
		fix.placeholder = "Fixe";
		email.placeholder = "Email";
		name.value = provider.name;
		address.value = provider.adresse;
		fix.value = provider.fix;
		email.value = provider.email;
		form.append(title, name, address, fix, email, create);
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
		if (address.value === "")
		{
			address.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			address.style.border = "thin solid #222222";
		}
		if (fix.value === "")
		{
			fix.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			fix.style.border = "thin solid #222222";
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
			url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
			data: {
				"operation":"update",
				"id": provider.id,
				"name": name.value,
				"address": address.value,
				"fix": fix.value,
				"email": email.value,
				"company": provider.company
			},
			good:function(data, status){
				if (data === "OK")
				{
					var toast = new TimedToast("Fournisseur mis à jour avec succés", 3000, false);
					toast.show();
					back.click();
					searchField();
				}
				else if (data === "Email taken")
				{
					email.style.border = "2px solid #e74c3c";
					email.value = "Un fournisseur à dèja cet email"
				}
				else if (data === "Name taken")
				{
					name.style.border = "2px solid #e74c3c";
					name.value = "Un fournisseur à dèja ce nom"
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

function createProviderCard(provider)
{
	var providers = document.getElementById("list_prov"),
		card = document.createElement("div"),
		providerName = document.createElement("div"),
		update = document.createElement("button"),
		remove = document.createElement("button"),
		add = document.createElement("button");
	card.className = "ui_card";
	providerName.className = "ui_card_text";
	update.className = "ui_tab";
	remove.className = "ui_tab";
	add.className = "ui_tab";

	providerName.textContent = provider.name;
	update.innerHTML = '<i class="fal fa-edit"></i>';
	update.title = "Modifier";
	remove.onclick = function ()
	{
		let nm  = new MessageBox("Validation", "Voulez-vous vraimment supprimer?");
		nm.show().then((res)=>{
			if(res === "YES")
			{
				bridge({
					method:"POST",
					url:"https://controller.nuniverse.org/controllers/providerEndPoint.php",
					data:{
						"operation":"delete",
						"id":provider.id
					},
					good:function(data, stat){
						if (data === "OK")
						{
							var toast = new TimedToast("Fournisseur supprimè avec succés", 3000, false);
							toast.show();
							searchField();
						}
						else{
							console.log(data);
							var toast = new TimedToast("Une erreur est apparue", 3000, true);
							toast.show();
						}
					},
					bad:function(data, stat){
						var toast = new TimedToast("Une erreur est apparue", 3000, true);
							toast.show();
					}
				});
			}
		})
	}
	remove.innerHTML = '<i class="fal fa-trash-alt"></i>';
	remove.title = "Supprimer";
	add.innerHTML = '<i class="fal fa-plus"></i>';
	add.title = "Ajouter comme fournisseur";
	if(flag === "all")
	{
		card.append(providerName, add);
	}
	else if(flag === "private")
	{
		if (!provider.CompanyAccount)
		{
			card.append(providerName, update, remove);
		}
		else{
			card.append(providerName, remove);
		}
	}
	providers.append(card);
	update.onclick = function (){
		var ep = new updateProvider(provider);
		ep.create();
	};
}

function createProvidersList(data)
{
	data.forEach(provdier => {
		createProviderCard(provdier)
	});
}

function getProviders(key)
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
		if (flag === "private")
		{
			bridge({
				method:"POST",
				url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
				data: {
					"operation":"CompanyProviders",
					"company": user.company
				},
				good:function(data, status){
					if (data === "[]")
					{
						console.log(user.company);
						employees.textContent = "Vous n'avez aucun fournisseur";
						employees.className="employee_message";
					}
					else{
						employees.className="ui_none";
						createProvidersList(JSON.parse(data));
					}
				},
				bad:function(data, status)
				{
					
				}
			});
		}
		else if (flag === "all")
		{
			bridge({
				method:"POST",
				url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
				data: {
					"operation":"AllProviders",
					"company": user.company
				},
				good:function(data, status){
					if (data == "[]")
					{
						employees.textContent = "Vous n'avez aucun fournisseur";
						employees.className="employee_message";
					}
					else{
						employees.className="ui_none";
						createProvidersList(JSON.parse(data));
					}
				},
				bad:function(data, status)
				{
					
				}
			});
		}
	}
	else{
		if (flag === "private")
		{
			bridge({
				method:"POST",
				url:"https://controller.nuniverse.org/controllers/providerEndPoint.php",
				data:{
					operation:"search",
					word:key,
					company:user.company
				},
				good:function(data, stat){
					if (data == "[]")
					{
						employees.textContent = "Aucun fournisseur n'a été trouvé";
						employees.className="employee_message";
					}
					else{
						employees.className="ui_none";
						createProvidersList(JSON.parse(data));
					}
				},
				bad:function(data, stat){
	
				}
			});
		}
		else if (flag === "all")
		{
			// all companies
			bridge({
				method:"POST",
				url:"https://controller.nuniverse.org/controllers/providerEndPoint.php",
				data:{
					operation:"search",
					word:key
				},
				good:function(data, stat){
					if (data == "[]")
					{
						employees.textContent = "Aucun fournisseur n'a été trouvé";
						employees.className="employee_message";
					}
					else{
						employees.className="ui_none";
						createProvidersList(JSON.parse(data));
					}
				},
				bad:function(data, stat){
	
				}
			});
		}
	}
}

document.onreadystatechange = function ()
{
	if (document.readyState === 'complete')
	{
		checkRole();
		var add = document.getElementById('add'),
			AllProviders = document.getElementById("AllProviders"),
			OurProviders = document.getElementById("OurProviders"),
			timeout,
			search = document.getElementById("search"),
			pf = new providerForm();
		getProviders();
		OurProviders.onclick = function(){
			flag = "private";
			AllProviders.classList.replace("blueActive", "blue");
			OurProviders.classList.replace("blue", "blueActive");
			getProviders();
		};
		AllProviders.onclick = function (){
			flag = "all";
			OurProviders.classList.replace("blueActive", "blue");
			AllProviders.classList.replace("blue", "blueActive");
			getProviders();
		};
		add.onclick = function(){
			pf.create();
		};
		search.onkeyup = function () {
			clearInterval(timeout);
			timeout = setTimeout(function () {
					searchField();
			}, 500);
		}
	}
};

function searchField()
{
	var search = document.getElementById("search");
	getProviders(search.value);
}