let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity ="1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);





//<a href="#" class="btn" id="downloadCV">Download CV</a>


  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("downloadCV").addEventListener("click", function(e) {
      e.preventDefault();  // Prevent the default link action

      const link = document.createElement("a");
      link.href = "path/to/your/cv.pdf";  // Replace with your actual CV path
      link.download = "My_CV.pdf";  // Specify the filename to download

      link.click();
    });
  });




////// read more button ////////////////////////////////////////////////
document.getElementById("read-more-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior

    const hiddenText = document.querySelector(".hidden-text");
    const button = event.target;

    // Toggle the visibility of the hidden text
    if (hiddenText.classList.contains("show")) {
        hiddenText.classList.remove("show");
        button.textContent = "Read More!";
    } else {
        hiddenText.classList.add("show");
        button.textContent = "Read Less!";
    }
});
//// read more buttons for services section////////////////////////////////

// Select all "Read More" buttons
const readMoreButtons = document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        const parentBox = button.closest(".service-box"); // Find the parent container
        const hiddenText = parentBox.querySelector(".hidden-text");

        // Toggle the visibility of the hidden text
        if (hiddenText.classList.contains("show")) {
            hiddenText.classList.remove("show");
            button.textContent = "Read More"; // Update button text
        } else {
            hiddenText.classList.add("show");
            button.textContent = "Read Less"; // Update button text
        }
    });
});






// circle skill /////////////////////////////////////////////////////////////

const circles = document.querySelectorAll('.circle')
circles.forEach(element=>{
    var dots = element.getAttribute("data-dots");
    var marked = element.getAttribute("data-percent");
    var percent = Math.floor((dots * marked) /100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0 ; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;

    };
    element.innerHTML = points;

    const pointsMarked = element.querySelectorAll('.points');
    for (let i = 0; i < percent ; i++){
        pointsMarked[i].classList.add('marked')
    }
});

/// projects section links ////////////////////////////////////////////

document.querySelectorAll('.project-image').forEach(item => {
    item.addEventListener('click', event => {
        const projectContent = event.target.closest('.port-box').querySelector('.port-content');
        const projectParagraph = projectContent.querySelector('p');
        const projectLink = projectContent.querySelector('.btn-read-more');
        
        // Toggle visibility of full project description
        if (projectParagraph.style.maxHeight) {
            projectParagraph.style.maxHeight = null;
        } else {
            projectParagraph.style.maxHeight = projectParagraph.scrollHeight + "px";
        }

        // Optionally open the GitHub link when "Read More" is clicked
        projectLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(projectLink.href, '_blank');
        });
    });
});














// mix it up portfolio section --------------------------------------

var mixer = mixitup('.portfolio-gallery');

// active menu ////////////////////////////////////////

let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY +97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");

};

activeMenu();
window.addEventListener("scroll",activeMenu);

// sticky navbar ///////////////////////////////////////////////////

const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 50)
})

// toogle icon navbar /////////////////////////

let menuicon = document.querySelector(("#menu-icon"));
let navlist = document.querySelector(".navlist");

menuicon.onclick = ()=>{
    menuicon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = ()=>{
    menuicon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

// parallax ////////////////////////////////////////////////////////////

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else {
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));



//// contact form validation using email js //////////////////////
// Initialize EmailJS
emailjs.init("service_vx7buti"); // Replace with your actual EmailJS user ID

// Get form and fields
const form = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const addressField = document.getElementById('address');
const phoneField = document.getElementById('phone');
const messageField = document.getElementById('message');

// Add event listener to the form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate form fields
    if (nameField.value.trim() === "" || emailField.value.trim() === "" || addressField.value.trim() === "" || phoneField.value.trim() === "" || messageField.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare data to send
    const formData = {
        user_name: nameField.value,
        user_email: emailField.value,
        user_address: addressField.value,
        user_phone: phoneField.value,
        message: messageField.value,
    };

    // Send email using EmailJS
    emailjs.send("service_vx7buti", "template_ylpjmm8", formData)
        .then(function(response) {
            console.log('SUCCESS!', response);
            showThankYouMessage(); // Show the thank you message after submission
        }, function(error) {
            console.log('FAILED...', error);
            alert('something seems to be wrong in your server try to fix.');
        });
});

// Show thank you message
function showThankYouMessage() {
    setTimeout(function() {
        alert("Thank you for your message! I will get back to you soon.");
        form.reset(); // Reset the form after submission
    }, 3000); // Show after 3 seconds
}
