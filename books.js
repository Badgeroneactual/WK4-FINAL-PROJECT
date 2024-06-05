let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += " books__loading";

  if (!books) {
    books = await getBooks();
  }

  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  

  {
  }
  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}




setTimeout(() => {
  renderBooks();
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "HAWKER HURRICANE",
          url: "assets/hurricane.jpg",
          originalPrice: 1200000,
          salePrice: null,
          rating: 4,
        },
        {
          id: 2,
          title: "SUPERMARINE SPITFIRE",
          url: "assets/spit.jpg",
          originalPrice: 2.2,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "CURTISS P-40 WARHAWK",
          url: "assets/p-40.jpg",
          originalPrice: 980,
          salePrice: null,
          rating: 3.5,
        },
        {
          id: 4,
          title: "YAKOVLEV YAK-9",
          url: "assets/yak.jpg",
          originalPrice: 1,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 5,
          title: "MITSUBISHI A6M5 ZERO",
          url: "assets/zero.jpg",
          originalPrice: 2.5,
          salePrice: 2,
          rating: 2.5,
        },
        {
          id: 6,
          title: "P-47 RAZORBACK THUNDERBOLT",
          url: "assets/p-47drazor.jpeg",
          originalPrice: 5.2,
          salePrice: 4.8,
          rating: 3.5,
        },
        {
          id: 7,
          title: "P-40C KITTYHAWK",
          url: "assets/kittyhawk.jpg",
          originalPrice: 1.8,
          salePrice: 1.3,
          rating: 4.5,
        },
        {
          id: 8,
          title: "P-38J LIGHTNING",
          url: "assets/lightning.jpg",
          originalPrice: 6.1,
          salePrice: 5.5,
          rating: 5,
        },
        {
          id: 9,
          title: "F6F HELLCAT",
          url: "assets/F6F.jpg",
          originalPrice: 2,
          salePrice: 1.9,
          rating: 5,
        },
        {
          id: 10,
          title: "P-51D MUSTANG",
          url: "assets/p-51d1.jpg",
          originalPrice: 2.2,
          salePrice: 1.8,
          rating: 4.5,
        },
        {
          id: 11,
          title: "P-51D MUSTANG",
          url: "assets/p51d2.jpg",
          originalPrice: 4,
          salePrice: 3.5,
          rating: 5,
        },
        {
          id: 12,
          title: "P-51D-N25 MUSTANG",
          url: "assets/p51d3.jpeg",
          originalPrice: 6.2,
          salePrice: 5.8,
          rating: 5,
        },
      ]);
    }, 1000);
  });
}
