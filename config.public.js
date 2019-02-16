module.exports = {
    host        : 'localhost',
    port        : '3000',
    site_name   : "IP Address Lookup",
    site_url    : 'http: //localhost',
    datafile    : './data/data.db', // data.db | bigfile.txt | ip-address.csv
    log : {
        "file"       : "./var/log/system.log",
        "level"      : "debug",
        "error_file" : "./var/log/error.log",
        "info_file"  : "./var/log/info.log",
        "debug_file" : "./var/log/debug.log",
    },
    url : {
        lookup : "/lookup",
    },
    error:{
        error401 : "Access denied. You are not authorized to access. Please sign in your account and try again.",
        error403 : "Access forbidden. You do not have permission to access.",
        error500 : "An unexpected internal error has occurred. Please try again later.",
    },
    httpCode: {
        done    : 204, /* No Content - The server successfully processed the request and is not returning any content. */
        ok      : 200,
        fail    : 400,
        unauth  : 401,
        error   : 500,
    }

}
