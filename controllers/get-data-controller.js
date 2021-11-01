const HttpStatusCodes = require('http-status-codes');
const { Order } = require('../models/Order');
const { Item } = require('../models/Item');
const Generalhelper = require('../helpers/general-helper');
const ErrorConfig = require('../helpers/error-config');
var log = require('logger').createLogger(process.env.LOG_FILE_PATH); // logs to a file

const totalOrder = async function(req, res) {
    try {
        const orderId = req.params.order_id;
        const order_data = Generalhelper.isEmpty(orderId)  ? undefined : await Order.findOne({"id":orderId});
        if(!Generalhelper.isEmpty(order_data)) {
            const items = order_data.items;
            let total_price = 0;
            if(!Generalhelper.isEmpty(items)) {
                const items_data = await Item.find({"id": {"$in" : items}});
                total_price = items_data.reduce(((previousValue, currentItem) => previousValue + (currentItem.price ? parseFloat(currentItem.price) : 0)), total_price);
            }
            const total = total_price - (order_data.discount ? parseFloat(order_data.discount) : 0);
            return res.status(HttpStatusCodes.StatusCodes.OK).json({
                'total' : total,
                'order' : order_data
            })            
        } else {
            log.error('Order doesn"t exists with id:: '+ orderId);
            return res.status(HttpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorConfig.errorConfig.empty_order);
        }
    } catch(e) {
        log.error('Error response form API is:: '+ e.message);
        return res.status(HttpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorConfig.errorConfig.empty_response);
    }
}


module.exports = {
    totalOrder
}