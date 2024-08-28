const Order = require('../models/orderModel')

exports.createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, shippingAddress, paymentDetails } = req.body;

        // Validate that items array is not empty
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
        }

        // Calculate totalAmount if not provided
        let calculatedTotal = totalAmount;
        if (!calculatedTotal) {
            calculatedTotal = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0); // assuming product price is accessible via populated product field
        }


        // Create the new order
        const newOrder = new Order({
            user,
            items,
            totalAmount: calculatedTotal,
            shippingAddress,
            paymentDetails,
        });

        console.log(newOrder);
        

        // Save the order to the database
        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    }
};


//status update by admin only 
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;  // Order ID from the URL params
        const { status } = req.body;  // New status from the request body

        // Validate the status
        const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        // Find the order and update the status
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate the status
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


