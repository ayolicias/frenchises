module.exports = function FranchiseService(pool){
    async function all(){
        const query = (`select * from client`);
        let results = await pool.query(query);
        return results.rows;
    }
    async function create(client){
        let data = [
            // client.province_id,
            client.province_id,
            client.contact_details,
            client.branch,
            client.email_address,
            client.postal_code,
            client.business_tell,
            client.cell,
            client.status,
            client.id
        ];
        return pool.query(`insert into client (client_id,contact_details,branch,address,email_address,postal_code,business_tell,cell,status)values ($1, $2, $3,$4, $5, $6,$7, $8,$9)`, data);
    }
    async function get(id){
        let franchiseResult = await pool.query('SELECT * FROM client', [id]);
        let franchise = franchiseResult.rows[0];
       return franchise;

    }
    async function sort(id){
        let statusResult =await pool.query('SELECT * FROM client',[id]);
        let records = statusResult.rows[0];
        return records;
    }

    async function update(client){
        var data = [
            client.province_id,
            client.contact_details,
            client.branch,
            client.email_address,
            client.postal_code,
            client.business_tell,
            client.cell,
            client.status,
            client.id
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
        return pool.query('DELETE FROM clients WHERE id = $1', [id]);
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