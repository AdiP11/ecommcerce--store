const express = require('express');
const fs = require('fs');
const Razorpay = require('razorpay');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('frontend'));

// Load products from JSON file
app.get('/api/products', (req, res) => {
    fs.readFile('backend/products.json', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to load products' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// Mock payment initiation (using Razorpay as an example)
app.post('/api/buy/:id', (req, res) => {
    const { id } = req.params;

    const razorpayInstance = new Razorpay({
        key_id: 'YOUR_KEY_ID',
        key_secret: 'YOUR_KEY_SECRET'
    });

    const options = {
        amount: 100 * 100, // Product price in smallest currency unit (e.g., paise for INR)
        currency: "INR",
        receipt: `order_rcptid_${id}`
    };

    razorpayInstance.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).send({ error: 'Payment initiation failed' });
        }
        res.send({ message: 'Order created', order });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
