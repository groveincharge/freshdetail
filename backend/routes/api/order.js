const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {authmiddleware} = require('./../auth');
const Order = require("./../../models/Order");
const Product = require("./../../models/Product");


/* GET Orders list. */
router.get('/', (req, res, next) => {
        Order.find()
             .select('product quantity _id')
             .populate('product')
             .exec()
             .then(docs => {
             	console.log(docs);
             	res.status(200).json({
             		count: docs.length,
             		orders: docs.map(doc => {
             			return {
             				_id: doc._id,
             		   quantity: doc.quantity,
             		    product: doc.product,
                        request: {
         	       	       type: 'GET',
         	       	        url: 'http://localhost:4000/api/order' + doc._id
         	               }
             			}
             		})
             	})
             })
             .catch(err => {
             	res.status(500).json({
             		message: 'An error has occurred.',
             		error: err
             	})
             })
});

router.get('/:orderId', function(req, res, next) {
	const id = req.params.orderId;
	Order.findById(id)
	 .populate('product')
	.exec()
    .then(order => {
    	if(!order){
            res.status(404).json({
            	message: 'Order Not Found'
            })
    	};
    	res.status(200).json({
                    order: order,
                  request: {
                  	   type: 'GET',
                  	   url: 'http://localhost:4000/api/order '+order._id
                  }
    	  });
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

router.post('/', (req, res) => {

	console.log('Inside POST /api/order callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from POST /api/order route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from POST /api/order route ${req.isAuthenticated()}`);
	 console.log(`req.user from POST /api/order route ${req.user}`);
   console.log(`req.file from inside POST /api/order router ${JSON.stringify(req.file)}`);

	  Product.findById(req.body.product)
	       .then(product => {
	       	if(!product){
          return res.status(404).json({
          	           message: 'Product Not Found'
          })
	       	};
             const order = new Order({
             	   _id: mongoose.Types.ObjectId(),
              quantity: req.body.quantity,
               product: req.body.product
                });

             return order.save()
              })
                  .then(result => {
	                    res.status(201).json({
	         	             message: 'Item Order Successful',
	         	        createdOrder: {
	         	     	         _id: result._id,
	         	             product: result.product,
                            quantity: result.quantity
	         	        },
                     request: {type: 'POST',
                               url: 'http://localhost:4000/api/order ' + result._id
                             }
	                   })   
	       })
	        .catch(err => {
	       	  res.status(500).json({
	       	  	message: 'Product Not Found',
	       	  	error: err
	       	  })
	       })
});

router.delete('/:orderId', function(req, res, next) {
	const id = req.params.orderId;
	Order.deleteOne({ _id: id })
	.exec()
	.then(result => {
		  console.log(result);
		res.status(200).json({
			     message: 'Order Deleted',
			     orderId: id,
                  request: {
                  	   type: 'POST',
                  	    url: 'http://localhost:4000/api/order/' + id
                        }
		             });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

router.patch("/:orderId", function(req, res, next) {
	const id = req.params.orderId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Order.update({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
});

module.exports = router; 