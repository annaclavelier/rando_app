CREATE TABLE UTILISATEUR (
    email varchar(255) PRIMARY KEY,
    pseudo varchar(255) UNIQUE,
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
    denivele_negatif int,
    altitude_depart int,
    altitude_arrivee int,
    altitude_max int,
    altitude_min int,
    duree decimal,
    km decimal,
    massif varchar(40),
    image varchar(255),
    publique boolean DEFAULT false,
    auteur varchar REFERENCES UTILISATEUR(email) ON DELETE CASCADE,
    trace varchar(255)
);

CREATE TABLE IMAGE_SECONDAIRE(
    chemin varchar(255) PRIMARY KEY,
    rando_id integer  REFERENCES RANDONNEE(id) ON DELETE CASCADE
);

CREATE TABLE FAVORI(
    rando_id int REFERENCES RANDONNEE(id) ON DELETE CASCADE,
    utilisateur_email varchar(255) REFERENCES UTILISATEUR(email) ON DELETE CASCADE,
    PRIMARY KEY(rando_id, utilisateur_email)
);
