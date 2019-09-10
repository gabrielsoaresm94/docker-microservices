const axios = require('axios');

class PythonController {
    async inputToPythom(req, res) {
        const { message, name } = req.body || {};
        console.log(req.body)
        //http://localhost:5000/output
        const result = await axios.post(`http://172.17.0.2:5000/output`, { message, name });

        await axios.get(`http://172.17.0.2:5000/files/${name}`);

        console.log(result.data);
        if(!result.data) {
            return res.status(500).json({ message: "Bad request" });
        }
        return res.status(200).json(result.data)
    }
}

module.exports = new PythonController;