"use strict";

module.exports.hello = async(event) =>{
    return{
        statuscode:200,
        body: JSON.stringify(
            {
                message:"Function excuted Successfuly!",
                input:event,
            },
            null,
            2
        ),
    };
};