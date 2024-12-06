class apiError extends Error{
    constructor(statusCode,message="some error occured",error=[],stack="",){
        super(message)
        this.statusCode=statusCode
        this.message=message
        this.success=false
        this.error=error

    

    if(stack) {
        this.stack=stack  
    }
    else{
        Error.captureStackTrace(this,this.constructor)
    }

    
}
}

export {apiError}