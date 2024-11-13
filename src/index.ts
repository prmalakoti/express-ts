import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());


app.use((req: Request, res: Response, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, App is running on Typescript!!');
});


app.get('/cause-error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('This is a test error');
    next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

/* It should be at bottom all routes */
app.use((req: Request, res: Response) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

