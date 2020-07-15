let newList = []
const apiKey = `fb79e1dd73084533b72be1bc6d99e5c0`
// const apiKey = process.env.APIKEY
// http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-15&sortBy=publishedAt&apiKey=fb79e1dd73084533b72be1bc6d99e5c0
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
let pageNumber = 1;

const callApi = async () => {
    // fb79e1dd73084533b72be1bc6d99e5c0
    let data = await fetch(url)
    let result = await data.json()

    newList = result.articles

    render(newList)
    console.log(newList)
}

// 5. able to search by source
async function searchBySource() {
    let source = document.getElementById("searchBySource").value;
    // console.log(source)

    url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&sources=${source}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)

}
// 1. use moment js to show publishedAt data

let myArrayCategory = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology']

// 2. able to search by category
function newButton() {
    let newButton = myArrayCategory.map((item, index) => {
        return `<Button onclick="searchByCategory(${index})" id="${item}">${item}</Button>`
    }).join("")
    document.getElementById('categoryButton').innerHTML += newButton
}

async function searchByCategory(index) {
    console.log(myArrayCategory[index])
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&category=${myArrayCategory[index]}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles

    render(newList)
    console.log(url)
}

// 3. able to search by keyword
async function search() {
    let keyword = document.getElementById("searchByKeyword").value;
    console.log(keyword)

    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&q=${keyword}`;
    let data = await fetch(url)
    let result = await data.json()
    newList = result.articles
    render(newList)

}

let keyword = document.getElementById("searchByKeyword");

keyword.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 32) {
        search()
    }
    // do something
});



// 4. able to load more
async function loadMore() {
    pageNumber++
    let data = await fetch(`${url}&page=${pageNumber}`)
    let result = await data.json()
    newList = newList.concat(result.articles)
    // concat push more in array
    render(newList)
}



// 6. make it pretty

// printout heading of artciles
function render(list) {
    let newsHTML = list.map((item, index) => {
        let publishedAt = moment(item['publishedAt']).fromNow()
        return `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.urlToImage}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"><a href="${item.url}">${item.title}<a/></h5>
                <p class="card-text">${item.content}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Published at: ${publishedAt}</li>
                <li class="list-group-item">Source: ${item.source.name}</li>
                <li class="list-group-item">Author: ${item.author}</li>
            </ul>
            <div class="card-body">
                <a href="${item.url}" class="card-link">Read more</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
        `
    })
    document.getElementById('newsListArea').innerHTML = newsHTML;

}

callApi()


newButton()