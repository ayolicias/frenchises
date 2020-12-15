const FranchiseService = require('../services/franchises-service');

module.exports = function(franchiseService, franchService) {
	
	async function show(req, res, next) {
		try {
			let results = await franchiseService.all(); 
			res.render('franchises/home', {
				no_client: results.length === 0,
				franchises: results,
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function showAdd(req, res, next) {
		try {
			let franch = await franchService.all();
			res.render('franchises/add', {
				franch: franch,
			});
		}
		catch (err) {
			next(err);
		}
	};
	async function add(req, res, next) {

		try {
			await franchiseService.create({
				province_id: Number(req.body.province_id),
				province_name :req.body.province_name,
				contact_details :req.body.contact_details,
				branch:req.body.branch,
				email_address:req.body.email_address,
				postal_code: req.body.postal_code,
				business_tell: req.body.busines_tell,
				cell: req.body.cell,
				status: req.body.status,	
			});
			
			req.flash('info','franchise Added!')
			res.redirect('franchises/home');
		}
		catch (err) {
			next(err);
		}
	};

	async function get(req, res, next) {
		try {
			let id = req.params.id;
			let franch = await franchService.all();
			let franchise = await franchiseService.get(id);
			// check which province is selected to make the dropdown work

			franch = franchises.map(function (franch) {
			franch.selected = province.id === franchises.province_id	 ? "selected" : "";
				return franch;
			});

			res.render('franchises/home', {
				franchises: franchises,
				data: franchises
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {
		try{
			await franchiseService.update({
					province_name :req.body.province_name,
					contact_details :req.body.contact_details,
					branch:req.body.branch,
					email_address:req.body.email_address,
					postal_code: req.body.postal_code,
					business_tell: req.body.busines_tell,
					cell: req.body.cell,
					status: req.body.status,
			});
			req.flash('info', 'Franchises updated!')
			res.redirect('/franchises/home');
		}
		catch(err){
			next(err.stack);
		}
	};

async function sortRecords(req, res) {
    try{
        await franchiseService.clear();
        res.redirect('/');

    } catch (err) {
        res.send(err.stack)
    }
}
	


	async function deleteFranchises (req, res, next) {
		try{
			var id = req.params.id;
			// await pool.query('DELETE FROM clients WHERE id = $1', [id]);
			await franchiseService.delete(id);
			req.flash('info','Franchises deleted!')
			res.redirect('/franchises');
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
		delete : deleteFranchises,
		update,	
		sortRecords
	}
}
