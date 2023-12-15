
const UUID = require('uuid').v4;

let admin_user_details = {
    _id: UUID(),
    username: 'Super-Admin',
    password: 'Ecommerce@!123',
    email: 'eadmin@gmail.com',
    phone_code: '+91',
    phone_number: '9098909876',
    is_superuser: true
}

let debug_user_details = {
    _id: UUID(),
    username: 'Debug-Admin',
    password: 'Ecommerce@!123',
    email: 'edebugadmin@gmail.com',
    phone_code: '+91',
    phone_number: '+8098909876',
    is_superuser: true
}

let JWT_SECRECT_KEY = "A@!b$#cd&10"
let JWT_EXPIRY_TIME = '15m'

let ORDER_STATUS = {
    0: "Order Placed",
    1: "Packing for dispatch",
    2: "Order Shipped",
    3: "Order reached to final destination",
    4: "Out for delivery",
    5: "Order Deliverd",
    6: "Order Cancelled"
}


module.exports = {
    admin_user_details, debug_user_details,
    JWT_SECRECT_KEY, JWT_EXPIRY_TIME, ORDER_STATUS
}