//Declaring variable and Getting Element ID
const blogSelector = document.getElementById('blog-select');
const newsSelector = document.getElementById('news-select');
const newsNavigation = document.getElementById('news-navigator-list');
const categoryHome = document.getElementById('home-button');

//Navbar Active and Inactive 

blogSelector.addEventListener('click', function () {
    console.log("Blog Selected");
    blogSelector.classList.add('active');
    newsSelector.classList.remove('active');
})
newsSelector.addEventListener('click', function () {
    console.log("News Selected");
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
         <a onclick="newsFetch(${element.category_id})" class="nav-link" href="#">${element.category_name}</a>
        `;
        newsNavigation.appendChild(newsNav);
    });

}
// Load the News 
const newsFetch = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => newsLoader(data.data, id))
}
const newsLoader = (data, id) => {
    console.log(data, id);
    //console.log("nayem");
    const categoryNumber = document.getElementById("number-of-category");
    categoryNumber.innerText = data.length;
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("category-name").innerText =
                data.data.news_category[id - 1].category_name;
        })

    //if (data.length > 0) {
    // document.getElementById()
    // console.log("data length is ", data.length);
    //console.log("Yes");
    const cardShower = document.getElementById("card-shower");
    cardShower.innerText = "";
    console.log("nayem");
    data.forEach(items => {
        console.log("Yes");
        const divs = document.createElement("div");
        divs.innerHTML = `
            <div class="card mb-3">
            <div class="row">
              <div class="col col-3 m-auto">
               
              </div>
              <div class="card-body col col-9">
                <h5 class="card-title">
                  ${items.title}
                </h5>
                <p class="card-text">
                  ${items.details.slice(0, 280)}...
                </p>
              </div>
            </div>
          </div>
            `;
        cardShower.appendChild(divs);
    })
}

//else {
//  console.log("nothing");
//}}


loadNavigation();
newsFetch(1);