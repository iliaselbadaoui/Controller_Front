var flag = "private",
	clickFlag = "none";
function productFrom()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		ref = document.createElement("input"),
		designation = document.createElement("input"),
		prixUnit = document.createElement("input"),
		prixVente = document.createElement("input"),
		qnt = document.createElement("input"),
		provider = document.createElement("select"),
		select = document.createElement("option"),
		placement = document.createElement("input"),
		noProvider = document.createElement("span"),
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
		ref.className = "form_Text";
		designation.className = "form_Text";
		prixUnit.className = "form_Text";
		prixVente.className = "form_Text";
		qnt.className = "form_Text";
		provider.className = "form_Text";
		placement.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Ajouter";
		title.textContent = "Ajouter un nouveau produit";
		ref.type = "text";
		designation.type = "text";
		prixUnit.type = "number";
		prixVente.type = "number";
		qnt.type = "number";
		placement.type = "text";
		ref.placeholder = "Référence";
		designation.placeholder = "Désignation";
		qnt.placeholder = "Quantité";
		prixUnit.placeholder = "Prix d'achat unitaire";
		prixVente.placeholder = "Prix de vente unitaire";
		noProvider.className = "ui_card_text";
		noProvider.textContent = "Ajouter un fournisseur d'abord";
		placement.placeholder = "Emplacement";
		select.textContent = "Séléctionner un fournisseur";
		select.value = "null";
		provider.append(select);
		bridge({
			method: "POST",
			url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
			data: {
				operation:"CompanyProviders",
				company:user.company
			},
			good:function(providers, stat)
			{
				if(providers === "[]")
				{
					form.append(noProvider);
				}
				else{
					providers = JSON.parse(providers);
					providers.forEach(prov => {
						var p = document.createElement("option");
						p.textContent = prov.name;
						p.value = prov.id;
						provider.append(p);
					});
					form.append(title, ref, designation, qnt, prixUnit, prixVente, placement, provider, create);
				}
			}
		});
		CForm.append(back, form);
		document.body.append(CForm);
	};
	create.onclick = function (){
		var flag = false;
		
		if (ref.value === "")
		{
			ref.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			ref.style.border = "thin solid #222222";
		}
		if (designation.value === "")
		{
			designation.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			designation.style.border = "thin solid #222222";
		}
		if (qnt.value === "")
		{
			qnt.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			qnt.style.border = "thin solid #222222";
		}
		if (prixUnit.value === "")
		{
			prixUnit.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			prixUnit.style.border = "thin solid #222222";
		}
		if (prixVente.value === "")
		{
			prixVente.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			prixVente.style.border = "thin solid #222222";
		}
		if (placement.value === "")
		{
			placement.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			placement.style.border = "thin solid #222222";
		}
		if (provider.value === "null")
		{
			provider.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			provider.style.border = "thin solid #222222";
		}
		if (flag)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"create",
				ref:ref.value,
				designation: designation.value,
				quantity:qnt.value,
				price:prixUnit.value,
				sale:prixVente.value,
				placement:placement.value,
				provider:provider.value,
				company: user.company
			},
			good:function(data, status){
				if (data === "OK")
				{
					var toast = new TimedToast("Produit ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					searchProducts();
				}
				else if (data === "Reference taken")
				{
					ref.style.border = "2px solid #e74c3c";
					ref.value = "Rèfèrence dèja en stock";
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

function updateProduct(product)
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		ref = document.createElement("input"),
		designation = document.createElement("input"),
		prixUnit = document.createElement("input"),
		prixVente = document.createElement("input"),
		qnt = document.createElement("input"),
		provider = document.createElement("select"),
		select = document.createElement("option"),
		placement = document.createElement("input"),
		noProvider = document.createElement("span"),
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
		ref.className = "form_Text";
		designation.className = "form_Text";
		prixUnit.className = "form_Text";
		prixVente.className = "form_Text";
		qnt.className = "form_Text";
		provider.className = "form_Text";
		placement.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Valider";
		title.textContent = "Mettre à jour un produit";
		ref.type = "text";
		designation.type = "text";
		prixUnit.type = "number";
		prixVente.type = "number";
		qnt.type = "number";
		placement.type = "text";
		ref.placeholder = "Référence";
		designation.placeholder = "Désignation";
		qnt.placeholder = "Quantité";
		prixUnit.placeholder = "Prix d'achat unitaire";
		prixVente.placeholder = "prix de vente unitaire";
		noProvider.className = "ui_card_text";
		noProvider.textContent = "Ajouter un fournisseur d'abord";
		placement.placeholder = "Emplacement";
		select.textContent = "Séléctionner un fournisseur";
		select.value = "null";
		provider.append(select);
		bridge({
			method: "POST",
			url: "https://controller.nuniverse.org/controllers/providerEndPoint.php",
			data: {
				operation:"CompanyProviders",
				company:user.company
			},
			good:function(providers, stat)
			{
				if(providers === "[]")
				{
					form.append(noProvider);
				}
				else{
					providers = JSON.parse(providers);
					providers.forEach(prov => {
						var p = document.createElement("option");
						p.textContent = prov.name;
						p.value = prov.id;
						provider.append(p);
					});
					form.append(title, ref, designation, qnt, prixUnit, prixVente, placement, provider, create);
				}
			}
		}).then((msg) => {
			provider.value = product.provider;
		});
		CForm.append(back, form);
		ref.value = product.ref;
		designation.value = product.designation;
		placement.value = product.placement;
		prixUnit.value = product.price;
		prixVente.value = product.sale;
		qnt.value = product.qte;
		document.body.append(CForm);
	};
	create.onclick = function (){
		var flag = false;
		
		if (ref.value === "")
		{
			ref.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			ref.style.border = "thin solid #222222";
		}
		if (designation.value === "")
		{
			designation.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			designation.style.border = "thin solid #222222";
		}
		if (qnt.value === "")
		{
			qnt.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			qnt.style.border = "thin solid #222222";
		}
		if (prixUnit.value === "")
		{
			prixUnit.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			prixUnit.style.border = "thin solid #222222";
		}
		if (prixVente.value === "")
		{
			prixVente.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			prixVente.style.border = "thin solid #222222";
		}
		if (placement.value === "")
		{
			placement.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			placement.style.border = "thin solid #222222";
		}
		if (provider.value === "null")
		{
			provider.style.border = "2px solid #e74c3c";
			flag = true;
		}
		else{
			provider.style.border = "thin solid #222222";
		}
		if (flag)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"update",
				ref:ref.value,
				oldRef:product.ref,
				designation: designation.value,
				quantity:qnt.value,
				price:prixUnit.value,
				sale:prixVente.value,
				placement:placement.value,
				provider:provider.value,
				id: product.id,
				company: user.company
			},
			good:function(data, status){
				if (data === "OK")
				{
					var toast = new TimedToast("Produit ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					searchProducts();
				}
				else if (data === "Reference taken")
				{
					ref.style.border = "2px solid #e74c3c";
					ref.value = "Rèfèrence dèja en stock";
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

function searchAlts(search, parent, prod)
{
	getAlts(search.value, parent, prod);
}

function alternativeProducts(product)
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		timeout,
		cardParent = document.createElement("div"),
		productAlts = document.createElement("button"),
		allPossibleAlts = document.createElement("button"),
		title = document.createElement("h3"),
		container = document.createElement("div"),
		buttonsContainner = document.createElement("div"),
		search = document.createElement("input");
	search.onkeyup = function (){
		clearInterval(timeout);
			timeout = setTimeout(function () {
				searchAlts(search, cardParent, product);
			}, 500);		
	};
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
		flag = "private";
	};
	allPossibleAlts.onclick = function(){
		getAlts("", cardParent, product);
		productAlts.className = "medium_font medium_ok_btn add_employee blue";
		allPossibleAlts.className = "medium_font medium_ok_btn add_employee blueActive";
		flag = "private"
	}
	productAlts.onclick = function(){
		getAlts("", cardParent, product);
		productAlts.className = "medium_font medium_ok_btn add_employee blueActive";
		allPossibleAlts.className = "medium_font medium_ok_btn add_employee blue";
		flag = "own"
	}
	cf.create = function (){
		CForm.className = "form_Container";
		CForm.id = "form_Container";
		back.className = "form_Background";
		form.className = "form_window";
		title.className = "form_Title";
		productAlts.className = "medium_font medium_ok_btn add_employee blue";
		allPossibleAlts.className = "medium_font medium_ok_btn add_employee blueActive";
		productAlts.innerHTML = '<i class="fal fa-network-wired"></i>';
		allPossibleAlts.innerHTML = '<i class="fal fa-ball-pile"></i>';
		productAlts.title = "Les alternatifs liès";
		allPossibleAlts.title = "Les alternatifs";
		search.className = "form_Text search";
		search.placeholder = "rechercher un alternative"
		title.textContent = "Gèrer les alternatifs";
		getAlts("", cardParent, product);
		cardParent.className = "data_container";
		container.className = "Add_N_Search";
		buttonsContainner.className = "ui_flex_container_row";
		buttonsContainner.append(allPossibleAlts, productAlts);
		container.append(search, buttonsContainner);
		form.append(title, container, cardParent);
		CForm.append(back, form);
		document.body.append(CForm);
	};
	return cf;
}

function createProductCard(product, parent, id)
{
	let products = document.getElementById("list_prod"),
		card = document.createElement("div"),
		user = localStorage.getItem("user");
		fullName = document.createElement("div"),
		FN = document.createElement("div"),
		ref = document.createElement("div"),
		update = document.createElement("button"),
		alter = document.createElement("button"),
		add = document.createElement("button"),
		remove = document.createElement("button"),
		removeAlt = document.createElement("button"),
		added = "none",
		promise = new Promise((resolve, reject) => {
			var time = setInterval(function(){
				if(added === "done "+product.id.toString())
				{
					resolve("done "+product.id.toString());
					clearInterval(time);
				}
			}, 1);
		});
	card.className = "ui_card";
	card.title = product.designation;
	fullName.className = "ui_flex_container_col";
	FN.className = "ui_card_text_prod";
	ref.className = "ui_card_text_h2_prod";
	remove.className = "ui_tab";
	removeAlt.className = "ui_tab";
	update.className = "ui_tab";
	alter.className = "ui_tab";
	add.className = "ui_tab";
	if(product.designation.length <= 20)
	{
		FN.textContent = product.designation;
	}
	else{
		FN.textContent = product.designation.substring(0, 20)+"...";
	}
	ref.textContent = "REF: "+product.ref + " | achat: "+product.price+"DH | vente: "+product.sale+"DH";
	remove.innerHTML = '<i class="fal fa-trash-alt"></i>';
	removeAlt.innerHTML = '<i class="fal fa-trash-alt"></i>';
	update.innerHTML = '<i class="fal fa-edit"></i>';
	alter.innerHTML = '<i class="fal fa-sync-alt"></i>';
	add.innerHTML = '<i class="fal fa-plus"></i>';
	remove.title = "Supprimer";
	removeAlt.title = "Supprimer";
	update.title = "Modifier";
	add.title = "Ajouter comme alternatif";
	alter.title = "Gérer les homologues";
	fullName.append(FN, ref);
	if(parent === null || parent === undefined || parent === ""){
		card.append(fullName, alter, update, remove);
		products.append(card);
	}
	else{
		if(flag === "private")
		{
			card.append(fullName, add);
			parent.append(card);
			card.className = "ui_card product_cards";
			add.onclick = function(){
				bridge({
					method:"POST",
					url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
					data:{
						operation:"createAlt",
						prod:id,
						alt:product.id
					},
					good:function(data, stat){
						if (data === "OK")
						{
							let ts = new TimedToast("L'alternatif est ajoutè", 3000, false, parent.parentNode);
							added = "done "+product.id.toString();
							clickFlag = "clicked";
							ts.show();
						}
						else{
							let ts = new TimedToast("L'alternatif n'est pas ajoutè", 3000, false, parent.parentNode);
							ts.show();
						}
					},
					bad:function(data, stat){
						let ts = new TimedToast("L'alternatif n'est pas ajoutè", 3000, false, parent.parentNode);
						ts.show();
					}
				});
			};
		}
		else if(flag === "own")
		{
			card.append(fullName, removeAlt);
			parent.append(card);
			card.className = "ui_card product_cards";
			removeAlt.onclick = function(){
				bridge({
					method:"POST",
					url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
					data:{
						operation:"removeAlt",
						prod:id,
						alt:product.id
					},
					good:function(data, stat){
						if (data === "OK")
						{
							let ts = new TimedToast("L'alternatif est suprimè", 3000, false, parent.parentNode);
							added = "done "+product.id.toString();
							clickFlag = "clicked";
							ts.show();
						}
						else{
							let ts = new TimedToast("L'alternatif n'est pas suprimè", 3000, false, parent.parentNode);
							ts.show();
						}
					},
					bad:function(data, stat){
						let ts = new TimedToast("L'alternatif n'est pas suprimè", 3000, false, parent.parentNode);
						ts.show();
					}
				});
			};
		}
	}
	update.onclick = function (){
		var ep = new updateProduct(product);
		ep.create();
	};
	alter.onclick = function (){
		var ap = alternativeProducts(product);
		ap.create();
	};
	remove.onclick = function(){
		var mb = new MessageBox("Validation", "Voulez-vous vraimment supprimer?");
		mb.show().then((res)=>{
			if(res === "YES")
			{
				bridge({
					method:"POST",
					url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
					data:{
						operation:"delete",
						ref:product.ref
					},
					good: function(data, stat){
						console.log(data);
						if(data === "OK")
						{
							let ts = new TimedToast("Produit supprimè avec succès", 3000, false);
							ts.show();
							searchProducts();
						}
						else{
							let ts = new TimedToast("Produit n'est pas supprimè", 3000, false);
							ts.show();
						}
					},
					bad: function(data, stat){

					}
				});
			}
		});
	};
	return promise;
}

function removeAltsCards(id)
{
	var childes = document.getElementsByClassName("product_cards"),
		res = "none",
		promise = new Promise((good, bad) => {
			var time = setInterval(function(){
				if(res === "OK"+id)
				{
					good("OK"+id);
					res = "none";
				}
			},1);
		});
	for (let i = 0; i < childes.length; i++) {
		childes[i].remove();
		i--;
	}
	res = "OK"+id;
	return promise;
}

function getAlts(key, parent, product)
{
	var noProduct = document.createElement("span"),
		user = JSON.parse(localStorage.getItem("user"));
	if(key === undefined || key === "")
	{
		removeAltsCards(product.id).then((res)=>{
			if(res === "OK"+product.id){
				if(flag === "private")
				{
					noProduct.className = "ui_card_text product_cards";
					noProduct.textContent = "Vous n'avez pas d'autres alternatifs possible";
				}
				else if(flag === "own")
				{
					noProduct.className = "ui_card_text product_cards";
					noProduct.textContent = "Ce produit n'a pas d'alternatifs pour le moment";
				}
				if(flag === "private")
				{
					bridge({
						method:"POST",
						url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
						data:{
							operation:"PossibleAlts",
							id:product.id,
							company:user.company
						},
						good:function(data, stat){
							if (data !== "[]")
							{
								createAlterList(JSON.parse(data), parent, product);
							}else{
								parent.append(noProduct);
							}
						},
						bad:function(data, stat){
						}
					});
				}
				else if (flag === "own")
				{
					bridge({
						method:"POST",
						url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
						data:{
							operation:"ownAlts",
							id:product.id,
						},
						good:function(data, stat){
							if (data !== "[]")
							{
								createAlterList(JSON.parse(data), parent, product);
							}else{
								parent.append(noProduct);
							}
						},
						bad:function(data, stat){
						}
					});
				}
			}
		});
	}
	else
	{
		removeAltsCards(product.id).then((res) => {
			if(res === "OK"+product.id)
			{
				if(flag === "private")
				{
					bridge({
						method:"POST",
						url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
						data:{
							operation:"searchPrivate",
							id:product.id,
							company: user.company,
							"key":key
						},
						good:function(data, stat){
							if (data !== "[]")
							{
								createAlterList(JSON.parse(data), parent, product);
							}else{
								noProduct.className = "ui_card_text product_cards";
								noProduct.textContent = "Aucun d'alternatif possible trouvè";
								parent.append(noProduct);
							}
						},
						bad:function(data, stat){
						}
					});
				}
				else if(flag === "own")
				{
					bridge({
						method:"POST",
						url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
						data:{
							operation:"searchOwn",
							id:product.id,
							company:user.company,
							"key":key
						},
						good:function(data, stat){
							if (data !== "[]")
							{
								createAlterList(JSON.parse(data), parent, product);
							}else{
								noProduct.className = "ui_card_text product_cards";
								noProduct.textContent = "Aucun d'alternatifs trouvè";
								parent.append(noProduct);
							}
						},
						bad:function(data, stat){
						}
					});
				}
			}
		});
	}
}

function createAlterList(data, parent, prod)
{
	var i = 0;
	data.forEach(product => {
		createProductCard(product, parent, prod.id).then((val) =>{
			if (clickFlag === "clicked")
			{
				getAlts("",parent, prod);
				clickFlag = "none";
			}
		});
	});
}

function createProductsList(data)
{
	data.forEach(product => {
		createProductCard(product)
	});
}

function getProducts(key)
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
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"companyProducts",
				"company": user.company
			},
			good:function(data, status){
				if (data == "[]")
				{
					employees.textContent = "Vous n'avez aucun produit";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createProductsList(JSON.parse(data));
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
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"search",
				"key": search.value,
				company:user.company
			},
			good:function(data, status){
				if (data == "[]")
				{
					employees.textContent = "Aucun produits n'a été trouvé";
					employees.className="employee_message";
				}
				else{
					employees.className="ui_none";
					createProductsList(JSON.parse(data));
				}
			},
			bad:function(data, status)
			{
				
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
			pf = new productFrom();
		getProducts();
		search.onkeyup = function(){
			clearInterval(timeout);
			timeout = setTimeout(function () {
				searchProducts();
			}, 500);
		};
		add.onclick = function(){
			pf.create();
		};
	}
};

function searchProducts(){
	var search = document.getElementById("search");
	getProducts(search.value);
}