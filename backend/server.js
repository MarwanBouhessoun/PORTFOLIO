/*
** PORTOFOLIO, 2026
** server
** File description:
** server for portofolio
*/

const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = 3000;

const frontend = path.join(__dirname, '../frontend');

app.use(express.static(frontend));

app.get('/', (req, res) =>
{
    res.sendFile(path.join(frontend, '/index.html'));
});

const mesProjets = [
    { id: 1, titre: "Cyber Sécurité", description: "Pentesting - Analyse de vulnérabilités et tests d'intrusion", image: "https://picsum.photos/id/180/400/250"},
    { id: 2, titre: "Projet I.R.I.S", description: "PoC - Logiciel embarqué pour la recherche d'identité RA", image: "https://picsum.photos/id/201/400/250"},
    { id: 3, titre: "Data Analyse Train", description: "Analyse de trajets de train avec Jupyter Notebook - 3 semaines", image: "https://picsum.photos/id/219/400/250"},
    { id: 4, titre: "Refonte de Shell", description: "Développement d'un shell personnalisé en C", image: "https://picsum.photos/id/241/400/250"},
    { id: 5, titre: "Programmation Mathématique", description: "Matrices, vecteurs et calculs mathématiques avancés", image: "https://picsum.photos/id/284/400/250"},
    { id: 6, titre: "Gestion de collision et de radar", description: "CSFML - 3 semaines", image: "https://picsum.photos/id/326/400/250"}
]

app.get('/api/projets', (req, res) =>
{
    res.json(mesProjets)
})

app.listen(PORT, () => {
    console.log(`Le serveur est allumé et tourne sur http://localhost:${PORT}`);
})
