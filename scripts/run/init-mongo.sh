
use admin
db.createUser(
    {
        user: "admin",
        pwd: "1SatnamW",
        roles: ["root"]
    }
)

use gateway
db.createUser(
    {
        user: "sinny777",
        pwd: "1SatnamW",
        roles: [
            {
                role: "readWrite"
            }
        ]
    }
)