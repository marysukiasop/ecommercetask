const express = require("express")
const { customers, items, orders } = require('./models')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/customers', async (req, res) => {
    const rows = await customers.findAll().catch((error) => {
        res.status(400).send(`Error ${error}`);
    });;

    res.status(200).send(rows)
})

app.post('/customers', async (req, res) => {
    const { firstname, lastname, email, password, address } = req.body

    const rows = await customers.create({ firstname, lastname, email, password, address })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });

    res.status(200).send(rows)
})

app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params
    await customers.destroy({ where: { id: id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
    res.status(204).send("done")
})


app.put('/customers/:id', async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, password, address } = req.body
    const { rows } = await customers.update({ firstname, lastname, email, password, address }, { where: { id: id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
    res.status(200).send(rows)
})

app.get('/orders', async (req, res) => {
    const rows = await orders.findAll().catch((error) => {
        res.status(400).send(`Error ${error}`);
    })

    res.status(200).send(rows)
})

app.post('/orders/customer_id', async (req, res) => {
    const { customer_id } = req.params
    const { address, delivered_at } = req.body

    const rows = await orders.create({ address, customer_id, delivered_at })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });

    res.status(200).send(rows)
})

app.put('/orders/:id', async (req, res) => {
    const { address, customer_id, delivered_at } = req.body

    const rows = await orders.update({ address, customer_id, delivered_at }, { where: { id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        });
    res.status(200).send(rows)
})

app.delete('/orders/:id', async (req, res) => {
    const { id } = req.params

    const { rows } = await orders.destroy({ where: { id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        })
    res.status(200).send({ rows })

})

app.get('/items', async (req, res) => {
    const rows = await items.findAll().catch((error) => {
        res.status(400).send(`Error ${error}`);
    })
    res.status(200).send(rows)
})

app.post('/items', async (req, res) => {
    const { name, cost, product_type, order_id } = req.body

    const { rows } = await items.create({ name, cost, product_type, order_id }).catch((error) => {
        res.status(400).send(`Error ${error}`);
    })

    res.status(200).send(rows)

})

app.put('/items/:id', async (req, res) => {
    const { id } = req.params
    const { name, cost, product_type, order_id } = req.body

    const { rows } = await items.update({ name, cost, product_type, order_id }, { where: { id } })
        .catch((error) => {
            res.status(400).send(`Error ${error}`);
        })

    res.status(200).send(rows)
})

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params

    await items.destroy({ where: { id } }).catch((error) => {
        res.status(400).send(`Error ${error}`);
    })

    res.status(204).send("Done")
})

app.listen(PORT)

