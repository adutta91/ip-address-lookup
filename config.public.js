module.exports = {
    host      : 'localhost',
    port      : '3000',
    site_name : "IP Address Lookup",
    site_url  : 'http://localhost',
    log : {
        "file"       : "./var/log/system.log",
        "level"      : "debug",
        "error_file" : "./var/log/error.log",
        "info_file"  : "./var/log/info.log",
        "debug_file" : "./var/log/debug.log",
    },
    url : {
        lookup : "/lookup",
    }

}
