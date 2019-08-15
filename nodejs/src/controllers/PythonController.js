const axios = require('axios');

module.exports = {
    async inputToPythom(req, res) {
        const { message } = req.body || {};
        console.log(req.body)
        
        const result = await axios.post('http://localhost:5000/output', { message });
        console.log(result.data);
        return res.status(200).json(result.data)
    }
}