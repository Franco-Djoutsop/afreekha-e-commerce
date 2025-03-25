import CommandArticle from "../models/CommandArticle";

const GestionCommandeArticle = {
    async create(commandArticle: CommandArticle[]){
        const queryRslt = await CommandArticle.bulkCreate(commandArticle as any[]);

        return queryRslt;
    },

    async getCommandArticle(idCommande: number){
        const commandArticles = await CommandArticle.findAll({
            where: {idCommande: idCommande}
        });

        return commandArticles;
    }
}

export {GestionCommandeArticle};