import {db} from '../db/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
export const login = (req, res) => {
    // check user
    const q = 'select * from users where username = ? or email = ?';
    db.query(q,[req.body.username, req.body.email], (err, data) => {
        if(err) return res.json(err);
        if(data.lengt === 0) return res.status(404).json('Username atau Email tidak terdaftar');

        // Compare password
        const isPasswordValid = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordValid) return res.status(400).json('Password salah');

        // Generate token
        const token = jwt.sign({
            id: data[0].id
        }, "secret", );
        

        res.cookie("akses_token", token, {
            httpOnly: true
        }).status(200).json(data[0]);

    })

}
// export const logout = (req, res) => {

// }