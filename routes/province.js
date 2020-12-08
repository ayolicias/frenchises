module.exports = function ProvinceRoutes(provinceService) {
	
	async function show(req, res, next) {
		try {
			let provinces = await provinceService.all();
			res.render('province/home', {
				no_client: provinces === 0,
				provinces,
			});
		}
		catch (err) {
			next(err);
		}
	};

	function showAdd(req, res, next) {
		res.render('province/add');
	}

	async function add(req, res, next) {
		const {contact_details} = req.body;
		try {
			
			if (!contact_details) {
				req.flash('error', 'details is empty!');
				return res.redirect('/client/add');
			}

			await provinceService.add(contact_details);
			req.flash('info', 'details added!');
			res.redirect('/client');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'details already exists : ' + contact_details);
				return res.redirect('/client/add');
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

	// async function sorts(req, res, next) {
	// 	try {
	// 		var status = req.params.status;
	// 		let sorting = await provinceService.sort(status); // pool.query('SELECT * FROM categories WHERE id = $1', [id]);
	// 		res.render('provinces/home', {
	// 			page_title: "Edit Customers - Node.js",
	// 			data: sorting
	// 		});
	// 	}
	// 	catch (err) {
	// 		next(err);
	// 	}
	// };

	
	async function sorts(req, res, next) {
		const {status_type} = req.body;
		try {
			
			if (!status_type) {
				req.flash('error', 'status is empty!');
				return res.redirect('/client/home');
			}

			await provinceService.sort(status_type);
			req.flash('info', 'status added!');
			res.redirect('/client');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'status already exists : ' + status_type);
				return res.redirect('/client/home');
			}

			next(err)
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
				description
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
			await provinceService.delete(id);
			req.flash('info', 'Province deleted!');
			res.redirect('/province');
		}
		catch(err){
			next(err);
		}
	};
	async function sortRecords() {
        let remove = await pool.query('DELETE FROM client');
        return remove.rows;
    }

	return {
		add,
		delete: deleteOne,
		update,
		get,
		showAdd,
		show,
		sorts,
		sortRecords
	}
}
