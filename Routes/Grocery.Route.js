import express from "express";
const router = express.Router();
import Products from '../Model/Grocery.Model.js';
import { v2 as cloudinary } from 'cloudinary';
import upload from "../Middleware/Multer.middleware.js";
import { CreateProduct,UpdateProduct } from "../Middleware/Grocery.middleware.js";
import {validationResult} from "express-validator"

cloudinary.config({
    cloud_name: 'dyvs1yt5s',
    api_key: '188848741915724',
    api_secret: '3kew-OciRLbFAPCtPtb81KYtu9Y'
});


const uploadToCloud = (imageBuffer) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(new Error('Failed to upload file to Cloudinary'));
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(imageBuffer);
        });
    } catch (error) {
        console.log('error inside uploadation' + error);
    }
};

//Get all  Route
router.get('/get-all-products', async (req, res) => {
    try {
        const ProductData = await Products.find({});
        res.status(200).json({ ProductData })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create Routes

//Post Route
router.post('/add-product', upload.single('image'),async (req, res) => {
    try {

        // const err = validationResult(req);
        // if (!err.isEmpty()) {
        //     return res.status(400).json({ eror: err.array() });
        // }
        // res.send("user Created Successfully");
        const { title, description, price, feature, category } = req.body;
        const result = await uploadToCloud(req.file.buffer)
        const ProductData = await Products.create({
            title: title,
            description: description,
            price: price,
            feature: feature,
            category: category,
            image: result.secure_url

        })
        res.status(201).json({
            ProductData
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//Update the Endpoints
router.put('/update-product/:awais', upload.single('image'),UpdateProduct,async (req, res) => {

    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ eror: err.array() });
        }
        const id = req.params.awais
        const { title, description, price, feature, category } = req.body;
        let result
        if(req.file){
            result = await uploadToCloud(req.file.buffer)
        }
        const UpdateData = await Products.findByIdAndUpdate(id, { title, description, price, feature, category,image:result.secure_url }, { new: true })
        res.status(201).json({
            UpdateData
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

});

//Delete the EndPoints
router.delete('/delete-product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const DeleteData = await Products.findByIdAndDelete(id)
        res.status(201).json({
            DeleteData
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

});

export default router;