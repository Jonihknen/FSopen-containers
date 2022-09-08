const express = require('express');
const router = express.Router();

const redis = require('../redis')


router.get('/', async (req, res) => {
    const todos = await redis.getAsync('added_todos')
    console.log(todos)
    if (todos === null || isNaN(todos)) {
        await redis.setAsync('added_todos', 0)
    }
    const freshTodos = await redis.getAsync('added_todos')
    console.log(freshTodos)
    res.send({
       added_todos: freshTodos
    })
})
    
module.exports = router;
