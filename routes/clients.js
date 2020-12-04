const { text } = require('express');
const clientService = require('../services/client-service');
// const ClientService = require('../services/client-service');
const provinces = require('./province');

module.exports = function(clientService, provinceService) {
	
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
			res.render('client/add', {
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
				province_id:req.body.province_id,
				contact_details :eq.body.contact_details,
				branch:req.body.branch,
				email_address:req.body.email_address,
				postal_code: req.body.postal_code,
				business_tell: req.body.busines_tell,
				cell: req.body.cell,
				status: req.body.status,	
			});
			
			req.flash('info', 'Client added!')
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
			provinces = provinces.map(function (province) {
			province.selected = province.id === client.province_id	 ? "selected" : "";
				return province;
			});

			res.render('client/edit', {
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
					province_id:req.body.province_id,
					contact_details :eq.body.contact_details,
					branch:req.body.branch,
					email_address:req.body.email_address,
					postal_code: req.body.postal_code,
					business_tell: req.body.busines_tell,
					cell: req.body.cell,
					status: req.body.status,
			});
			req.flash('info', 'Client updated!')
			res.redirect('/client');
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
			req.flash('info','Client deleted!')
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
