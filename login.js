const express = require('express')
const zod = require('zod')
//const jwt = require('jsonwebtojken')
const db = require('./db')
const port = 3000
const app = express()
const schema = zod.object(
    {
    username : zod.string(),
    password : zod.string(),
    }
);
app.use(express.static('public'))
app.use(express.json());
app.get('/',(req,res)=>
{
    res.send('homepage')
})
app.get('/login',(req,res)=>
{
    res.sendFile('views/login_init.html',{ root: __dirname });
})
app.get('/login_user',(req,res)=>
{
    res.sendFile('views/login_user.html',{ root: __dirname });
})
app.use((req,res,next)=>
{
    if(schema.parse(req.body))
    {
        next();
    }else{
        res.status(400).send('the given input is not valid')
    }
})
app.post('/login_user',async (req,res)=>
{
    const info = req.body;
    const username = info.username;
    const pass = info.password;

    try {
        const result = await db.query('SELECT PASSWORD FROM USERS WHERE USERNAME=$1', [username]);
        
        if (result.rows.length > 0) {
            const password = result.rows[0].password; // Extract password from the first row
            if (password === pass) {
                console.log('login successful');
            } else {
                res.status(401).send('login failed'); // Use appropriate status code for failed authentication
            }
        } else {
            // No user found with the provided username
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).send('Internal server error');
    }

});
app.listen(port,(req,res)=>
{
    console.log(`listening ${port}`)
})

