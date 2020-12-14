// const franchService = require("../services/franch-service");

module.exports = function (franchService) {
	
	async function all(req, res) {
		try {
			let franch = await franchService.all();
			res.json({
				status: 'success',
				data: franch
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
			await franchService.add(input);
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
			let result = await franchService.get(id);
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
			const province_name = data.province_name;

			await provinceService.update({
				id,
				province_name
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
			await franchService.delete(id);
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
