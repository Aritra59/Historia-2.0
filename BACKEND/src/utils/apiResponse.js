
class apiResponse{
    constructor(statusCode,data,message="api running successsfully"){
            this.statusCode=statusCode
            this.data= data
            this.message=message
            this.success=true
    }
}

export {apiResponse}