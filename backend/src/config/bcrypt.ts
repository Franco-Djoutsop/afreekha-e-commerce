import * as bcrypt from 'bcryptjs';

const crypt = {
   async encode(data: any){
      
       return await bcrypt.hash(data.toString(), 10)
    },

   async decode(password: string, data_crypt: string){
        return await bcrypt.compare(password, data_crypt)
    }
};

export { crypt };