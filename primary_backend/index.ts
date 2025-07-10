import express from 'express';
const app = express();
const PORT = 3007;

app.post('/api/v1/auth/signup', async(req, res) => {

})


app.post('/api/v1/auth/login', async(req, res) => {
    
})


app.get('/api/v1/auth/getUser', async(req, res) => {
    
})


app.post('/api/v1/zaps/create', async(req, res) => {
    
})


app.get('/api/v1/zaps/getAll', async(req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})