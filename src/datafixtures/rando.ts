export interface Rando{
    id: number;
    titre: string;
    difficulte: string;
    massif: string;
    image?: string;
}

export function findRando(id:number=1){
    const found= randos.find((rando) => rando.id === id);
    return found ?? randos[0];
}

const randos : Rando[]= [
    {
        id: 1,
        titre:"L'écoutoux",
        difficulte:"Facile",
        massif:"Chartreuse",
        image:""
    },
    {
        id: 2,
        titre:"L'écoutoux",
        difficulte:"Facile",
        massif:"Chartreuse",
        image:""
    },
]

export default randos;