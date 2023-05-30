const { nanoid } = require('nanoid');
const books = require('./books');

const saveBook = (request, h) => {
    let response = null;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (name == '' || name == null) {
        response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            },
        });
        response.code(201);
        return response;
    }
};

// const getAllDataBooks = () => ({
//     status: 'success',
//     data: {
//         books: books.map((book) => ({
//             id: book.id,
//             name: book.name,
//             publisher: book.publisher
//         }))
//     }
// });

const getAllDataBooks = (request, h) => {
    const { name, reading, finished } = request.query;

    if (name != null) {
        const book = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const response = h.response({
            status: 'success',
            data: {
                books: book.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        });
        response.code(200);
        return response;
    }else if (reading != null) {
        const book = books.filter((book) => book.reading == reading);
        const response = h.response({
            status: 'success',
            data: {
                books: book.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        });
        response.code(200);
        return response;
    }else if (finished != null) {
        const book = books.filter((book) => book.finished == finished);
        const response = h.response({
            status: 'success',
            data: {
                books: book.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    });
    response.code(200);
    return response;
}

const getBookDetails = (request, h) => {
    const { id } = request.params;

    const book = books.filter((book) => book.id === id)[0];

    if (book != undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
        response.code(404);
        return response;
    }
};

const updateBook = (request, h) => {
    const { id } = request.params;
    const isFound = books.filter((book) => book.id === id).length > 0;
    
    let response = null;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!isFound) {
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }else if (name == '' || name == null) {
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();
    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt
        }

        response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        });
        response.code(200);
        return response;
    }

    response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
    return response;
};

const deleteBook = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);
    
    let response = null;

    if (index !== -1) {
        books.splice(index, 1);
        response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        });
        response.code(200);
        return response;
    }

    response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    });
    response.code(404);
    return response;

}



module.exports = { saveBook, getAllDataBooks, getBookDetails, updateBook, deleteBook }
