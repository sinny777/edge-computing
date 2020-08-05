
db.createUser(
    {
        user: "sinny777",
        pwd: "1SatnamW",
        roles: [
            {
                role: "readWrite",
                db: "gateway"
            }
        ]
    }
)