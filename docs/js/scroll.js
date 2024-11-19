"use strict";

const callbacks = new Map();
let currentSection = null;



// IntersectionObserver callback function
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const callback = callbacks.get(entry.target.id);
            if (callback && currentSection !== entry.target.id) {
                currentSection = entry.target.id;
                callback(entry);
            }
        }
    });
};

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 10% of the element is visible
});



export function observeScroll(config) {
		// Observe each element with the specified IDs
config.forEach(entry => {

    const element = document.getElementById(entry.id);
    if (element) {
            callbacks.set(entry.id, entry.callback);
            observer.observe(element);
        }
});
}
