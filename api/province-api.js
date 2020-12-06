module.exports = function (franchiseService) {
	
	async function all(req, res) {
		try {
			let franchises = await franchiseService.all();
			res.json({
				status: 'success',
				data: franchises
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function add(req, res) {
		try {
			let input = req.body;
			await franchiseService.add(input);
			res.json({
				status: 'success',
				data: franchises
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
			var id = req.params.id;
			let result = await franchiseService.get(id);
			res.json({
				status: 'success',
				data: result.rows[0]
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function update(req, res) {

		try {
			const data = req.body;
			const id = req.params.id;
			const result = data.result;

			await franchiseService.update({
				id,
				details
			})
			res.json({
				status: 'success'
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

	};

	async function deleteOne(req, res) {
		try{
			const id = req.params.id;
			await franchiseService.delete(id);
			res.json({
				status: 'success'
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
		add,
		delete: deleteOne,
		update,
		get,
		all
	}
}
