const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 3001;
const fs = require("fs");


app.use(express.json({ extended: false }));

app.get("/users", (req, res) => {
    return res.json(users);
});



app.route("/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user);
    })

    .patch((req, res) => {
        const id = Number(req.params.id);
        const { first_name, last_name, email, gender } = req.body
        const foundUser = users.filter((user) => user.id === id);
        
        if (foundUser.length === 0) {
            return res.status(404).json({ message: "user not found" });
        } else {
            const updatedUser = {
                id: id,
                first_name,
                last_name,
                email,
                gender
            }
            const updatedUserList = users.map((user) => {
                if (user.id === id) {
                    return updatedUser
                }
                return user;
            })
            fs.writeFileSync("MOCK_DATA.json", JSON.stringify(updatedUserList), (data) => {
                res.send({ success: true });

            });
            res.send({ success: true });
        }

    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const user = users.findIndex((user) => user.id === id);

        const updated = users.splice(user, 1);
        fs.writeFileSync('MOCK_DATA.json', JSON.stringify(users), (data) => { });
        return res.json({ status: "done" });
    });

app.post("/users", (req, res) => {
    const body = req.body;
    console.log("body", body);
    users.push({ id: users.length + 1, body });
    fs.writeFileSync('MOCK_DATA.json', JSON.stringify(users), (data) => {

    });


    return res.json({ status: "done" });
});




app.listen(port, () => console.log("express is working")



);