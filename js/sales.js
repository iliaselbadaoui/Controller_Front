function saleForm()
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		product = document.createElement("select"),
		noProducts = document.createElement("div"),
		nullOpt = document.createElement("option"),
		qte = document.createElement("input"),
		idnt = document.createElement("input"),
		price = document.createElement("input"),
		user = JSON.parse(localStorage.getItem("user")),
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		nullOpt.value="";
		nullOpt.textContent = "Sélectionner un produit"
		noProducts.className = "ui_card_text";
		noProducts.textContent = "Ajouter un produit au moins d'abord";
		title.className = "form_Title";
		product.className = "form_Text";
		qte.className = "form_Text";
		idnt.className = "form_Text";
		price.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Ajouter";
		title.textContent = "Ajouter une vente";
		qte.type = "number";
		idnt.type = "text";
		idnt.placeholder = "Identifiant";
		qte.placeholder = "Quantitè vendue";
		price.placeholder = "prix unitaire de vente";
		document.body.append(CForm);
		bridge({
			method: "POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				operation:"companyProducts",
				company:user.company
			},
			good:function(data, stat)
			{
				if(data === "[]")
				{
					form.append(title, noProducts);
					CForm.append(back, form);
				}
				else{
					product.append(nullOpt);
					data = JSON.parse(data);
					data.forEach(prod => {
						var opt = document.createElement("option");
						opt.value = prod.id;
						opt.textContent = prod.designation;
						product.append(opt);
					});
					form.append(title, product, qte, price, idnt, create);
					CForm.append(back, form);
				}
			},
			bad:function(data, stat)
			{
				
			}
		});
	};
	create.onclick = function (){
		var flags = false;
		
		if (product.value === "")
		{
			product.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			product.style.border = "thin solid #222222";
		}
		if (qte.value === "")
		{
			qte.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			qte.style.border = "thin solid #222222";
		}
		if (idnt.value === "")
		{
			idnt.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			idnt.style.border = "thin solid #222222";
		}
		if (price.value === "")
		{
			price.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			price.style.border = "thin solid #222222";
		}
		if (flags)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"addSale",
				"product": product.value,
				"qte": qte.value,
				"employee":user.id,
				"price":price.value,
				"idnt":idnt.value
			},
			good:function(data, status){
				if (data === "OK")
				{
					var toast = new TimedToast("Vente ajoutè avec succés", 3000, false);
					toast.show();
					back.click();
					searchField("");
				}
				else if(data === "ERROR"){
					var toast = new TimedToast("Une erreur est apparue", 3000, true);
					toast.show();
					back.click();
				}
				else if(data === "QNE"){
					var toast = new TimedToast("La quantité en stock est inférieur à celle-ci demandèe ici", 3000, true);
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

function updateSale(sale)
{
	var cf = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		product = document.createElement("select"),
		noProducts = document.createElement("div"),
		nullOpt = document.createElement("option"),
		qte = document.createElement("input"),
		price = document.createElement("input"),
		idnt = document.createElement("input"),
		user = JSON.parse(localStorage.getItem("user")),
		create = document.createElement("button");
	back.onclick = function (){
		CForm.parentElement.removeChild(CForm);
	};
	cf.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		nullOpt.value="";
		nullOpt.textContent = "Sélectionner un produit"
		noProducts.className = "ui_card_text";
		noProducts.textContent = "Ajouter un produit au moins d'abord";
		title.className = "form_Title";
		product.className = "form_Text";
		idnt.className = "form_Text";
		qte.className = "form_Text";
		price.className = "form_Text";
		create.className = "form_Ok_Button";
		create.textContent = "Ajouter";
		title.textContent = "Ajouter une vente";
		idnt.placeholder = "Identifiant";
		idnt.type = "text";
		qte.type = "number";
		qte.placeholder = "Quantitè vendue";
		price.placeholder = "prix unitaire de vente";
		document.body.append(CForm);
		qte.value = sale.qte;
		price.value = sale.price;
		idnt.value = sale.identifier;
		bridge({
			method: "POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				operation:"companyProducts",
				company:user.company
			},
			good:function(data, stat)
			{
				if(data === "[]")
				{
					form.append(title, noProducts);
					CForm.append(back, form);
				}
				else{
					product.append(nullOpt);
					data = JSON.parse(data);
					data.forEach(prod => {
						var opt = document.createElement("option");
						opt.value = prod.id;
						opt.textContent = prod.designation;
						product.append(opt);
					});
					form.append(title, product, qte, price, idnt, create);
					CForm.append(back, form);
				}
			},
			bad:function(data, stat)
			{
				
			}
		}).then((val) => {
			if (val === "Done")
			{
				product.value = sale.product;
			}
		});
	};
	create.onclick = function (){
		var flags = false;
		
		if (product.value === "")
		{
			product.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			product.style.border = "thin solid #222222";
		}
		if (qte.value === "")
		{
			qte.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			qte.style.border = "thin solid #222222";
		}
		if (idnt.value === "")
		{
			idnt.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			idnt.style.border = "thin solid #222222";
		}
		if (price.value === "")
		{
			price.style.border = "2px solid #e74c3c";
			flags = true;
		}
		else{
			price.style.border = "thin solid #222222";
		}
		if (flags)
		{
			return 0;
		}
		bridge({
			method:"POST",
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"updateSale",
				"product": product.value,
				"qte": qte.value,
				"price":price.value,
				"id":sale.id,
				"idnt":idnt.value,
				"emp":user.id
			},
			good:function(data, status){
				if (data === "OK")
				{
					var toast = new TimedToast("Vente mis à jour avec succés", 3000, false);
					toast.show();
					back.click();
					searchField("")
				}
				else if(data === "ERROR"){
					var toast = new TimedToast("Une erreur est apparue", 3000, true);
					toast.show();
					back.click();
				}
				else if(data === "QNE"){
					var toast = new TimedToast("La quantité en stock est inférieur à celle-ci demandèe ici", 3000, true);
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

function createSaleCard(sale)
{
	var sales = document.getElementById("list_emp"),
		card = document.createElement("div"),
		container = document.createElement("div"),
		saleText = document.createElement("div"),
		priceQTE = document.createElement("div"),
		update = document.createElement("button"),
		remove = document.createElement("button"),
		add = document.createElement("button");
	container.className = "ui_flex_container_col";	
	card.className = "ui_card";
	saleText.className = "ui_card_text_prod";
	priceQTE.className = "ui_card_text_h2_prod";
	update.className = "ui_tab";
	remove.className = "ui_tab";
	add.className = "ui_tab";
	saleText.textContent = sale.designation;
	priceQTE.textContent = "prix vente: "+sale.price+"DH | quantité vendue : "+sale.qte;
	container.append(saleText, priceQTE);
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
					url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
					data:{
						"operation":"deleteSale",
						"id": sale.id
					},
					good:function(data, stat){
						if (data === "OK")
						{
							var toast = new TimedToast("Ventes supprimè avec succés", 3000, false);
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
	update.onclick = function (){
		updateSale(sale);
	};
	remove.innerHTML = '<i class="fal fa-trash-alt"></i>';
	remove.title = "Supprimer";
	card.append(container, update, remove);
	sales.append(card);
	update.onclick = function (){
		var ep = new updateSale(sale);
		ep.create();
	};
}

function createSalesList(data)
{
	data.forEach(sale => {
		createSaleCard(sale)
	});
}

function getSales(key)
{
	var sales = document.getElementById("emptyList"),
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
			url: "https://controller.nuniverse.org/controllers/productEndPoint.php",
			data: {
				"operation":"AllEmployeeSales",
				"employee": user.id
			},
			good:function(data, status){
				if (data === "[]")
				{
					sales.textContent = "Vous n'avez aucune Vente pour le moment";
					sales.className="employee_message";
				}
				else{
					sales.className="ui_none";
					createSalesList(JSON.parse(data));
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
			url:"https://controller.nuniverse.org/controllers/productEndPoint.php",
			data:{
				operation:"searchSale",
				"key":key,
				employee:user.id
			},
			good:function(data, stat){
				if (data == "[]")
				{
					sales.textContent = "Aucune vente n'a été trouvé";
					sales.className="employee_message";
				}
				else{
					sales.className="ui_none";
					createSalesList(JSON.parse(data));
				}
			},
			bad:function(data, stat){

			}
		});
	}
}

function chooseSaleType()
{
	let st = {},
		CForm = document.createElement("div"),
		back = document.createElement("div"),
		form = document.createElement("div"),
		title = document.createElement("h3"),
		container = document.createElement("div"),
		simple = document.createElement('button'),
		bill = document.createElement('button');
	st.create = function (){
		CForm.className = "form_Container";
		back.className = "form_Background";
		form.className = "form_form";
		title.className = "form_Title";
		title.textContent = "Choisir le type de vente";
		bill.innerHTML = '<i class="fal fa-file-invoice-dollar"></i>';
		bill.title = "Vente avec facture";
		simple.innerHTML = '<i class="fal fa-inbox-out"></i>';
		simple.title = "Vente simple";
		bill.className = 'ui_tab XXlarge_font';
		simple.className = 'ui_tab XXlarge_font';
		container.className = "data_container";
		container.append(simple, bill);
		form.append(title, container);
		CForm.append(back, form);
		document.body.append(CForm);
	};
	back.onclick = function(){
		CForm.parentNode.removeChild(CForm);
	}
	simple.onclick = function(){
		let sf = new saleForm();
		sf.create();
		back.click();
	}
	bill.onclick = function(){
		let bf = new billForm();
		bf.create();
		back.click();
	}
	return st;
}

document.onreadystatechange = function ()
{
	if (document.readyState === 'complete')
	{
		checkRole();
		var add = document.getElementById('add'),
			timeout,
			search = document.getElementById("search"),
			st = new chooseSaleType();
			getSales("");
			search.onkeyup = function () {
				clearInterval(timeout);
				timeout = setTimeout(function () {
						searchField(search.value);
				}, 500);
			}
		add.onclick = function(){
			st.create();
		};
	}
};
function searchField(key){
	getSales(key);
}