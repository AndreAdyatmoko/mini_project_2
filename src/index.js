import express from 'express';
import authRouter from './routers/authRouter.js';
// import postRouter from './routers/postRouter.js';
// import usersRouter from './routers/usersRouter.js';


const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
// app.use('/api/posts', postRouter);
// app.use('/api/users', usersRouter);

app.listen(8800,() => {
    console.log("Connect on port 8800");
})
