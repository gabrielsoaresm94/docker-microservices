const axios = require('axios');

class PythonController {
    async inputToPythom(req, res) {
        //const url = 'http://localhost' || `0.0.0.0`
        const { message, name } = req.body || {};
        console.log(req.body)
        const result = await axios.post(`http://localhost:5000/output`, { message, name });

        //await axios.get(`http://localhost:5000/files/${name}`);

        console.log(result.data);
        if(!result.data) {
            return res.status(500).json({ message: "Bad request" });
        }
        return res.status(200).json(result.data)
    }
}

module.exports = new PythonController;