import  express  from 'express';
import   addmessage  from '../controllers/addMessage';
import deleteMessage from '../controllers/deleteMessage';
import getMessage from '../controllers/showMessage';
const router = express.Router();

router.post('/addMessage', (req , res) => {
   addmessage(req,res);
});

router.delete('/deleteMessage/:id', (req:express.Request ,res:express.Response) =>{
     deleteMessage(req,res);
    });

router.get('/userMessage/:id', (req:express.Request,res:express.Response) =>{
      getMessage(req,res);
    })
export default router;