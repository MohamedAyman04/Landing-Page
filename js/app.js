// created ul to use it a global variable and set it to id navbar__list
const ul = document.querySelector('#navbar__list'); // selected the ul by the id #navbar__list
const div = document.querySelector('#coll'); // selected the div by the id #coll
const sections = document.querySelectorAll('section'); // selected the sections by it's tagName
const topOfPage = document.querySelector('#top'); // selecting the anchor element by it's id #top

// crating the navBar items
const updatedMenuBar = () => { // making a function called updatedMenuBar
    sections.forEach(section => { // looping through each section in all the sections
        const div = document.createElement('div'); // creating a div element
        div.innerHTML = `<a href = "#${section.id}" class = "menu__link">${section.dataset.nav}</a>`; // made changes inside the div using innerHTML property
        ul.append(div); // appended the div to the parent ul
    });
}

// calling updatedMenuBar function to update the menu bar
updatedMenuBar();

const anchors = ul.querySelectorAll('a'); // selecting all the anchor elements inside the ul

// created check a helper function to determine if the anchoer element and the active entry are having the same id
function check(a, active){
    return a.hash == `#${active.target.id}` ? true : false; // if the have the same id it will return true otherwise false
}

// created a helper function for the window and IntersectionObserver below to make the entry active
function makingEntryActive(active) { 
    active.target.classList.add('your-active-class'); // added the class your-active-class to the entry
    const anchors = ul.querySelectorAll('a'); // selecting all the anchor elements inside the ul
    anchors.forEach(a => { // looping through each anchor element
        if(check(a, active)) // check if it's egligible using the function check created above
            a.classList.add('active-link'); // adding the class .active-link to the anchor element if the check is true
    }); // end of loop
}

// created another helper function for the window and IntersectionObserver below to make the entry inactive
function makingEntryNotActive(active) {
    active.target.classList.remove('your-active-class'); // removing the class .your-active-class from the entry
    const anchors = ul.querySelectorAll('a'); // selecting all the anchor elements inside the ul
    anchors.forEach(a => { // looping through each anchor element
        if(check(a, active)) // check if it's egligible using the function check created above
            a.classList.remove('active-link'); // removing the class .active-link from the anchor element if the check is true
    }); // end of loop
}

// setActive is responsible for the active class if the section is on view
function setActive() {
    let see = new IntersectionObserver(actives => { // making an instance of IntersectionObserver and function
        actives.forEach(active => { // looping through each active element inside actives
            if(active.isIntersecting){ // check if the entry is intersecting
                makingEntryActive(active); // if true it will excute the makingEntryActive function
            } else { // else
                makingEntryNotActive(active); // it will excute the makingEntryNotActive function
            } // end of else statement
        }); // end of function
    }, {threshold: 0.8}); // added threshold option to 0.8

    sections.forEach(section => { // looping through all the sections
        see.observe(section); // observing each section
    }); // end of loop
}

// see which section is in view
window.addEventListener('load', setActive()) // adding an event listener to the window of type load then calling the function setActive

// adding the smooth scrolling behavior
anchors.forEach(a => { // looping through all the anchor elements
    a.addEventListener('click', (evt) => { // adding an event listener to eacg anchor element so when clicked the function will excute
        evt.preventDefault(); // preventing the default action from occuring
        sections.forEach(section => { // looping through each section in all the sections (7 sections)
            if(`#${section.id}` == a.hash) { // checking if the section id is equal to the a.hash property
                section.scrollIntoView({behavior: 'smooth', block: 'center'}); // scrolling to the appropriate section smoothly and centerd vertically using behavior and block
            } // end of if statement
        }); // end of the loop of the sections
    }); // end of the event listner function
}); // end of the loop of anchor elements

div.textContent = 'collapse'; // changed the text inside the div with id #coll at the top
let flag = true; // made a flag and assigned it's value to true

// adding the collapse effect
div.addEventListener('click', () => { // adding an event listener to listen for a click inside the div
    if(flag){ // if the flag is true it will enter this block
        div.textContent = 'uncollapse'; // changing the text inside the div to uncollapse
        ul.classList.add('not-visible'); // adding a class to the ul .not-visible to make it's visibility hidden
        ul.classList.remove('navbar__list_class'); // removing the navbar__list_class class to display none not flex
        flag = false; // assigned the flag a value of false
    } else { // else if the flag was false
        div.textContent = 'collapse'; // changing the text inside the div to collapse
        ul.classList.remove('not-visible'); // removing the class .not-visible to make the ul visible again
        ul.classList.add('navbar__list_class'); // adding the navbar__list_class class to display flex not none
        flag = true; // assigned the flag a value of true
    } // end of else block
}); // end of the event listener

// the functionallity of going to the top of the page
topOfPage.addEventListener('click', () => { // adding an event listener so when clicked the function will be excuted
    scroll({ // using the scroll function to scroll
        top: '0', // using option for top to 0 to go to the top of the page
        behavior: 'smooth' // set the behavior to smooth to go the top smoothly
    }); // end of the options and scroll function
}); // end of the event listner

/*
    resources used:
        MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach.
        MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll
        w3schools: https://www.w3schools.com/jsref/event_preventdefault.asp
        Stack Overflow: https://stackoverflow.com/questions/67930643/javascript-how-to-make-a-section-active-when-scrolled-to.
        Youtube: https://youtu.be/9W7rKLahq2Q.
*/