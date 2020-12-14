module.exports = function FranchRoutes(franchService) {
	
	async function show(req, res, next) {
		try {
			let provinces = await franchService.all();
			res.render('franch/home', {
				no_franchises: provinces === 0,
				provinces,
			});
		}
		catch (err) {
			next(err);
		}
	};

	function showAdd(req, res, next) {
		res.render('franch/home');
	}

	async function add(req, res, next) {
		const {province_name} = req.body;
		try {
			
			if (!province_name) {
				req.flash('error', 'details is empty!');
				return res.redirect('/franchises/add');
			}

			await frannchService.add(province_name);
			req.flash('info', 'details added!');
			res.redirect('/franchises');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'details already exists : ' + province_name);
				return res.redirect('/franchises/add');
			}

			next(err)
		}
	};

	async function get(req, res, next) {
		try {
			var id = req.params.id;
			let result = await franchService.get(id); // pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
			res.render('franch/edit', {
				page_title: "Edit Customers - Node.js",
				data: result
			});
		}
		catch (err) {
			next(err);
		}
	};
	
	async function sorts(req, res, next) {
		const {status_type} = req.body;
		try {
			
			if (!status_type) {
				req.flash('error', 'status is empty!');
				return res.redirect('/franchises/home');
			}

			await franchService.sort(status_type);
			req.flash('info', 'status added!');
			res.redirect('/franchises');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'status already exists : ' + status_type);
				return res.redirect('/franchises/home');
			}

			next(err)
		}
	};

	async function update(req, res, next) {

		try {

			console.log(JSON.stringify(req.headers));

			await provinceService.update({
				province_id:req.body.province_id,
				province_name :req.body.province_name,
				contact_details :req.body.contact_details,
				branch:req.body.branch,
				email_address:req.body.email_address,
				postal_code: req.body.postal_code,
				business_tell: req.body.busines_tell,
				cell: req.body.cell,
				status: req.body.status,
			})
			req.flash('info', 'Franchise updated!');
			res.redirect('/franch');
		}
		catch (err) {
			next(err);
		}

	};

	async function deleteOne(req, res, next) {
		var id = req.params.id;
		try{
			await franchService.delete(id);
			req.flash('info', 'franchises deleted!');
			res.redirect('/franch');
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
