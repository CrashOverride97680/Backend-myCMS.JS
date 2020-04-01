// IMPORT MODULES NODEJS
    const jwt = require('jsonwebtoken');
// IMPORTING LANG AND DEBUG
    const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
// IMPORT ENV DATA OR DEBUG
    const secret = process.env.SECRET_KEY || 'secret_key';
    const testUser = ( process.env.NODE_ENV_DEV ) ? {
        id: 1,
        email: 'email@test.xd',
        password: 'test',
        username: 'TestUser',
        surname: 'TestUser'
    } : null;

module.exports = {
    test: (req, resp) => resp.json({resp: lang.LABEL_JSON_STATUS_NUMBER, server: lang.LABEL_JSON_STATUS}),
    notFound: (req, resp) => resp.status(404).json({resp: lang.LABEL_JSON_STATUS_NUMBER_NOT_FOUND, server: lang.LABEL_JSON_NOT_FOUND}),
    login: (req, resp) => 
    {
        try
        {
            const user = 
            {
                email: req.body.email,
                password: req.body.password
            };
            
            if ( user.email == testUser.email && user.password == testUser.password )
            {
                if ( process.env.NODE_ENV_DEV )
                {
                    const { id, username } = testUser;
                    jwt.sign({_id: id, username}, secret, { expiresIn: '20s' }, ( err, token ) => 
                    {
                        if ( err )
                        {
                            console.log(lang.LABEL_ERROR_RETURN, err);
                            resp.status(500).json(lang.LABEL_500_HTTP);
                        }
                        else 
                            resp.json({
                                auth: true,
                                token
                            });
                    });
                }
            }
        }
        catch(err)
        {
            console.log(lang.LABEL_ERROR_RETURN, err);
            resp.status(500).json(lang.LABEL_500_HTTP);
        }
    },
    createPost: (req, resp) => 
    {
        try
        {
            const auth = req.headers['authorization'];
            console.log(typeof auth);
            if ( (typeof auth) !== 'undefined' )
            {
                jwt.verify(auth, secret, (err, decode) => {
                    if ( err )
                        resp.sendStatus(403).json(lang.LABEL_403_HTTP);
                    else
                        resp.sendStatus(201).json(lang.LABEL_201_HTTP);
                });
            }
            else
                resp.sendStatus(403).json(lang.LABEL_403_HTTP);
        }
        catch(err)
        {
            console.log(lang.LABEL_ERROR_RETURN, err);
            resp.status(500).json(lang.LABEL_500_HTTP);
        }
    },
    refresh: ( req, resp ) => 
    {
        const auth = req.headers['authorization'];
        console.log(typeof auth);
        if ( (typeof auth) !== 'undefined' )
        {
            jwt.verify(auth, secret, (err, decode) => {
                console.log("ERROR:", err);
                console.log("DECODE:", decode);
            });
        }
    }
};