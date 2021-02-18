const productService = require("../../services/ProductService");
const NotFoundException = require("../../exceptions/NotFoundException");

const getAllProducts = async () => {
    return await productService.getAll();
};

const getById = async (context, { id }) => {
    return await productService.getById(id);
}

const createProduct = async (context, { input }) => {
    const rowCreated = await productService.create(input);
    return {...input, id: rowCreated.insertId };
}

const remove = async (context, { id }) => {
    await productService.remove(id);
    return true;
}

const update = async (context, { id, datasModified }) => {
    await productService.update(id, datasModified);
    return true;
}

module.exports = {
    getAllProducts, createProduct, getById, remove, update
}