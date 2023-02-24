exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message });
    } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {

    if (err.code === '22P02' ) {
        res.status(400).send({ message: `Bad Request` })
    }

     if (err.code === '23503') 
    {res.status(404).send({ message: `Not Found` })
    
}

if (err.code === '23502') 
{res.status(400).send({ message: `Bad Request` })

}

if (err.code === '42601') 
{res.status(400).send({ message: `Bad syntax` })

}
     else next(err);

}

exports.handleServerErrors = (err, req, res, next) => {

    res.status(500).send({ message: `Internal Server Error` });
}