const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 4000;

const sequelize = new Sequelize('postgres://postgres:yfBy2sMrcxqjF0Wue6lI@boomland-db.cdtrzcaj5mcl.eu-central-1.rds.amazonaws.com:2432/boomland');

const LinkedAccount = sequelize.define('LinkedAccount', {
    sequence_testnet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sequence_mainnet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metamask: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

app.use(cors({ origin: 'https://www.boomland.io' }));
app.use(express.json());

app.post('/insert-values', async (req, res) => {
    const { sequence_testnet, sequence_mainnet, metamask } = req.body;

    try {
        const result = await LinkedAccount.create({
            sequence_testnet,
            sequence_mainnet,
            metamask
        });
        res.send('Values inserted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting values');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
