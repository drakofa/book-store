const { createApp } = Vue;

createApp({
    data() {
        return {
            currentView: 'catalog', // 'catalog' или 'book'
            currentBook: null,
            showFavorites: false,
            books: booksData,
            favorites: JSON.parse(localStorage.getItem('bookFavorites')) || []
        }
    },
    
    computed: {
        favoritesCount() {
            return this.favorites.length;
        },
        
        favoriteBooks() {
            return this.books.filter(book => this.favorites.includes(book.id));
        }
    },
    
    methods: {
        // Навигация
        goToHome() {
            this.currentView = 'catalog';
            this.currentBook = null;
        },
        
        openBook(book) {
            this.currentBook = book;
            this.currentView = 'book';
        },
        
        // Избранное
        toggleFavorite(bookId) {
            const index = this.favorites.indexOf(bookId);
            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(bookId);
            }
            this.saveFavorites();
        },
        
        removeFromFavorites(bookId) {
            this.favorites = this.favorites.filter(id => id !== bookId);
            this.saveFavorites();
        },
        
        isFavorite(bookId) {
            return this.favorites.includes(bookId);
        },
        
        saveFavorites() {
            localStorage.setItem('bookFavorites', JSON.stringify(this.favorites));
        }
    }
}).mount('#app');