import {db} from '../db/db.js'
import bcrypt from 'bcrypt'
export const register = (req, res) => {
    //check existing user
    const q = 'select * from users where email = ? or username = ?';

    db.query(q, [req.body.email, req.body.username], (err,data)=> {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json('Emaile atau Username sudah terdaftar');

        // Hash password and create user documentation in https://www.npmjs.com/package/bcryptjs
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (username, email, password, phoneNumber) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.phoneNumber
        ]

        db.query(q,[values], (err, data)=> {
            if(err) return res.json(err);
            return res.status(200).json ("Selamat Registrasi akun anda berhasil")
        })


    }
        
        )}
// export const login = (req, res) => {

// }
// export const logout = (req, res) => {

// }