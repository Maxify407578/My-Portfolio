// Globale Variablen für die Schriftgröße
let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize) || 16;
const minFontSize = 12;
const maxFontSize = 24;

// Schriftgröße ändern
function changeFontSize(step) {
    currentFontSize = Math.max(minFontSize, Math.min(maxFontSize, currentFontSize + step));
    document.body.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('preferredFontSize', currentFontSize);
    showNotification('Schriftgröße: ' + currentFontSize + 'px');
}

// Benachrichtigung anzeigen
function showNotification(message) {
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => notification.remove());
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Zurück nach oben scrollen
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme-Wechsel direkt verfügbar machen
function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
    document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.theme-option[data-theme="${theme}"]`).classList.add('active');
    if (theme === 'light') {
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.color = '#333333';
        document.querySelector('header').style.backgroundColor = '#e0e0e0';
        document.querySelector('main').style.backgroundColor = '#ffffff';
        document.querySelectorAll('section h2').forEach(h2 => {
            h2.style.color = '#1976d2';
            h2.style.borderBottomColor = '#2196f3';
        });
    } else if (theme === 'pink') {
        document.body.style.backgroundColor = '#20062e';
        document.body.style.color = '#ffffff';
        document.querySelector('header').style.backgroundColor = '#2e0a42';
        document.querySelector('main').style.backgroundColor = '#2e0a42';
        document.querySelectorAll('section h2').forEach(h2 => {
            h2.style.color = '#ff44cc';
            h2.style.borderBottomColor = '#ff66d9';
        });
    } else {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#e0e0e0';
        document.querySelector('header').style.backgroundColor = '#1c1c1c';
        document.querySelector('main').style.backgroundColor = '#1e1e1e';
        document.querySelectorAll('section h2').forEach(h2 => {
            h2.style.color = '#90caf9';
            h2.style.borderBottomColor = '#42a5f5';
        });
    }
    console.log('Theme gewechselt zu: ' + theme);
}

function toggleNavbar() {
    const navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
}

function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCounter');
    if (counterElement) {
        const baseCount = 1373;
        let visitorCount = baseCount;
        counterElement.textContent = visitorCount;
        setTimeout(() => {
            counterElement.classList.add('loading');
            setTimeout(() => {
                counterElement.classList.remove('loading');
                counterElement.classList.add('counter-change');
                const initialDelta = Math.floor(Math.random() * 5) - 2;
                visitorCount = baseCount + initialDelta;
                counterElement.textContent = visitorCount;
                setTimeout(() => {
                    counterElement.classList.remove('counter-change');
                }, 700);
            }, 800);
        }, 1500);
        setInterval(function() {
            counterElement.classList.add('loading');
            setTimeout(() => {
                counterElement.classList.remove('loading');
                const time = new Date();
                const hour = time.getHours();
                let chance = 0.2;
                let maxDelta = 2;
                if (hour >= 9 && hour < 18) {
                    chance = 0.4;
                    maxDelta = 3;
                }
                if (hour >= 0 && hour < 6) {
                    chance = 0.1;
                    maxDelta = 1;
                }
                if (hour >= 18 && hour < 22) {
                    chance = 0.5;
                    maxDelta = 4;
                }
                if (Math.random() < chance) {
                    const isIncrease = Math.random() < 0.7;
                    const delta = Math.floor(Math.random() * maxDelta) + 1;
                    if (isIncrease) {
                        visitorCount += delta;
                    } else {
                        visitorCount = Math.max(baseCount - 10, visitorCount - delta);
                    }
                    counterElement.classList.add('counter-change');
                    counterElement.textContent = visitorCount;
                    setTimeout(() => {
                        counterElement.classList.remove('counter-change');
                    }, 700);
                }
            }, 400);
        }, 8000);
    }
}

function checkOfflineStatus() {
    const offlineNotification = document.getElementById('offlineNotification');
    if (!navigator.onLine) {
        offlineNotification.classList.add('visible');
        showNotification('Sie sind offline. Einige Funktionen sind eingeschränkt.');
    } else {
        offlineNotification.classList.remove('visible');
    }
}
window.addEventListener('online', checkOfflineStatus);
window.addEventListener('offline', checkOfflineStatus);

function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    observer.unobserve(image);
                }
            });
        });
        images.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

(function() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    document.querySelectorAll('.section-with-bg').forEach(function(section) {
        section.classList.add('fade-in');
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('section').forEach(function(section) {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
    const main = document.querySelector('main');
    if (main) {
        main.style.display = 'block';
    }
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'block';
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM vollständig geladen");
    initVisitorCounter();
    console.log("Besucherzähler wurde initialisiert");
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registriert: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker Registration fehlgeschlagen: ', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.style.display = 'block';
                targetElement.style.visibility = 'visible';
                targetElement.style.opacity = '1';
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                console.log("Navigation zu:", targetId);
            } else {
                console.warn("Zielelement nicht gefunden:", targetId);
            }
        });
    });
    ['about-maxify', 'skills', 'project-gallery', 'faq', 'contact'].forEach(id => {
        if (!document.getElementById(id)) {
            console.error("Wichtiges Element fehlt:", id);
        } else {
            console.log("Element gefunden:", id);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        const header = document.querySelector('.animated-header');
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    const particleCount = Math.floor(window.innerWidth / 10);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            directionChangeTime: Math.random() * 100 + 50
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            if (Math.random() < 0.01) {
                particle.speedX = Math.random() * 1 - 0.5;
                particle.speedY = Math.random() * 1 - 0.5;
            }
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
});

document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    const words = [
        "Webentwickler", 
        "Designer", 
        "UI/UX Experte",
        "Problem-Löser",
        "Innovator"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    function type() {
        const currentWord = words[wordIndex];
        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                type();
            }, 1500);
            return;
        }
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isWaiting = true;
            }
        }
        let typeSpeed = isDeleting ? 80 : 150;
        setTimeout(type, typeSpeed);
    }
    setInterval(() => {
        typingCursor.style.opacity = typingCursor.style.opacity === '0' ? '1' : '0';
    }, 500);
    setTimeout(type, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  const steps = [
    { label: 'Name', key: 'name', type: 'text', placeholder: 'Dein Name' },
    { label: 'E-Mail', key: 'email', type: 'email', placeholder: 'deine@email.de' },
    { label: 'Betreff', key: 'subject', type: 'text', placeholder: 'Betreff' },
    { label: 'Nachricht', key: 'message', type: 'textarea', placeholder: 'Deine Nachricht' }
  ];
  const terminal = document.getElementById('terminal-contact');
  if (!terminal) return;
  const output = document.getElementById('terminal-output');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const cursor = document.querySelector('.terminal-cursor');
  let currentStep = 0;
  let values = {};
  let isSummary = false;
  let isSent = false;

  function printLine(text, isPrompt = false) {
    const line = document.createElement('div');
    line.textContent = (isPrompt ? '> ' : '') + text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function askStep() {
    input.value = '';
    if (steps[currentStep].key === 'email') {
      input.type = 'email';
    } else {
      input.type = 'text';
    }
    input.placeholder = steps[currentStep].placeholder;
    printLine(steps[currentStep].label + ':', true);
  }

  function showSummary() {
    isSummary = true;
    input.style.display = 'none';
    cursor.style.display = 'none';
    form.querySelector('.terminal-prompt').style.display = 'none';
    let summary = document.createElement('div');
    summary.className = 'terminal-summary';
    summary.innerHTML =
      `<b>Name:</b> ${values.name || ''}<br>` +
      `<b>E-Mail:</b> ${values.email || ''}<br>` +
      `<b>Betreff:</b> ${values.subject || ''}<br>` +
      `<b>Nachricht:</b> ${values.message || ''}`;
    output.appendChild(summary);
    let sendBtn = document.createElement('button');
    sendBtn.className = 'terminal-send-btn';
    sendBtn.textContent = 'Nachricht senden';
    sendBtn.onclick = sendMessage;
    output.appendChild(sendBtn);
    output.scrollTop = output.scrollHeight;
  }

  function sendMessage() {
    if (isSent) return;
    isSent = true;
    output.innerHTML += '\n> Sende Nachricht...';

    fetch('https://formsubmit.co/ajax/maxschueller11@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message
      })
    })
    .then(response => response.json())
    .then(data => {
      output.innerHTML += '\n> Vielen Dank! Deine Nachricht wurde übermittelt.';
      output.scrollTop = output.scrollHeight;
    })
    .catch(error => {
      output.innerHTML += '\n> Fehler beim Senden. Bitte versuche es später erneut.';
      output.scrollTop = output.scrollHeight;
    });
  }

  form.onsubmit = function(e) {
    e.preventDefault();
    if (isSummary) return;
    const val = input.value;
    if (!val && ['name', 'email', 'message'].includes(steps[currentStep].key)) return;
    values[steps[currentStep].key] = val;
    printLine(val, false);
    currentStep++;
    if (currentStep < steps.length) {
      printLine(steps[currentStep].label + ':', true);
      askStep();
    } else {
      showSummary();
    }
  };

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      form.dispatchEvent(new Event('submit'));
    }
  });

  output.innerHTML = '> Interaktives Kontakt-Terminal\n';
  askStep();
});

document.addEventListener('DOMContentLoaded', function() {
  var exitBtn = document.querySelector('.terminal-contact .dot-red');
  var terminal = document.getElementById('terminal-contact');
  if(exitBtn && terminal) {
    exitBtn.addEventListener('click', function() {
      terminal.style.display = 'none';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.animated-header');
    function handleNavbarSticky() {
        const headerRect = header.getBoundingClientRect();
        if (headerRect.bottom <= navbar.offsetHeight + 10) {
            navbar.classList.add('fixed');
            document.body.classList.add('navbar-fixed');
        } else {
            navbar.classList.remove('fixed');
            document.body.classList.remove('navbar-fixed');
        }
    }
    window.addEventListener('scroll', handleNavbarSticky);
    handleNavbarSticky();
}); 