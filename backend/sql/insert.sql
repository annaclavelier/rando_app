INSERT INTO UTILISATEUR VALUES ('default','','123456','dupont','jean' );

INSERT INTO RANDONNEE(titre, description, difficulte, denivele, altitude_depart, altitude_arrivee, duree, km, massif, image, auteur) VALUES ('L''écoutoux', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut nulla ullamcorper, volutpat tortor ac, fringilla lacus. Praesent scelerisque nisi sit amet metus blandit lobortis. Praesent pharetra est id nulla bibendum malesuada. Fusce malesuada porta est, id posuere justo ullamcorper eu. Curabitur ut sollicitudin lacus, vitae fringilla tellus. Aliquam neque odio, placerat vitae auctor vitae, feugiat suscipit dolor. Fusce ligula ligula, vestibulum facilisis urna a, vulputate condimentum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque bibendum tincidunt odio id pharetra. Maecenas nibh turpis, bibendum nec magna in, posuere congue lectus. Sed congue posuere sem sed maximus. Vivamus a libero in orci tristique vulputate. ','Facile',373, 1406, 900, 3, 7.5, 'Chartreuse','/ecoutoux.jpg', 'default');

INSERT INTO RANDONNEE(titre, description,difficulte, duree, km, massif, image, auteur) VALUES ('Mont Rachais','Donec consequat, urna non aliquet condimentum, nunc dolor laoreet dolor, in sodales purus ligula at justo. Sed quis velit metus. Vestibulum scelerisque rutrum eros, eget varius est sollicitudin sed. Praesent sit amet tellus eget sem laoreet efficitur. Nam malesuada non ipsum blandit semper. Integer felis nulla, molestie vel dolor ac, consectetur dictum dui. Mauris dapibus lacus vitae nulla porta, at imperdiet enim suscipit. Etiam a metus non lorem dapibus cursus a a nulla.','Moyen', 4, 9.5, 'Chartreuse','/rachais.webp', 'default');

INSERT INTO RANDONNEE(titre, description,difficulte, duree, km, massif, image, auteur, denivele) VALUES ('Le Moucherotte depuis St Nizier', '','Moyen', 4.5,  8.5, 'Vercors', 'moucherotte.jpg', 'default', 714 );

INSERT INTO RANDONNEE(titre, description,difficulte, duree, km, massif, image, auteur, denivele) VALUES('Rioupéroux à la Croix de Chamrousse', '', 'Difficile',8.5, 15, 'Oisan', 'croix-chamrousse.jpg', 'default', 1730);
INSERT INTO IMAGE_SECONDAIRE VALUES('/ecoutoux-2.jpg',10);

INSERT INTO IMAGE_SECONDAIRE VALUES('/ecoutoux-3.jpg',10);

INSERT INTO IMAGE_SECONDAIRE VALUES('/vue-ecoutoux.jpg',10);