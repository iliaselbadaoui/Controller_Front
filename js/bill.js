let current = null,
	flag = "clients",
	billHolder = null,
	gClients = null,
	gProducts = null,
	productsStack = new Array();
function setCurrentSelection(CARD, client)
{
	if (current === null)
	{
		current = CARD;
		billHolder = client;
		CARD.card.className = "ui_card_current";
		CARD.name.className = "ui_card_text_prod_current";
		CARD.cni.className = "ui_card_text_h2_prod_current";
	}
	else
	{
		current.card.className = "ui_card ui_cursor_pointer ui_selectable_card";
		current.name.className = "ui_card_text_prod";
		current.cni.className = "ui_card_text_h2_prod"
		current = null;
		setCurrentSelection(CARD, client);
	}
}
function createClient(container, client)
{
	let CARD = {},
		card = document.createElement("div"),
		CN = document.createElement("div"),
		name = document.createElement("span"),
		cni = document.createElement("span");
	CARD.card = card;
	CARD.CN = CN;
	CARD.name = name;
	CARD.cni = cni;
	card.className = "ui_card ui_cursor_pointer ui_selectable_card";
	CN.className = "ui_flex_container_col";
	name.className = "ui_card_text_prod";
	cni.className = "ui_card_text_h2_prod"
	name.textContent = client.fname + " " + client.lname;
	cni.textContent = client.cni;
	CN.append(name, cni);
	card.append(CN);
	container.append(card);
	card.onclick = function(){
		setCurrentSelection(CARD, client);
	}
}
function createClients(container, clients)
{
	clients.forEach(c => {
		createClient(container, c);
	});
}
function loadClients(container)
{
	let user = JSON.parse(localStorage.getItem("user"));
	bridge({
		method:"POST",
		url: "https://controller.nuniverse.org/controllers/clientEndPoint.php",
		data: {
			"operation":"companyClients",
			"company": user.company
		},
		good:function (data, err){
			let clients = JSON.parse(data),
				noMatches = document.createElement("span");
			if(clients.length > 0)
			{
				gClients = clients;
				createClients(container, clients);
			}
			else
			{
				noMatches.textContent = "Aucune client n'a été trouvé";
				noMatches.className="employee_message";
				container.append(noMatches);
			}
		},
		bad:function(data, err){
			var toast = new TimedToast("Une erreur est apparue", 3000, true);
			toast.show();
		}
	})
}

function billForm(){
	var bf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		timer,
		title = document.createElement("h3"),
		searchContainer = document.createElement("div"),
		search = document.createElement("input"),
		foot = document.createElement("div"),
		next = document.createElement("button"),
		cancel = document.createElement("button"),
		container = document.createElement("div");
	back.onclick = function ()
	{
		billHolder = null;
		CForm.parentNode.removeChild(CForm);
	}
	cancel.onclick = function (){
		back.click();
	};
	next.onclick = function(){
		if (billHolder === null)
		{
			TimedToast("Choisir d'abord un client", 3000, true, form).show();
		}
	};
	bf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_window";
		title.className = "form_Title";
		title.textContent = "Choisir le client";
		container.className = "data_container ui_bottom_marge";
		search.placeholder = "Rechercher";
		search.type = "text";
		foot.className = "ui_foot";
		next.textContent = "Suivant";
		cancel.textContent = "Annuler";
		next.className = "ui_yes";
		cancel.className = "ui_no";
		search.className = "form_Text search";
		searchContainer.className = "Add_N_Search";
		searchContainer.append(search);
		container.id = "clients";
		foot.append(cancel, next);
		form.append(title, searchContainer, container, foot);
		CForm.append(back, form);
		document.body.append(CForm);
		loadClients(container);
		search.onkeyup = function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				Search(container, search.value);
			},500)
		}
	};
	return bf;
}
function Clear(container)
{
	let childes = container.childNodes;
	for(let i =0; i < childes.length; i++)
	{
		if (childes[i].className.includes("ui_card") || childes[i].className.includes("employee_message"))
			childes[i].remove();
		i--;
	}
}
function Search(container, value)
{
	let matches = new Array(),
		noMatches = document.createElement("span");
	Clear(container);
	if (flag === "clients")
	{
		gClients.forEach(c=>{
			if ((c.fname +" "+ c.lname).toLocaleLowerCase().includes(value) || (c.lname +" "+ c.fname).toLocaleLowerCase().includes(value) || c.cni.includes(value))
			{
				matches.push(c);
			}
		});
		if (matches.length > 0)
		{
			createClients(container, matches);
		}
		else if (matches.length === 0)
		{
			noMatches.textContent = "Aucune client n'a été trouvé";
			noMatches.className="employee_message";
			container.append(noMatches);
		}
		else if (value === "")
		{
			createClients(container, gClients);
		}
	}
}