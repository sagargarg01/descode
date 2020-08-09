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
    db: 'hacki_project_dev',
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
    asset_path: "./public/assets",
    session_cookie_key: "ko5QVdSWTiNmJ8nuWULSnBsfgnRtOHJo",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "verify.descode@gmail.com",
            pass: "descode@123"
        }
    },
    google_client_id: "816614979534-54tnh3sdbhv765ne95h78br9n8e25lqc.apps.googleusercontent.com",
    google_client_secret: "PYI2c9TofIgdi9uORyBvphgn",
    google_call_back_url:"http://descode.co/users/auth/google/callback",

    github_client_id:"1fe1853aeb0b1b9b4767",
    github_client_secret:"c4b2726c212d3e2ca2513357c8ae842e61dd141b",
    github_call_back_url:"http://descode.co/users/auth/github/callback",
    
    jwt_secret: "iwCodBa54XpRI9nod0jWmqqdvMLTpXUe",
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports =production;