const connection = require("../configs/Database");

const getAll = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM `products`', function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            }
        );
    })
}

const getByName = (name) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM `products` where name = ?', [name], function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0] || null);
            }
        );
    })
}

const create = (newRegister) => {
    return new Promise((resolve, reject) => {
        connection.execute(
            "insert into products(name, price) VALUES(?, ?)",
            [newRegister.name, newRegister.price], function (err, row) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            }
        );
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM `products` where id = ?', [id], function (err, results) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0] || null);
            }
        );
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE * FROM `products` where id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    })
}


const update = (id, datasModified) => {
    let fieldsUpdate = [];
    let valuesForUpdate = [];

    Object.keys(datasModified).map(key => {
        fieldsUpdate.push(`${key} = ?`);
        valuesForUpdate.push(datasModified[key]);
    });

    isExistFieldUpdate = fieldsUpdate.length > 0;
    if (!isExistFieldUpdate) {
        return;
    }

    fieldsUpdate = fieldsUpdate.join(", ");


    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE products SET ${fieldsUpdate} where id = ?`,
            [...valuesForUpdate, id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    })
}


module.exports = {
    getAll, getById, create, getByName, remove, update
}