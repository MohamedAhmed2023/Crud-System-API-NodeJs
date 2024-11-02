const product = require('../model/Products');
const httpStatus = require('../utils/HTTP-STATUS');


const getallProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.json({ status: httpStatus.SUCCESS, data: products });
    } catch (error) {
        res.status(500).json({ status: httpStatus.fAIL, message: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const Product = await product.findById(req.params.Productid);
        if (!Product) {
            res.status(404).json({ status: httpStatus.fAIL, message: 'Product not found' });
        }
        res.json({ status: httpStatus.SUCCESS, data: Product });
    } catch {
        res.json({ status: httpStatus.fAIL, message: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, price, image, description } = req.body;
        const newProducts = new product({
            title,
            price,
            image,
            description
        });
        await newProducts.save();
        res.json({ status: httpStatus.SUCCESS, message: 'Product added successfully' });
    } catch (error) {
        res.json({ status: httpStatus.fAIL, message: error.message });
    }
}

const updateProducts = async (req, res) => {
    const Productid = req.params.Productid;
    try {
        const updateProduct = await product.findByIdAndUpdate(Productid, { $set: { ...req.body } });
        return res.status(200).json({
            status: httpStatus.SUCCESS,
            updateProduct
        })
    } catch (error) {
        res.json({ status: httpStatus.fAIL, message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await product.deleteOne({ _id: req.params.Productid })
        res.status(200).json({ status: httpStatus.SUCCESS, message: 'Product deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: httpStatus.fAIL, message: error.message });
    }
}

module.exports = {
    getallProducts, addProduct, getProduct, updateProducts, deleteProduct
}