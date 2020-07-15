let newList = []
// fb79e1dd73084533b72be1bc6d99e5c0
const apiKey = process.env.APIKEY

const callApit = async () => {
    let url = `http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-15&sortBy=publishedAt&apiKey=${apiKey}`;
    let data = await fetch(url)
    let result = await data.json()

    newList = result.articles

    render(newList)
    console.log(newList)
}

// 1. use moment js to show publishedAt data
// 2. able to search by category
// 3. able to search by keyword
// 4. able to load more

// printout heading of artciles
function render(list) {
    let newsHTML = list.map((item, index) => {
        return `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${item.urlToImage}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"><a href="${item.url}">${item.title}<a/></h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">${item.source.name}</li>
                <li class="list-group-item">${item.author}</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
        `
    })
    document.getElementById('newsListArea').innerHTML = newsHTML;
}

callApit()


