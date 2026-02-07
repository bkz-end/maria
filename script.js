// Canvas web animation
const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class WebNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#e23636';
        ctx.fill();
    }
}

const nodes = [];
const nodeCount = 30;

for (let i = 0; i < nodeCount; i++) {
    nodes.push(new WebNode(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    ));
}

function drawWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(226, 54, 54, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(drawWeb);
}

drawWeb();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Progressive reveal for photo details
const detailsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const details = entry.target.querySelector('.photo-details');
            if (details) {
                setTimeout(() => {
                    details.style.opacity = '1';
                    details.style.transform = 'translateY(0)';
                }, 300);
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px'
});

document.querySelectorAll('.photo-card').forEach(card => {
    detailsObserver.observe(card);
});

// Parallax effect on scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header-content');
            
            if (header && scrolled < window.innerHeight) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
                header.style.opacity = 1 - (scrolled / window.innerHeight);
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Vinyl icon rotation on music quote interaction
document.querySelectorAll('.music-quote').forEach(quote => {
    const vinyl = quote.querySelector('.vinyl-icon');
    let rotation = 0;
    let animationFrame;
    
    const rotate = () => {
        rotation += 3;
        vinyl.style.transform = `rotate(${rotation}deg)`;
        animationFrame = requestAnimationFrame(rotate);
    };
    
    quote.addEventListener('mouseenter', () => {
        rotate();
    });
    
    quote.addEventListener('mouseleave', () => {
        cancelAnimationFrame(animationFrame);
    });
    
    // Touch support
    quote.addEventListener('touchstart', () => {
        rotate();
    });
    
    quote.addEventListener('touchend', () => {
        cancelAnimationFrame(animationFrame);
    });
});

// Add touch feedback
document.querySelectorAll('.stat-card').forEach(el => {
    el.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    el.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// Spider icon animation on click
document.querySelectorAll('.spider-icon, .spider-icon-small').forEach(spider => {
    spider.addEventListener('click', () => {
        spider.style.animation = 'none';
        setTimeout(() => {
            spider.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
});
