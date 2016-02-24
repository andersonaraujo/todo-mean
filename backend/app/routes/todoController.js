var Todo = require('../models/todo');

module.exports = function (app) {

    // test route to make sure everything is working (accessed at /api)
    app.get('/api', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    // get all the todos (accessed at GET /api/todos)
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });

    // create a todo (accessed at POST /api/todos)
    app.post('/api/todos', function (req, res) {
        var todo = new Todo();
        todo.task = req.body.task;
        // save the todo and check for errors
        todo.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Todo created!'});
        });
    });

    // get the todo with that id (accessed at GET /api/todos/:todo_id)
    app.get('/api/todos/:todo_id', function (req, res) {
        Todo.findById(req.params.todo_id, function (err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    });

    // update the todo with this id (accessed at PUT /api/todos/:todo_id)
    app.put('/api/todos/:todo_id', function (req, res) {
        // use our todo model to find the todo we want
        Todo.findById(req.params.todo_id, function (err, todo) {
            if (err)
                res.send(err);
            todo.task = req.body.task;
            // save the todo
            todo.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'Todo updated!'});
            });
        });
    });

    // delete the todo with this id (accessed at DELETE /api/todos/:todo_id)
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Todo successfully deleted'});
        });
    });

};