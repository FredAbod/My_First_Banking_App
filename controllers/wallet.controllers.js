const Wallets = require('../models/wallets');
const mongoose = require('mongoose');

exports.createWallet = async (req, res) => {
    try{
        const id = req.user._id
        console.log(id);

        
        const {username}= req.body;

        const walletExists = await Wallets.findOne({username});
        if (walletExists){
            return res.status(409).json({
                status: false,
                message: 'Wallet already exists',
            })
        }

        const result = await Wallets.create({username:username,userId:id});
        console.log(result)
        return res.status(201).json({
            status: true,
            message: 'Wallets created successfully',
            data: result
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: true,
            message: `Unable to create wallet. Please try again. \n Error: ${err}`
        })
    }
}
