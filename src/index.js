const app = require('./server')

const PORT = 4001 || process.env.PORT

app.listen(PORT, () => console.log(`Api marketplace :: PORT :: ${PORT}`))