//Declaring variable and Getting Element ID
const blog = document.getElementById('blog');
const blogSelector = document.getElementById('blog-select');
const newsSelector = document.getElementById('news-select');
const newsNavigation = document.getElementById('news-navigator-list');
const categoryHome = document.getElementById('home-button');
const cardShower = document.getElementById("card-shower");
const newsCount = document.getElementById("news-count");

//Navbar Active and Inactive 

blogSelector.addEventListener('click', function () {
    console.log("Blog Selected");
    blogSelector.classList.add('active');
    newsSelector.classList.remove('active');
    newsNavigation.classList.add('d-none');
    cardShower.innerHTML = "";
    newsCount.classList.add('d-none');
    blog.classList.remove('d-none');
})
newsSelector.addEventListener('click', function () {
    console.log("News Selected");
    blogSelector.classList.remove('active');
    newsSelector.classList.add('active');
    newsCount.classList.remove('d-none');
    newsNavigation.classList.remove('d-none');
    blog.classList.add('d-none');
    //loadNavigation();
    newsFetch(1);
})
// Spinner Section
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

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
         <a onclick="newsFetch(${element.category_id}); toggleSpinner(true)" class="nav-link" href="#">${element.category_name}</a>
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

    if (data.length > 0) {
        cardShower.innerText = "";
        data.sort((a, b) => {
            return b.total_view - a.total_view;
        });
        data.forEach(items => {
            console.log("Yes");
            const divs = document.createElement("div");
            divs.innerHTML = `
            <div class="card mb-3">
            <div class="row">
              <div class="col col-sm-12 col-md-3  m-auto">
                <img
                src="${items.image_url}"
                class="card-img-left rounded img-thumbnail"
                alt="..."
                />
              </div>
              <div class="card-body col col-sm-12 col-md-9">
                <h5 class="card-title">
                  ${items.title}
                </h5>
                <p class="card-text">
                  ${items.details.slice(0, 280)}...
                </p>
                <div class="card-footer d-flex justify-content-around align-items-center">
                    <div class="author">
                        <img class="author-img rounded" src="${items.author.img}" alt="No Image found" />
                        <p style="margin-left: 10px">${items.author ? items.author.name : "No Name"}</p>
                    </div>
                    <div class="flex"> <p>Total View : ${items.total_view}</p></div>
                    <a href="">Details-></a>
                </div>
            </div>
          </div>
            `;
            cardShower.appendChild(divs);
        })
    }
    //Error handelling
    else {
        //console.log("nothing");
        cardShower.innerHTML = `
            <div class="text-center mt-5 text-danger">
                <P>There is No Data in this category</P>
            </div>
                `;
    }
    toggleSpinner(false);
}



loadNavigation();
newsFetch(1);