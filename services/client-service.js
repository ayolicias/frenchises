module.exports = function C(pool){
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
        let clientResult = await pool.query('SELECT * FROM client', [id]);
        let client = clientResult.rows[0];
        return client;

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
                contact_details = $2, 
                branch = $3 
                address = $4
                email_address = $5, 
                postal_code = $6,
                business_tell = $7, 
                cell = $8
                status = $9, 
                
            WHERE id = $9`;

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
        update
    }
}