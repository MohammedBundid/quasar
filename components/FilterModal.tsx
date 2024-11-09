'use client'

import { useState } from "react"

const FilterModal = ({ visible }) => {
    const [isVisible, setIsVisible] = useState(visible)
    const [tabType, setTabType] = useState('')

    const genres = [
        'mystery', 'crime', 'animation', 'drama', 'science fiction', 'western', 
        'comedy', 'family', 'action', 'documentary', 'romance', 'fantasy', 'horror',
        'music', 'thriller', 'war', 'adventure', 'history', 'reality', 'action & adventure',
        'kids', 'war & politics', 'talk', 'sci-fi & fantasy', 'news', 'soap', 'biography'
    ]

    const types = ['movies', 'shows']
    const releases = [
        '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015',
        '2014', '2013', '2012', '2011', 'older'
    ]   

    const handleTab = (tabName) => {
        setTabType(tabName)
    }

    return (
        <div className={visible ? "absolute top-0 w-full h-[80vh] z-10" : 'hidden'}>
            <div className="w-1/2 h-full mx-auto bg-accent-600 rounded-md">
                <h3 className="text-text-50 p-4 font-sans text-xl capitalize">filter by:</h3>
                <div className="flex gap-4 p-4">
                    <button onClick={() => handleTab('genre')} className="px-4 py-2 rounded-full bg-primary-800 hover:bg-primary-700 duration-200 text-text-50">genre</button>
                    <button onClick={() => handleTab('type')} className="px-4 py-2 rounded-full bg-primary-800 hover:bg-primary-700 duration-200 text-text-50">type</button>
                    <button onClick={() => handleTab('release year')} className="px-4 py-2 rounded-full bg-primary-800 hover:bg-primary-700 duration-200 text-text-50">release year</button>
                    <button onClick={() => handleTab('cast')} className="px-4 py-2 rounded-full bg-primary-800 hover:bg-primary-700 duration-200 text-text-50">cast</button>
                </div>
                <div className="p-4 w-full">
                    {tabType === 'genre' && (
                        <div className="flex flex-wrap gap-2">
                            {genres.map((genre, index) => (
                                <button key={index} className="px-4 py-2 bg-primary-900 text-secondary-100 rounded-full">
                                    {genre}
                                </button>
                            ))}
                        </div>
                    )}
                    {tabType === 'type' && (
                        <div className="flex gap-2">
                            {types.map((type, index) => (
                                <button key={index} className="px-4 py-2 bg-primary-600 text-text-50 rounded-full">
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}
                    {tabType === 'release year' && (
                        <div className="flex flex-wrap gap-2">
                            {releases.map((year, index) => (
                                <button key={index} className="px-4 py-2 bg-primary-600 text-text-50 rounded-full">
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                    {tabType === 'cast' && (
                        <h1 className="text-text-50">Coming soon | Currently in beta</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FilterModal
