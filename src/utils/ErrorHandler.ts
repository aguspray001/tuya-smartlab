class ErrorHandler extends Error{
    constructor(message: string){
        super(message)
        this.name = "Custom Error"
    }
}

export default ErrorHandler;