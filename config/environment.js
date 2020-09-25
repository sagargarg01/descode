const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        //change it 
        auth: {
            user: process.env.DESCODE_GMAIL_USERNAME,
            pass: process.env.DESCODE_GMAIL_PASSWORD
        }
    }, 
    google_client_id: process.env.DESCODE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.DESCODE_GOOGLE_CLIENT_SECRET,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
   
    github_client_id:process.env.DESCODE_GITHUB_CLIENT_ID,
    github_client_secret:process.env.DESCODE_GITHUB_CLIENT_SECRET,
    github_call_back_url: "http://localhost:8000/users/auth/github/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.DESCODE_ASSET_PATH,
    session_cookie_key: process.env.DESCODE_SESSION_COOKIE_KEY,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.DESCODE_GMAIL_USERNAME,
            pass: process.env.DESCODE_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.DESCODE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.DESCODE_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.DESCODE_GOOGLE_CALLBACK_URL,

    github_client_id: process.env.DESCODE_GITHUB_CLIENT_ID,
    github_client_secret: process.env.DESCODE_GITHUB_CLIENT_SECRET,
    github_call_back_url: process.env.DESCODE_GITHUB_CALLBACK_URL,
    
    jwt_secret: process.env.DESCODE_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

console.log(eval(process.env.DESCODE_ENVIRONMENT) ? process.env.DESCODE_ENVIRONMENT : development);
module.exports = eval(process.env.DESCODE_ENVIRONMENT) ? process.env.DESCODE_ENVIRONMENT : development;