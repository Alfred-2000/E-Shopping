
const User = require('../models/userModel');
const {admin_user_details, debug_user_details} = require('../constants');

const createSystemAdmin = async () => {
    const checkAdminUser = await User.findOne({username : admin_user_details.username});
    const checkDebugUser = await User.findOne({username : debug_user_details.username});

    if(!checkAdminUser){
        try{        
            const adminUser = await new User(admin_user_details).save();
            console.log(`System admin ${admin_user_details.username} created successfully !!!`);
        }
        catch(error){
            console.log(`Error occured while creating system admin ${admin_user_details.username} Errors: ${error}`);
        } 
    }
    else{
        console.log(`System admin ${admin_user_details.username} already exist !!!`);
    }
    
    if(!checkDebugUser){
        try{
            const debugUser = await new User(debug_user_details).save();
            console.log(`System admin ${debug_user_details.username} created successfully !!!`);
        }
        catch(error){
            console.log(`Error occured while creating system admin ${debug_user_details.username} Errors: ${error}`);
        }
    }
    else{
        console.log(`System admin ${debug_user_details.username} already exist !!!`);
    }
};

module.exports = createSystemAdmin;
