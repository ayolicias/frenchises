const clientService = require('../services/client-service');
const ClientService = require('../services/client-service');
const province = require('./province');

module.exports = function(productclientService, provinceService) {
	
	async function show(req, res, next) {
		try {
			let results = await clientService.all(); 
			res.render('client/home', {
				no_clients: results.length === 0,
				clients: results,
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function showAdd(req, res, next) {
		try {
			let provinces = await provinceService.all();
			res.render('clients/add', {
				provinces: provinces,
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function add(req, res, next) {

		try {
			await clientService.create({
				province_id: Number(req.body.category_id),
				contact_details : req.body.contact_details,
                branch: Text(req.body.price),
                email_address: Text(req.body.contact_details),
                postal_code: Text(req.body.postal_code),
                busines_tel : Text(req.body.busines_tel),
                cell: Text(req.body.cell),
				status: Text(req.body)
				
			});
			
			req.flash('info', 'client added!'),
			res.redirect('/clients');
		}
	
		catch (err) {
			next(err);
		}
	};

	async function get(req, res, next) {
		try {
			let id = req.params.id;
			let provinces = await provinceService.all();
			let client = await clientService.get(id);

			// check which item is selected to make the dropdown work
			provinces = provinces.map(function (provinces) {
				province.selected = province.id === client.province_id ? "selected" : "provinces";
				return province;
			});

			res.render('clients/edit', {
				provinces: provinces,
				data: client
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {
		try{
			await clientService.update({
				category_id: Number(req.body.category_id),
				contact_details: req.body.contact_details,
				branch: Text(req.body.branch),
				email_address:Text(req.body.email_address),
				postal_code:Text(req.body.postal_code),
				busines_tel:Text(req.body.busines_tel),
				cell:Text(req.body.cell),
				status:Text(req.body.status),
				id: req.params.id
			});
			req.flash('info', 'client updated!')
			res.redirect('/clients');
		}
		catch(err){
			next(err.stack);
		}
	};

	async function deleteClients (req, res, next) {
		try{
			var id = req.params.id;
			// await pool.query('DELETE FROM clients WHERE id = $1', [id]);
			await clientService.delete(id);
			req.flash('info', 'Client deleted!')
			res.redirect('/client');
		}
		catch(err){
			next(err);
		}
	};

	return {
		show,
		showAdd,
		add,
		get,
		delete : deleteClients,
		update
	}
}
