module.exports = function ProvinceRoutes(provinceService) {
	
	async function show(req, res, next) {
		try {
			let provinces = await provinceService.all();
			res.render('provinces/home', {
				no_clients: provinces === 0,
				provinces,
			});
		}
		catch (err) {
			next(err);
		}
	};

	function showAdd(req, res, next) {
		res.render('provinces/add');
	}

	async function add(req, res, next) {
		const {contact_details} = req.body;
		try {
			
			if (!contact_details) {
				req.flash('error', 'Province is empty!');
				return res.redirect('/provinces/add');
			}

			await provinceService.add(contact_details);
			req.flash('info', 'province added!');
			res.redirect('/provinces');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'province already exists : ' + contact_details);
				return res.redirect('/provinces/add');
			}

			next(err)
		}
	};

	async function get(req, res, next) {
		try {
			var id = req.params.id;
			let result = await provinceService.get(id); // pool.query('SELECT * FROM categories WHERE id = $1', [id]);
			res.render('provinces/edit', {
				page_title: "Edit Customers - Node.js",
				data: result
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {

		try {

			console.log(JSON.stringify(req.headers));

			let data = req.body;
			let id = req.params.id;
			let contact_details = req.body.contact_details;

			await provinceService.update({
				id,
				contact_details
			})
			req.flash('info', 'Province updated!');
			res.redirect('/provincs');
		}
		catch (err) {
			next(err);
		}

	};

	async function deleteOne(req, res, next) {
		var id = req.params.id;
		try{
			await pro.delete(id);
			req.flash('info', 'province deleted!');
			res.redirect('/province');
		}
		catch(err){
			next(err);
		}
	};

	return {
		add,
		delete: deleteOne,
		update,
		get,
		showAdd,
		show
	}
}
