const repository = require("../repositories/ProductRepository");
const NotFoundException = require("../exceptions/NotFoundException");
const BusinessException = require("../exceptions/BusinessException");


const getAll = () => {
    return repository.getAll();
}

const getById = async (id) => {
    const register = await repository.getById(id);
    if (!register) {
        throw new NotFoundException("Register not found!");
    }
    return register;
}

const remove = async (id) => {
    await getById(id);
    return repository.remove(id);
}


const update = async (id, datasModified) => {
    await getById(id);
    return repository.update(id, datasModified);
}



const create = async (newRegister) => {
    const isRegisterExist = await repository.getByName(newRegister.name);
    if (isRegisterExist) {
        throw new BusinessException("Product with name already exist!");
    }
    return repository.create(newRegister);
}

module.exports = {
    getAll, getById, create, remove, update
}