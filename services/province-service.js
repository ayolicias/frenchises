module.exports = function ProvinceService(pool){
    async function all(){
        let provinces = await pool.query('SELECT * from provinces');
        return provinces.rows;
    }
    async function add(contact_details){
        let data = [
            contact_details
        ];
        let results = await pool.query(`insert into provinces (contact_details)  
            values ($1)
            returning id, contact_details`, data);
        return results.rows[0]
    }

    async function get(id){
        let results = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
        if (results.rows.length > 0) {
            return results.rows[0];
        }
        return null;
    }

    async function update(category){
        return pool.query('UPDATE categories SET contact_details = $1 WHERE id = $2', [category.contact_details, province.id]);
    }

    async function deleteOne (id){
        return pool.query('DELETE FROM provinces WHERE id = $1', [id]);
    }

    return {
        add,
        all,
        delete : deleteOne,
        get,
        update
    }
}