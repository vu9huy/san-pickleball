module.exports = {
    apps: [
        {
            name: 'pickleball-client',
            script: 'yarn',
            args: 'start',  // equivalent to `yarn start`
            log_date_format: 'YYYY-MM-DD HH:mm:ss',  // Include timestamp format
            time: true,  // Enable timestamps in the log files
            out_file: './logs/out.log',
            error_file: './logs/error.log',
        }
    ]
};
