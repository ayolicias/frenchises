module.exports = function ProvinceRoutes(provinceService) {
	
	async function show(req, res, next) {
		try {
			let provinces = await provinceService.all();
			res.render('client/home', {
				no_client: provinces === 0,
				provinces,
			});
		}
		catch (err) {
			next(err);
		}
	};

	function showAdd(req, res, next) {
		res.render('client/add');
	}

	async function add(req, res, next) {
		const {contact_details} = req.body;
		const{branch} = req.body;
		const{}
		try {
			
			if (!contact_details) {
				req.flash('error', 'details is empty!');
				return res.redirect('/details/add');
			}
			if (!branch) {
				req.flash('error', 'details is empty!');
				return res.redirect('/details/add');
			}
			if (!email_address) {
				req.flash('error', 'details is empty!');
				return res.redirect('/details/add');
			}
			if (!postal_code) {
				req.flash('error', 'details is empty!');
				return res.redirect('/details/add');
			}
			if (!business_tell) {
				req.flash('error', 'details is empty!');
				return res.redirect('/details/add');
			}
		
		if (!cell) {
			req.flash('error', 'details is empty!');
			return res.redirect('/details/add');
		}
		if (!status) {
			req.flash('error', 'details is empty!');
			return res.redirect('/details/add');
		}

			await provinceService.add(contact_details);
			req.flash('info', 'client added!');
			res.redirect('/client');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'client already exists : ' + contact_details);
				return res.redirect('/client/add');
			}

			next(err)
		}
	};

	async function get(req, res, next) {
		try {
			var id = req.params.id;
			let result = await provinceService.get(id); // pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
			res.render('client/edit', {
				page_title: "Edit clients - Node.js",
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
			res.redirect('/provinces');
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
