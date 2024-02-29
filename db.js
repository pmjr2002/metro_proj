const {Client} = require('pg');
const client  = new Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'dbs_project',
        password: 'krishnaarpanamasthu18',
        port: 5433, // Default PostgreSQL port is 5432  
    });
client.connect((err)=>
{
    if(err)
        console.log('connection error')
    else
        console.log('connected successfully')
}
);
    
module.exports = client;