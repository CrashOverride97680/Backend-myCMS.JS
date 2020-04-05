module.exports = 
{
    host: "smtp.example.email",         // @host: string for smtp host
    port: 587,                          // @port: number port for connection 
    secure: false,                      // @secure: true if you use port 465, false for another port 
    auth:                               // @auth: object with mail and password user ( user: mail, pass: password mail )
    {
        user: "mail@example.com",
        pass: "testPass",
    }
};