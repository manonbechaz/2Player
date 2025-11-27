window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

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

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
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
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: false,
		autoplay: false,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})


const stepInfo = {
    0: {
      img: "static/images/2Players_schema.svg",  // Overview image
      text: `
        <strong>Overview:</strong><br>
        2Player is a cooperative self-supervised framework built around two interacting models. 
        A change detector proposes potential change maps, while a recon- struction network predicts 
        how the scene should look if no change happened. Through an iterative feedback loop, the two models 
        refine each other, enabling reliable change detection without labeled data.
      `
    },
  1: {
    img: "static/images/schema_2PLayer2.svg",
    text: "<strong>Step 1:</strong> Player 1 is a generic change detection network that takes two co-registered images from different times and produces a proposition of change map. 2Player is architecture-agnostic, and this component can be implemented using any CD backbone, making the framework easily adaptable."
  },
  2: {
    img: "static/images/schema_2PLayer1.svg",
    text: `<strong>Step 2:</strong> Player 2 is an image reconstruction model designed to learn the expected
    appearance of the later image using the earlier one, under the assumption that no change has occurred. By focusing only on unchanged regions, 
    the model learns to reconstruct normal variations such as illumination or seasonal shifts while naturally producing high reconstruction errors in truly changed areas.
    `
  },
  3: {
    img: "static/images/schema_2PLayer3.svg",
    text: `<strong>Step 3:</strong> The change map produced by Player 1 is used to mask out detected changes,
        allowing Player 2 to focus on reconstructing only the unchanged regions, this is one side of the cooperation. 
        On the other hand, reconstruction errors of Player 2 flow back to Player 1 as a self-supervised signal: 
        areas that remain difficult to reconstruct are flagged as potential missed changes, enabling both models to iteratively refine their predictions.

        `
  },
  4: {
    img: "static/images/schema_2PLayer4.svg",
    text: `<strong>Step 4:</strong> To reduce false positives caused by appearance shifts, the Geographical Correspondence Module 
    computes a structural dissimilarity prior between the two images. By comparing feature represen- tations of matched superpixels,
    it highlights regions with genuine structural shifts, helping the model distinguish real changes from seasonal or color variations.
    `
  }
};

const imgElement = document.getElementById("method-img");
const textBox = document.getElementById("step-description");
const buttons = document.querySelectorAll(".step-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const step = btn.getAttribute("data-step");

    // Update image
    imgElement.src = stepInfo[step].img;

    // Update text
    textBox.innerHTML = `<p>${stepInfo[step].text}</p>`;

    // Visual highlight
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});



