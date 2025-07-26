const Product = require("../models/Product");
const User = require('../models/User');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'AfKX0t44QJP2HFmcleGteZ6HylmW3x1Tb7-SmPH9XpQ4mFC-J_Ub_bCPPK990peA48SYSZ_miRprQuEB',
    'client_secret': 'EIoGfkX5NqxG9Xwj4qCSI0AnqBAOhW8wyjIWZlMUBff2Zlw5YLa_vpGlhS6PWZgXuOET3KLZqBEBB4gQ'
});

exports.makePayment = (product) => {
  console.log("in make payments", product);
  return new Promise((resolve, reject) => {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel"
      },
      transactions: [{
        item_list: {
          items: [{
            name: product.name,
            price: product.price.toFixed(2), 
            currency: "USD",
            quantity: product.quantity
          }]
        },
        amount: {
          currency: "USD",
          total: (product.price * product.quantity).toFixed(2) 
        },
        description: product.description
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("PayPal Error:", error.response); 
        reject(error);
      } else {
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        if (approvalUrl) {
          resolve(approvalUrl.href);
        } else {
          reject(new Error('No approval_url found'));
        }
      }
    });
  });
};

exports.createOrder = async (req, res) => {
  try {
    const { productId, customerId } = req.body;

    if (!customerId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Customer and Product Id required",
      });
    }

    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!productDetails.quantity || productDetails.quantity <= 0) {
      productDetails.quantity = 1;
    }

    const approvalUrl = await exports.makePayment(productDetails);

    return res.status(200).json({
      success: true,
      approvalUrl,
      message: "Redirect to PayPal for payment",
    });

  } catch (error) {
    console.error("Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
      error: error.message,
    });
  }
};
