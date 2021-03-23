exports.success = (req, res, data, status) => {
    res.status(status || 200).send({
        error: '',
        body: data
    });
};

exports.error = (req, res, error, status) => {
    res.status(status || 500).send({
        error: error,
        body: ''
    });
};