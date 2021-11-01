const errorConfig = {
    empty_response : {
        'message' : 'Internal error - please contact administrator',
        'status'  : 'error'
    },
    empty_order : {
        'messsage' : 'Order doesn"t exists',
        'status' : 'error'
    }
};

module.exports = {
    errorConfig
}