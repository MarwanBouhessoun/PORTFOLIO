/*
** PORTFOLIO, 2026
** server
** File description:
** server for portfolio
*/

const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const frontend = path.join(__dirname, '../frontend');

app.use(express.static(frontend));

app.get('/', (req, res) =>
{
    res.sendFile(path.join(frontend, '/index.html'));
});

const mesProjets = [
    {
        id: 1,
        titre: "Cyber Sécurité",
        description: "Pentesting - Analyse de vulnérabilités et tests d'intrusion",
        detail: "Audit complet de sécurité sur des applications web et réseaux. Identification de failles OWASP Top 10, tests d'intrusion automatisés et manuels, rédaction de rapports de vulnérabilités avec recommandations de correction.",
        technologies: ["Burp Suite"],
        duree: "2 semaines",
        image: "./images/owasp.png"
    },
    {
        id: 2,
        titre: "Projet I.R.I.S",
        description: "PoC - Logiciel embarqué pour la recherche d'identité RA",
        detail: "Développement d'un système de reconnaissance d'identité en réalité augmentée. Intégration de bibliothèques de computer vision, traitement d'images en temps réel, et interface utilisateur immersive.",
        technologies: ["C++", "YOLOv13", "Scraping", "Realité Augmentée"],
        duree: "En Cours (6 mois)",
        image: "./images/POC.png"
    },
    {
        id: 3,
        titre: "Data Analyse Train",
        description: "Analyse de trajets de train avec Jupyter Notebook - 3 semaines",
        detail: "Analyse exploratoire de données de trajets ferroviaires. Nettoyage de datasets, visualisations interactives, identification de patterns de retards, et prédiction de temps d'arrivée via machine learning.",
        technologies: ["Python", "Pandas", "Matplotlib", "Jupyter"],
        duree: "3 semaines",
        image: "./images/jupyter.png"
    },
    {
        id: 4,
        titre: "Refonte de Shell",
        description: "Développement d'un shell personnalisé en C",
        detail: "Implémentation d'un interpréteur de commandes UNIX. Gestion des processus (fork/exec), pipes, redirections, variables d'environnement, signaux, et built-in commands. Architecture modulaire avec parsing d'expressions.",
        technologies: ["C", "Makefile", "Valgrind", "libC"],
        duree: "6 semaines",
        image: "./images/shell.png"
    },
    {
        id: 5,
        titre: "Programmation Mathématique",
        description: "Matrices, vecteurs et calculs mathématiques avancés",
        detail: "Implémentation d'une bibliothèque mathématique complète : algèbre linéaire (matrices, vecteurs), transformations géométriques, résolution de systèmes d'équations. Optimisation algorithmique pour de grands datasets.",
        technologies: ["C", "Python", "Mathématiques"],
        duree: "Plusieurs Projet",
        image: "./images/python.png"
    },
    {
        id: 6,
        titre: "Gestion de collision et de radar",
        description: "CSFML - détection de collisions 2D et système de radar pour jeu vidéo",
        detail: "Moteur de détection de collisions 2D et système de radar pour jeu vidéo. Algorithmes de détection AABB/cercle, rendu graphique CSFML, et visualisation des zones de détection en temps réel.",
        technologies: ["C", "CSFML", "Algorithmie", "Géométrie"],
        duree: "3 semaines",
        image: "./images/radar.png"
    }
]

app.get('/api/projets', (req, res) =>
{
    res.json(mesProjets)
})

app.listen(PORT, () => {
    console.log(`Le serveur est allumé et tourne sur http://localhost:${PORT}`);
})
