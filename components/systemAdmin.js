
const User = require('../models/userModel');
const {admin_user_details, debug_user_details} = require('../constants');
const {hashPassword} = require('../components/authenticationMiddleware');


const createSystemAdmin = async () => {
    const checkAdminUser = await User.findOne({username : admin_user_details.username});
    const checkDebugUser = await User.findOne({username : debug_user_details.username});

    if(!checkAdminUser){
        try{
            admin_user_details.password = hashPassword(admin_user_details.password);
            const adminUser = await new User(admin_user_details).save();
            console.log(`System admin ${admin_user_details.username} created successfully !!!`);
        }
        catch(error){
            console.log(`Error occured while creating system admin ${admin_user_details.username} Errors: ${error}`);
        } 
    }
    
    if(!checkDebugUser){
        try{
            debug_user_details.password = hashPassword(debug_user_details.password);
            const debugUser = await new User(debug_user_details).save();
            console.log(`System admin ${debug_user_details.username} created successfully !!!`);
        }
        catch(error){
            console.log(`Error occured while creating system admin ${debug_user_details.username} Errors: ${error}`);
        }
    }
};

module.exports = createSystemAdmin;
