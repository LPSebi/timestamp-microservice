import express from 'express'

// init express
const app = express()

// create the date route
app.get('/api/:date?', (req, res) => {
    const date = req.params.date
    console.log(typeof date)
    if (!date) {
        return res.json({
            unix: new Date().getTime(),
            utc: new Date().toUTCString(),
        })
    }
    let parsedDate
    // Check if date is a unix timestamp
    parsedDate =
        !isNaN(date) && Number(date) == date
            ? new Date(Number(date))
            : new Date(date)
    console.log(parsedDate)
    if (isNaN(parsedDate.getTime())) {
        return res.json({ error: 'Invalid date' })
    }
    return res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString(),
    })
})

// listen to port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Running! Port: ${PORT}`)
})
