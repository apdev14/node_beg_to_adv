const dotenv = require("dotenv/config")
const db = require("./db")
const { usersTable } = require("./drizzle/schema")

async function getAllUsers() {
    const users = await db.select().from(usersTable)
    console.log(`Users in db: `, users)
    return users;
}

async function createUser({ id, name, email}) {
    await db.insert(usersTable).values({
        id,
        name,
        email
    });
}

// createUser({
//     id: 1,
//     name: "Stephen King",
//     email: "SK@books.com"
// })
// createUser({
//     id: 2,
//     name: "Harry Potter",
//     email: "HP@hogwarts.com"
// })

getAllUsers();