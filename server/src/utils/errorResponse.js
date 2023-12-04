class ErrorResponse extends Error {
    
    // The constructor takes two parameters - a message and a status code
    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;
    }
}

export default ErrorResponse;