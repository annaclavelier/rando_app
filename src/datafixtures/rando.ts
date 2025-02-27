export interface Rando {
  id: number;
  titre: string;
  difficulte: string;
  massif: string;
  image?: string;
  description?: string;
  duree: string;
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
    image: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut nulla ullamcorper, volutpat tortor ac, fringilla lacus. Praesent scelerisque nisi sit amet metus blandit lobortis. Praesent pharetra est id nulla bibendum malesuada. Fusce malesuada porta est, id posuere justo ullamcorper eu. Curabitur ut sollicitudin lacus, vitae fringilla tellus. Aliquam neque odio, placerat vitae auctor vitae, feugiat suscipit dolor. Fusce ligula ligula, vestibulum facilisis urna a, vulputate condimentum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque bibendum tincidunt odio id pharetra. Maecenas nibh turpis, bibendum nec magna in, posuere congue lectus. Sed congue posuere sem sed maximus. Vivamus a libero in orci tristique vulputate. ",
    duree: "3h",
  },
  {
    id: 2,
    titre: "L'écoutoux",
    difficulte: "Facile",
    massif: "Chartreuse",
    image: "",
    description:
      "Donec consequat, urna non aliquet condimentum, nunc dolor laoreet dolor, in sodales purus ligula at justo. Sed quis velit metus. Vestibulum scelerisque rutrum eros, eget varius est sollicitudin sed. Praesent sit amet tellus eget sem laoreet efficitur. Nam malesuada non ipsum blandit semper. Integer felis nulla, molestie vel dolor ac, consectetur dictum dui. Mauris dapibus lacus vitae nulla porta, at imperdiet enim suscipit. Etiam a metus non lorem dapibus cursus a a nulla. ",
    duree: "3h",
  },
];

export default randos;
