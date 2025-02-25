interface Rando{
    id: number;
    titre: string;
    difficulte: string;
    massif: string;
    image?: string;
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