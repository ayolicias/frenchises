module.exports = function(franchiseService) {
	
	async function all(req, res) {
		try {
			let results = await franchiseService.all(); 
			res.json({
				status: 'success',
				data: results
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function add(req, res) {

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
			
			res.json({
				status: "success",
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function get(req, res) {
		try {
			let id = req.params.id;
			let franchise = await franchiseService.get(id);
			res.json({
				status: "success",
				data: client
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function update(req, res, next) {
		try{
			await franchiseService.update({
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
			res.json({
				status: "success"
			});
		}
		catch(err){
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function deleteclients (req, res, next) {
		try{
			var id = req.params.id;
			await clientService.delete(id);
			res.json({
				status: "success"
			});
		}
		catch(err){
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	return {
		all,
		add,
		get,
		delete : deleteclients,
		update
	}
}
