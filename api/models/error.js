export function Error(code= "", message= "") {
    return {
        code: code,
        message: message
    }
}

export function ErrorResponse(code= "", message= ""){
    var error = Error(code, message);
    
    return {
        error
    }
}
