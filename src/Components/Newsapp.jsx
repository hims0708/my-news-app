import Card from './Card'
import React, { useEffect, useState } from 'react'

function Newsapp() {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null)

    const getData = async () => {
        const response = await fetch(`/api/news?q=${search}`);
        const jsonData = await response.json();
        let dt = jsonData.articles ? jsonData.articles.slice(0, 50) : [];
        setNewsData(dt)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const userInput = (event) => {
        setSearch(event.target.value)
        // Immediately fetch news for the selected category
        const fetchCategory = async () => {
            const response = await fetch(`/api/news?q=${event.target.value}`);
            const jsonData = await response.json();
            if (jsonData.articles) {
                setNewsData(jsonData.articles.slice(0, 50));
            }
        };
        fetchCategory();
    }

    return (
        <div className="app-wrapper">
            <nav>
                <div className="logo">
                    <h1>Trendy News</h1>
                </div>
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Search news topics...'
                        value={search}
                        onChange={handleInput}
                        className="search-input"
                    />
                    <button onClick={getData} className="search-button">
                        Search
                    </button>
                </div>
            </nav>

            <header className="hero">
                <h2 className='head'>Stay Updated with TrendyNews</h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginTop: '-1rem', marginBottom: '2rem' }}>
                    Discover the latest stories from around the world
                </p>
            </header>

            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            <main>
                {newsData ? <Card data={newsData} /> : (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <p>Loading the latest news...</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Newsapp
