const { 
    saveBook,
    getAllDataBooks,
    getBookDetails,
    updateBook,
    deleteBook } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: saveBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllDataBooks
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookDetails
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }
]

module.exports = routes;