import mysql from 'mysql'
import express from 'express'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'password',
    database:'test',
    port: 3306
})
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.json('this is the backend')
})


app.get('/todos', (req, res)=>{
    const select ="SELECT * FROM test.todo"
    try {
        db.query(select,(err, data)=>{
            if (err){
                return res.json(err)
            }else{
                return res.json(data)
            }
        })        
    } catch (error) {
        console.log(error)        
    }
})


app.post('/add', (req, res)=>{
    const INSERT ="INSERT INTO test.todo (`name`, `display`,`creation_date`) values (?)"
    const values = [req.body.name, req.body.display, req.body.creation_date]
    try {
        db.query(INSERT,[values],(err, data) =>{
            if (err){
                console.log(err)
            }else{
                return res.json('Todo Added')
            }
        })        
    } catch (error) {
        console.log(error)        
    }
})

app.put('/update/:id', (req, res)=>{
    const todoID = req.params.id;
    const Update = 'UPDATE TODO SET `name`=?, `display`=? where id = ?';
    const values = [req.body.name, req.body.display];
    try {
        db.query(Update, [...values, todoID], (err, data)=>{
            if (err) console.log(err);
            return res.json('Todo Updated');
        })
    } catch (error) {
        console.log(error)
    }
})
app.listen(8800, ()=>{
    console.log('connected to backend')
})