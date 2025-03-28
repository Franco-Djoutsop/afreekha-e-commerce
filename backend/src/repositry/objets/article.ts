type Articles = {
     idArticle: number
     nom_article: string,
     prix: number,
     promo: boolean,
     quantite: number,
     caracteristiques: string,
     pourcentage_promo: number,
     marque: string,
     garantie: string,
     idCategorie: number,
     idImage?: number,
     imgsID?: number[],
     Images: any[],
}

export {Articles}