//Index books


function getindexbooks() {
axios
.get('http://openlibrary.org/subjects/mystery.json?limit=30')
.then(res => indexbooks(res))
.catch(err => console.error(err));
}

//putting data in index books
function indexbooks(res){
    let bookcontainer=document.getElementById("bookcontainer").children;
    let books=res.data.works;
    // console.log(books);
    for (var i=0; i<books.length; i++) {
        let cover=res.data.works[i].cover_id;
        let key=books[i].key.split("/")[2];
        // console.log(key);
        if (cover!=null) {

            bookcontainer[i].innerHTML=`<a href="./bookdesc/${books[i].title}/${books[i].cover_id}/${books[i].authors[0].name}/${books[i].first_publish_year}/${books[i].edition_count}/${key}"><img src="https://covers.openlibrary.org/b/ID/${cover}-M.jpg" alt="image not found"><p>${books[i].title}</p></a>`;
            continue;
        }
        else{
            // bookcontainer[i].innerHTML="<p>Image not found</p>";
            bookcontainer[i].innerHTML=`<a href="./bookdesc/${books[i].title}/${books[i].cover_id}/${books[i].authors[0].name}/${books[i].first_publish_year}/${books[i].edition_count}/${key}"><img style="height: 16rem;width: 11rem;" src="/images/cover.jpg" alt="image not found"><p>${books[i].title}</p></a>`;

        }
     }
     
}

//Searchbooks

function displaysearchbook(res){
    let searchedbooks=res.data.docs;
   document.getElementById("bookcontainer").style="display:none";
   document.getElementById("searchedbookcontainer").style="display: grid;grid-template-columns: repeat(1,auto); font-size: 1rem;padding-top: 11rem;grid-gap: 1rem;margin: auto;";
    let searchedbookcontainer=document.getElementById("searchedbookcontainer").children;
    for (var i=0; i<50; i++) {
      let key=searchedbooks[i].key.split("/")[2];
      if (searchedbooks[i].cover_i != null) {
        
          searchedbookcontainer[i].innerHTML=`<a href="./bookdesc/${searchedbooks[i].title}/${searchedbooks[i].cover_i}/${searchedbooks[i].author_name[0]}/${searchedbooks[i].first_publish_year}/${searchedbooks[i].number_of_pages_median}/${key}"><img style="display:inline;" src="https://covers.openlibrary.org/b/ID/${searchedbooks[i].cover_i}-M.jpg" alt="image not found"><p style="display:inherit;font-size: 3rem;padding: 3rem;">${searchedbooks[i].title}</p></a>`;
          searchedbookcontainer[i].style="background-color: #d8c6eb;display:block;";
      }
      else{
        searchedbooks[i].cover_i="10765851";
        searchedbookcontainer[i].innerHTML=`<a href="./bookdesc/${searchedbooks[i].title}/${searchedbooks[i].cover_i}/${searchedbooks[i].author_name[0]}/${searchedbooks[i].first_publish_year}/${searchedbooks[i].number_of_pages_median}/${key}"><img style="height: 16rem;width: 11rem;display:inline;" src="/images/cover.jpg" alt="image not found"><p style="display:inherit;font-size: 3rem;padding: 3rem;">${searchedbooks[i].title}</p></a>`;
        searchedbookcontainer[i].style="background-color: #d8c6eb;display:block;";
    }

     }
}
// searchingbook
function getsearchbooks(){
    // console.log(window.location.href);
    var searchinput=document.getElementById("searchinput").value;
    axios
    .get(`http://openlibrary.org/search.json?title=${searchinput}`)
    .then(res => displaysearchbook(res))
    .catch(err => console.error(err));
    console.log(searchinput);
}


//remove book from cart

function removebook() {
    axios
    .delete('/cart/books')
    .catch(err => console.error(err));
    window.location = "/";
    alert("Cart Has been emptied !")
    }




