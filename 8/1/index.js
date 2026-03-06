// example of session/token based auth... using car park
import express from 'express';
// import { error } from 'node:console';

const app = express();
const PORT = 8000;

app.use(express.json());

const diary = {}
const plateList = new Set();

// park car get token
app.post('/signup', (req, res) => {
    const { name, liPlateNum, password } = req.body;
    // if (liPlateNum() in diary) {
        if (plateList.has(liPlateNum)) {
            return res.status(400).json({
                error: "Car already in system"
            })
        }
        // Create token/ticket for customer/user
        const token = `${Date.now()}`;
        // Add customer/user to diary
        diary[token] = {name, liPlateNum, password}
        plateList.add(liPlateNum)
        
        console.log("diary: ", diary)
        console.log("plateList: ", plateList)
    return res.json({
        status: "success",
        token
    })
});

// take car back (show token)
app.post('/me', (req, res) => {
    console.log("diary: ", diary)
    console.log("plateList: ", plateList)
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            error: "Missing token"
        })
    }

    if (!(token in diary)) {
        return res.status(400).json({
            error: "Invalid token"
        })
    }

    const entry = diary[token]

    return res.json({
        data: entry
    })
})

app.post('/private', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            error: "Missing token"
        })
    }

    if (!(token in diary)) {
        return res.status(400).json({ 
            error: "Invalid token"
        })
    }

    const entry = diary[token]
    return res.json({
        data: entry,
        privateData: "Access granted"
    })

})
    

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`))

/*
signup
{
  "name": "Alex",
  "liPlateNum": "1234",
  "password": "vitd"
}

me
{
  "token": "1772706543168"
}
*/