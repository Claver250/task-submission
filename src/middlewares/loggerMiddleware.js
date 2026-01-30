const logger = (req, res, next) => {
    const start = Date.now();
    const timestamp = new Date().toLocaleString();
    const {method, originalUrl} = req;     

    console.log(`[${timestamp}] ${method} request to ${originalUrl}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        
        console.log(`[${timestamp}] ${method} ${originalUrl} ${status} - ${duration}ms`);
    });
    
    next(); // Don't forget this, or the request will hang!
};

module.exports = logger;