
const UUID = require('uuid').v4;

let admin_user_details = {
    _id : UUID(),
    username : 'Super-Admin',
    password : 'Ecommerce@!123',
    email : 'eadmin@gmail.com',
    phone_number : '+91 9098909876',
    is_superuser : true
}

let debug_user_details = {
    _id : UUID(),
    username : 'Debug-Admin',
    password : 'Ecommerce@!123',
    email : 'edebugadmin@gmail.com',
    phone_number : '+91 8098909876',
    is_superuser : true
}

let JWT_SECRECT_KEY = "A@!b$#cd&10"

module.exports = {admin_user_details, debug_user_details, JWT_SECRECT_KEY}