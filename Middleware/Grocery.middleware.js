import { check } from "express-validator";

const CreateProduct=[
    check('title').notEmpty().withMessage('The Title Message is Required'),
    check('description').notEmpty().withMessage('The Description is required'),
    check('price').notEmpty().isNumeric().withMessage('The Price  is Required'),
    check('category').notEmpty().withMessage('The category is required'),
    check('image').notEmpty().withMessage('The image is Required'),
    check('feature').notEmpty().isArray().withMessage('The features are required'),

]

const UpdateProduct=[
    check('title').optional().notEmpty().withMessage('The Title Message is required'),
    check('description').optional().notEmpty().withMessage('The Description is Required'),
    check('price').optional().notEmpty().isNumeric().withMessage('The Price  is Required'),
    check('category').optional().notEmpty().withMessage('The category is required'),
    check('image').optional().notEmpty().withMessage('The image is Required'),
    check('feature').optional().notEmpty().isArray().withMessage('The features are required'),
]

export
    {UpdateProduct,
        CreateProduct
 }