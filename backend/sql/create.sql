CREATE TABLE UTILISATEUR (
    pseudo varchar(255) PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    mot_passe varchar(255) NOT NULL,
    nom varchar(100) NOT NULL ,
    prenom varchar(100) NOT NULL
);

CREATE TABLE RANDONNEE(
    id SERIAL PRIMARY KEY,
    titre varchar(255),
    description text,
    difficulte varchar(40),
    denivele int,
    altitude_depart int,
    altitude_arrivee int,
    duree decimal,
    km decimal,
    massif varchar(40),
    image varchar(255),
    auteur varchar REFERENCES UTILISATEUR(pseudo)
);

CREATE TABLE IMAGE_SECONDAIRE(
    chemin varchar(255) PRIMARY KEY,
    rando_id integer  REFERENCES RANDONNEE(id)
);

