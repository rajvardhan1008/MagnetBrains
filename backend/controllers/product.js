const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {

    const {
      name,
      price,
      category,
      quantity,
      image,
      description,
      listedBy,
    } = req.body;

    if (
      !name ||
      !price ||
      !category ||
      !quantity ||
      !image ||
      !description,
      !listedBy
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      quantity,
      image,
      description,
      listedBy
    });

    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log("in the catch while creating product")
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const {name, price, quantity} = req.body
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: "Course not found" })
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await Product.save()

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: product,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body
    const productDetails = await Product.findOne({
      _id: productId,
    }).populate({path: "listedBy",}).exec();
      

    if (!productDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find product with id: ${productId}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: productDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body

    const product = await productId.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "product not found" })
    }

    await Product.findByIdAndDelete(productId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getallProducts = async (req, res)=>{
    try{
        const products = await Product.find({});

        return res.status(200).json({
            success:true,
            message:'Products fetched success',
            data:products
        })
    }catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}