const axios = require('axios');

module.exports = {
    async inputToPythom(req, res) {
        //const url = 'http://localhost' || `0.0.0.0`
        const { message } = req.body || {};
        console.log(req.body)
        
        const result = await axios.post(`0.0.0.0:5000/output`, { message });
        console.log(result.data);
        return res.status(200).json(result.data)
    }
}