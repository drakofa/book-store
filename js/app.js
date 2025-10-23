const { createApp } = Vue;

createApp({
    data() {
        return {
            // Данные книг
            books: booksData,
            
            // Поиск и фильтрация
            searchQuery: '',
            currentCategory: 'all',
            
            // Избранное
            favorites: JSON.parse(localStorage.getItem('bookFavorites')) || [],
            showFavorites: false,
            
            // Пагинация
            currentPage: 1,
            itemsPerPage: 6
        }
    },
    
    computed: {
        // Фильтрация книг
        filteredBooks() {
            let filtered = this.books;
            
            // Фильтр по категории
            if (this.currentCategory !== 'all') {
                filtered = filtered.filter(book => book.category === this.currentCategory);
            }
            
            // Поиск
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(book => 
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
                );
            }
            
            return filtered;
        },
        
        // Количество избранных
        favoritesCount() {
            return this.favorites.length;
        }
    },
    
    methods: {
        // Установка категории
        setCategory(category) {
            this.currentCategory = category;
            this.currentPage = 1;
        },
        
        // Работа с избранным
        toggleFavorite(bookId) {
            const index = this.favorites.indexOf(bookId);
            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(bookId);
            }
            this.saveFavorites();
        },
        
        isFavorite(bookId) {
            return this.favorites.includes(bookId);
        },
        
        saveFavorites() {
            localStorage.setItem('bookFavorites', JSON.stringify(this.favorites));
        }
    },
    
    mounted() {
        console.log('BookStore загружен!');
    }
}).mount('#app');