const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'computo'
});

// GET 
const getUsers = (request, response) => {
    pool.query('SELECT id, name, email FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results);
    });
};

// POST
const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Usuario Agregado con ID: ${results.insertId}`);
    });
};

// PUT
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Usuario modificado con ID: ${id}`);
        }
    );
};

// DELETE
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Usuario eliminado con ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
