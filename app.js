const express = require("express")
const { customers, items, orders } = require('./models')

const app = express()

const PORT = 3000

app.use(express.json())

app.get('/customers', async (req, res) => {
    const rows = await customers.findAll().catch((error) => {
        console.log(rows)
        res.status(400).send(`Error ${error}`);
    });;

    res.status(200).send(rows)
})

app.post('/customers', async (req, res) => {
    const { firstname, lastname, email, password, address } = req.body

    const rows = await customers.create({ firstname: firstname, lastname: lastname, email: email, password: password, address: address })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });

    res.status(200).send(rows)
})

app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await customers.destroy({ where: { id: id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
    res.status(200).send({ rows })
})

app.put('/customers/:id', async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, password, address } = req.body
    const { rows } = await customers.update({ firstname: firstname, lastname: lastname, email: email, password: password, address: address }, { where: { id: id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
    res.status(200).send(rows)
})

app.get('/orders', async(req, res) => {
    const {rows} = await orders.findAll().catch((error) => {
        console.log(orders)
        res.status(400).send(`Error ${error}`);
    })

    res.status(200).send(rows)
})

//fix not null customer id
app.post('/orders/customer_id', async(req, res) => {
    const {custmer_id} = req.params
    const {address, customer_id, delivered_at} = req.body
    const rows = await orders.create({ address: address, customer_id: customer_id, delivered_at: delivered_at })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });

        console.log(orders)
    res.status(200).send(rows)
})

app.put('/orders/:id', async(req, res) => {
    const { address, customer_id, delivered_at } = req.body
    const rows = await orders.update({address: address, customer_id:customer_id, delivered_at:delivered_at}, {where: {id: id} })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
        res.status(200).send(rows)
})

app.delete('/orders/:id', async(req, res) => {
    const {id} = req.params

    const { rows } = await orders.destroy({ where: { id: id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
        console.log(rows)
    res.status(200).send({ rows })

})

app.get('/items', async(req, res) => {
    const { rows } = await items.findAll().catch((error) => {
        res.status(400).send(`Error ${error}`);
    })
    res.status(200).send(rows)
})

app.post('/items', async(req, res) => {
    const {name, cost, product_type, order_id} = req.body
    const { rows } = await items.create({ name: name, cost: cost, product_type: product_type, order_id: order_id }).catch((error) => {
        res.status(400).send(`Error ${error}`);
    })

    res.status(200).send(rows)

})

app.put('/items/:id', async(req, res) => {
    const {id} = req.params
    const { name, cost, product_type, order_id } = req.body

    const {rows} = await items.update({name: name, cost: cost, product_type: product_type, order_id:order_id}, {where: {id: id}})
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        })
            res.status(200).send(rows)
})

app.delete('/items/:id', async(req, res) => {
    const {id} = req.params
    const { rows } = await items.destroy({ where: { id: id } }).catch((error) => {
        res.status(400).send(`Error ${error}`);
    })

        res.status(200).send(rows)
})

app.listen(PORT)

