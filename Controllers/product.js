// In order to handle file uploads
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const {errorHandler} = require('../helpers/dbErrorHandler');
const Product = require('../modals/product')

exports.create = (req, res)=>{
    // All the form data will now be available 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // Check for all fields
        const{name, description, price, category, quantity, shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields are required"
            })
        }
        let product = new Product(fields);



        if(files.photo){
            // console.log("File photo: ", files.photo);

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be less than 1MB in size"
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type
        }
        product.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}   