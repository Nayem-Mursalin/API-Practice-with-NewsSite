//Declaring variable and Getting Element ID
const blogSelector = document.getElementById('blog-select');
const newsSelector = document.getElementById('news-select');
const newsNavigation = document.getElementById('news-navigator-list');

//Navbar Active and Inactive 

blogSelector.addEventListener('click', function () {
    console.log("Blog Selected");
    blogSelector.classList.add('active');
    newsSelector.classList.remove('active');
})
newsSelector.addEventListener('click', function () {
    console.log("Blog Selected");
    blogSelector.classList.remove('active');
    newsSelector.classList.add('active');
})

//fetch data in navigation list
const loadNavigation = async id => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.news_category);
    navigationLoader(data.data.news_category);
}
const navigationLoader = (data) => {
    data.forEach(element => {
        const newsNav = document.createElement('li');
        newsNav.classList.add('nav-item');
        newsNav.innerHTML = `
        <a class="nav-link" href="#">${element.category_name}</a>
        `;
        newsNavigation.appendChild(newsNav);
    });

}
loadNavigation();