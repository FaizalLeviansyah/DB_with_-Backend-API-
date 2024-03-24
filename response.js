export const response = (statusCode, data, message, res) => {
    let messageStatus = message;

    //Check if data null or empty
    if (!data) {
        messageStatus = "Find fail" //set custom message if data is not found
    }
    
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
             datas: data,
             message: message
        },
        pagination: {
            prev: "",
            next: "",
            max: ""
        }
    })
}