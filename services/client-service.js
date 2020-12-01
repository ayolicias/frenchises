module.exports = function C(pool){
    async function all(){
        const query = `select p.id, p.contact_details, p.branch, c.id as province_id, 
            c.contact_details as province_details from clients p
            join provinces c on c.id = p.province_id`;
        let results = await pool.query(query);
        return results.rows;
    }
    async function create(client){
        let data = [
            client.province_id,
            client.contact_details,
            client.branch,
            client.email_address,
            client.postal_code,
            client.business_tell,
            client.cell,
            client.status

        ];
        return pool.query(`insert into clients(clients_id, contact_details, branch,email_address,postal_code,business_tell,cell,status) 
                    values ($1, $2, $3,$4, $5, $6,$7, $8)`, data);
    }
    async function get(id){
        let productResult = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        let client = clientResult.rows[0];
        return product;

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
        
        let updateQuery = `UPDATE clients 
            SET province_id = $1, 
                contact_details = $2, 
                branch = $3 
                email_address = $4, 
                postal_code = $5,
                business_tell = $6, 
                cell = $37
                status = $8, 
                
            WHERE id = $8`;

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