module.exports = function FranchiseService(pool){
    async function all(){
        const query = `SELECT * FROM franchises WHERE status ='Active'`;         
        let results = await pool.query(query);
        return results.rows;
    }
    async function create(franchises){
        let data = [
            franchises.franch_id,
            franchises.province_name,
            franchises.contact_details,
            franchises.branch,
            franchises.email_address,
            franchises.postal_code,
            franchises.business_tell,
            franchises.cell,
            franchises.status,
            franchises.id
        ];

    return pool.query(`insert into franchises (province_name,contact_details,branch,address,email_address,postal_code,business_tell,cell,status)values ($1, $2, $3,$4, $5, $6,$7, $8,$9,$10,$11)`, data);
    }
    async function get(id){
        let franchiseResult = await pool.query('SELECT * FROM franchises', [id]);
        let franchise = franchiseResult.rows[0];
       return franchise;
    }
    async function sort(id){
        let statusResult =await pool.query('SELECT * FROM franchises',[id]);
        let records = statusResult.rows[0];
        return records;
    }

    async function update(franchises){
        var data = [
            franchises.province_id,
            franchises.contact_details,
            franchises.branch,
            franchises.email_address,
            franchises.postal_code,
            franchises.business_tell,
            franchises.cell,
            franchises.status,
            franchises.id
        ];
        
        let updateQuery = `UPDATE client
            SET 
                province_id = $1, 
                province_name $2
                contact_details = $3, 
                branch = $4 
                address = $5
                email_address = $6, 
                postal_code = $7,
                business_tell = $8, 
                cell = $9,
                status = $10, 

            WHERE id = $10`;

        return pool.query(updateQuery, data);
    }

    async function deleteById(id) {
        return pool.query('DELETE FROM franchises WHERE id = $1', [id]);
    }

    return{
        all,
        create,
        delete: deleteById,
        get,
        update,
        sort
    }
}