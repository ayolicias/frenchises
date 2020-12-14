module.exports = function franchService(pool){
    async function all(){
        let provinces = await pool.query('SELECT * from provinces');
        return provinces.rows;
    }
    async function add(province_name){
        let data = [
            province_name
        ];
        let results = await pool.query(`insert into provinces (province_name)  
            values ($1)
            returning id, province_name`, data);
        return results.rows[0]
    }

    async function get(id){
        let results = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
        if (results.rows.length > 0) {
            return results.rows[0];
        }
        return null;
    }
    async function sort(id){
        let status = await pool.query('SELECT * FROM provinces WHERE status = $1',[id]);
        if(status.rows.length>0){
            return status.rows[0];
        }
        return null;
    }

    async function update(province){
        return pool.query('UPDATE client SET contact_details = $1 WHERE id = $2', [province.contact_details, province.id]);
    }

    async function deleteOne (id){
        return pool.query('DELETE FROM provinces WHERE id = $1', [id]);
    }

    return {
        add,
        all,
        delete : deleteOne,
        get,
        update,
        sort
    }
}