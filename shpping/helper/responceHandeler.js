import pkg from "express";


const Response = pkg

class ResponseHandler {
    // error handling when error occured
  errorHandler(error) {
    return Response.status(error.status || 500).json({
      success: false,
      message: error.message||'internal error'
    });
   };
  
  // success response and return data
   successHandler(data) {
      return Response.status(200).json(data); 
  };
}
export {ResponseHandler}