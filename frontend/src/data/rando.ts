export interface Rando {
  id: number;
  titre: string;
  difficulte: "Facile" | "Moyen" | "Difficile";
  massif: "Chartreuse" | "Vercors" | "Oisan";
  image?: string;
  km: number;
  description?: string;
  duree: string;
  denivele?: number;
  altitude_depart?: number;
  point_vue?: boolean;
  remarques?: string;
  altitude_arrivee?: number;
  galerie?: string[];
  auteur?: string;
  publique: boolean;
}

export class RandoModel implements Rando {
  id!: number;
  titre!: string;
  difficulte!: "Facile" | "Moyen" | "Difficile";
  massif!: "Chartreuse" | "Vercors" | "Oisan";
  image?: string;
  description?: string;
  duree!: string;
  denivele?: number;
  altitude_depart?: number;
  altitude_arrivee?: number;
  point_vue?: boolean;
  remarques?: string;
  km!: number;
  auteur?: string;
  publique!: boolean;

  constructor(data: Rando) {
    Object.assign(this, data);
  }

  // Méthode pour vérifier si la rando correspond aux filtres
  correspondsToFilters(filters: {
    difficulty?: string;
    duration?: string;
    massif?: string;
    denivele?: string;
  }): boolean {
    return (
      (!filters.difficulty || this.difficulte === filters.difficulty) &&
      (!filters.duration || this.duree === filters.duration) &&
      (!filters.massif || this.massif === filters.massif) &&
      (!filters.denivele || this.getDeniveleCategory() === filters.denivele)
    );
  }

  // Catégoriser le dénivelé
  getDeniveleCategory(): string {
    if (this.denivele === undefined) return "";
    if (this.denivele < 300) return "moins de 300m";
    if (this.denivele < 500) return "300 à 500m";
    if (this.denivele < 800) return "500 à 800m";
    if (this.denivele < 1000) return "800 à 1000m";
    return "plus de 1000m";
  }

  // Afficher un résumé
  getSummary(): string {
    return `${this.titre} - ${this.difficulte}, ${this.duree}, ${this.massif}`;
  }
}

export function findRando(id: number = 1) {
  const found = randos.find((rando) => rando.id === id);
  return found ?? randos[0];
}

const randos: Rando[] = [
  {
    id: 1,
    titre: "L'écoutoux",
    difficulte: "Facile",
    massif: "Chartreuse",
    image: "/assets/ecoutoux.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut nulla ullamcorper, volutpat tortor ac, fringilla lacus. Praesent scelerisque nisi sit amet metus blandit lobortis. Praesent pharetra est id nulla bibendum malesuada. Fusce malesuada porta est, id posuere justo ullamcorper eu. Curabitur ut sollicitudin lacus, vitae fringilla tellus. Aliquam neque odio, placerat vitae auctor vitae, feugiat suscipit dolor. Fusce ligula ligula, vestibulum facilisis urna a, vulputate condimentum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque bibendum tincidunt odio id pharetra. Maecenas nibh turpis, bibendum nec magna in, posuere congue lectus. Sed congue posuere sem sed maximus. Vivamus a libero in orci tristique vulputate. ",
    duree: "3h",
    denivele: 373,
    altitude_arrivee: 1406,
    altitude_depart: 900,
    km: 7.5,
    galerie: [
      "/assets/ecoutoux-2.jpg",
      "/assets/ecoutoux-3.jpg",
      "/assets/vue-ecoutoux.jpg",
    ],
    publique: true,
  },
  {
    id: 2,
    titre: "Mont Rachais",
    difficulte: "Moyen",
    massif: "Chartreuse",
    image: "./assets/rachais.webp",
    description:
      "Donec consequat, urna non aliquet condimentum, nunc dolor laoreet dolor, in sodales purus ligula at justo. Sed quis velit metus. Vestibulum scelerisque rutrum eros, eget varius est sollicitudin sed. Praesent sit amet tellus eget sem laoreet efficitur. Nam malesuada non ipsum blandit semper. Integer felis nulla, molestie vel dolor ac, consectetur dictum dui. Mauris dapibus lacus vitae nulla porta, at imperdiet enim suscipit. Etiam a metus non lorem dapibus cursus a a nulla. ",
    duree: "4h",
    km: 9.5,
    galerie: [],
    publique: true,
  },
];

export default randos;
