const bookGrid = document.getElementById('bookGrid');
const bestTitles = ['소나기', '날개', '동백꽃', '운수 좋은 날'];

function createBookItem(book) {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.onclick = () => {
        window.location.href = `reader.html?book=${encodeURIComponent(book.filename)}`;
    };

    if (bestTitles.includes(book.title)) {
        const favIcon = document.createElement('span');
        favIcon.className = 'material-icons favorite-icon';
        favIcon.textContent = 'emoji_events';
        bookItem.appendChild(favIcon);
    }

    const image = new Image();
    image.src = book.image;
    image.alt = book.title;
    image.onerror = () => {
        image.src = '/images/error.png';
    };
    bookItem.appendChild(image);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'book-title';
    titleDiv.textContent = book.title;
    bookItem.appendChild(titleDiv);

    bookGrid.appendChild(bookItem);
}

// books.json 불러오기
fetch('../book/books.json')
    .then(response => response.json())
    .then(data => {
        data
            .sort((a, b) => {
                const aIsFav = bestTitles.includes(a.title);
                const bIsFav = bestTitles.includes(b.title);
                return (aIsFav === bIsFav) ? 0 : aIsFav ? -1 : 1;
            })
            .forEach(createBookItem);

    })
    .catch(error => {
        console.error('책 데이터를 불러오는 데 실패했습니다:', error);
    });

// 즐겨찾기 토글 기능
let showingFavoritesOnly = false;
document.querySelector('.nav-icons i[title="베스트"]').addEventListener('click', () => {
    showingFavoritesOnly = !showingFavoritesOnly;
    document.querySelectorAll('.book-item').forEach(book => {
        const isFavorite = book.querySelector('.favorite-icon') !== null;
        book.style.display = (showingFavoritesOnly && !isFavorite) ? 'none' : 'flex';
    });
});

window.addEventListener('resize', () => {
    renderBook();
});
