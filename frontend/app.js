/*
** PORTOFOLIO, 2026
** app
** File description:
** app
*/

const conteneurProjets = document.getElementById('liste-projets');

fetch('/api/projets')
    .then(reponse => reponse.json())
    .then(mesProjets => {
        conteneurProjets.innerHTML = '';
        mesProjets.forEach(projet => {
            const HTMLduProjet = `
            <div class="carte-projet">
                <img src="${projet.image}" alt="Image du ${projet.titre}">
                <div class="contenu-carte">
                    <h3>${projet.titre}</h3>
                    <p>${projet.description}</p>
                </div>
            </div>`;
            conteneurProjets.innerHTML += HTMLduProjet;
        });
    })

// Gestion du formulaire de contact - appel direct à Formspree
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        subject: `Message depuis le portfolio de ${formData.get('name')}`
    };
    
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Envoi en cours...';
    button.disabled = true;
    
    try {
        const response = await fetch('https://formspree.io/f/xnjwbkqo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            button.textContent = 'Message envoyé !';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 2000);
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        console.error(error);
        button.textContent = 'Erreur - Réessayez';
        button.style.backgroundColor = '#f44336';
        button.disabled = false;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    }
});
