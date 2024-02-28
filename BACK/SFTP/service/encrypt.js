const bcrypt = require('bcrypt');
const { Info } = require('./debug');

module.exports = {
    password_hash : (password)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(process.env.secret, salt);
        const encryptedData = bcrypt.hashSync(password, hash);
        return encryptedData
    },
    password_check:async (password,hash_password)=>{
        return bcrypt.compareSync(password, hash_password)
    }
}