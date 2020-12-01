module.exports = function(clientService) {
	
	async function all(req, res) {
		try {
			let results = await clientService.all(); 
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
			await clientService.create({
				province_id: Text(req.body.province_id),
				details : req.body.details,
				cell: Text(req.body.cell)
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
			let client = await clientService.get(id);
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
			await clientService.update({
				province_id: Text(req.body.province_id),
				details: req.body.details,
				cell: Text(req.body.cell),
				id: req.params.id
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
