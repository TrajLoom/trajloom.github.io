window.HELP_IMPROVE_VIDEOJS = false;

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Autoplay videos when they are in view
function setupVideoAutoplay() {
    const autoplayVideos = document.querySelectorAll('.results-carousel video, video.autoplay-media');
    
    if (autoplayVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    autoplayVideos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel and qualitative results
    setupVideoAutoplay();

})


function closePipelinePanels() {
    const panelsContainer = document.getElementById('pipeline-method-panels');

    document.querySelectorAll('.method-panel').forEach(function (panel) {
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('is-active');
    });

    if (panelsContainer) {
        panelsContainer.hidden = true;
        panelsContainer.setAttribute('aria-hidden', 'true');
        panelsContainer.classList.remove('is-active');
    }

    document.body.classList.remove('pipeline-modal-open');
}

function togglePipelinePanel(panelId) {
    const panelsContainer = document.getElementById('pipeline-method-panels');
    const targetPanel = document.getElementById(panelId);

    if (!panelsContainer || !targetPanel) {
        return;
    }

    const panelIsAlreadyOpen = !panelsContainer.hidden && !targetPanel.hidden;

    closePipelinePanels();

    if (panelIsAlreadyOpen) {
        return;
    }

    panelsContainer.hidden = false;
    panelsContainer.setAttribute('aria-hidden', 'false');
    panelsContainer.classList.add('is-active');

    targetPanel.hidden = false;
    targetPanel.setAttribute('aria-hidden', 'false');
    targetPanel.classList.add('is-active');

    document.body.classList.add('pipeline-modal-open');
}

function handlePipelineModalBackdrop(event) {
    if (event.target === event.currentTarget) {
        closePipelinePanels();
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closePipelinePanels();
    }
});
