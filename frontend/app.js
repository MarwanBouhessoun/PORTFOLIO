/*
** PORTOFOLIO, 2026
** app
** File description:
** app
*/

const conteneurProjets = document.getElementById('liste-projets');
let projetsData = [];

fetch('/api/projets')
    .then(reponse => reponse.json())
    .then(mesProjets => {
        projetsData = mesProjets;
        conteneurProjets.innerHTML = '';
        mesProjets.forEach(projet => {
            const carte = document.createElement('div');
            carte.className = 'carte-projet';
            carte.innerHTML = `
                <img src="${projet.image}" alt="Image du ${projet.titre}">
                <div class="contenu-carte">
                    <h3>${projet.titre}</h3>
                    <p>${projet.description}</p>
                </div>`;
            carte.addEventListener('click', () => openModal(projet));
            conteneurProjets.appendChild(carte);
        });

        const plusEncore = document.createElement('div');
        plusEncore.className = 'carte-projet carte-plus';
        plusEncore.innerHTML = `
            <div class="contenu-carte contenu-plus">
                <h3>Et plus encore...</h3>
                <p>D'autres projets à découvrir</p>
            </div>`;
        conteneurProjets.appendChild(plusEncore);
    });

function openModal(projet) {
    document.getElementById('modal-image').src = projet.image;
    document.getElementById('modal-titre').textContent = projet.titre;
    document.getElementById('modal-meta').textContent = `Durée: ${projet.duree || 'Non spécifiée'}`;
    document.getElementById('modal-detail').textContent = projet.detail || projet.description;

    const technosContainer = document.getElementById('modal-technos');
    technosContainer.innerHTML = '';
    if (projet.technologies) {
        projet.technologies.forEach(techno => {
            const tag = document.createElement('span');
            tag.className = 'techno-tag';
            tag.textContent = techno;
            technosContainer.appendChild(tag);
        });
    }

    document.getElementById('modal-projet').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-projet').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('modal-projet').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-projet')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

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
