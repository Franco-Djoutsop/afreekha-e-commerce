import User from "../models/User"

const GestionExpressUser = {
    async create(data: {nom: string, prenom: string, tel: string, express_adresse: string} | null){
        if(!data){
            throw new Error('Erreur De creation de compte expresse.');
        }

        const verificationRslt = await User.findOne({
            where: {
                tel: data.tel
            }
        });
        if(verificationRslt){
           //return the user data
           console.log('le user existe deja avec ce numero de livraison')
           return verificationRslt.dataValues;
        }

        const insertData = await User.create(data);
        
        return insertData.dataValues;
    }
}

export {GestionExpressUser}