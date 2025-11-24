function copyURI(evt) {
    evt.preventDefault();
    navigator.clipboard.writeText(evt.target.getAttribute('href')).then(() => {}, () => {});
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('Show');
            //entry.target.classList.remove('Hidden');
        }else{
            entry.target.classList.remove('Show');
            //entry.target.classList.add('Hidden');
        }
    });
});
const ElementsToSearch = document.querySelectorAll('.Hidden,.Hidden2');
ElementsToSearch.forEach((el) => observer.observe(el));