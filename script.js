// modal window 
console.log("YO");
const addBook = document.getElementById("add-book");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector('.cross');


const openModal = () => {
    modal.classList.add('modal-active');
    overlay.classList.add('active');
}

const closeModal = () => {
    modal.classList.remove("modal-active");
    overlay.classList.remove("active");
}


addBook.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown',(e)=>{
    if(e.key === "Escape") closeModal();
});

