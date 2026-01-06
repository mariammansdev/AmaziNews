import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';
import CategorySelector from '../components/CategorySelector';
import NewsList from '../components/NewsList';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import Pagination from '../components/Pagination';

const Home = () => {
    const getThemeFromLocalStorage = () => {
        return localStorage.getItem('theme') || themes.fantasy;
    };
    const [theme, setTheme] = useState(() => getThemeFromLocalStorage());



    const themes = {
        fantasy: 'fantasy',
        night: 'night'
    };
    const handleTheme = () => {
        const { fantasy, night } = themes;
        const newTheme = theme === fantasy ? night : fantasy;
        setTheme(newTheme);
    };
    const [category, setCategory] = useState('general');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [country, setCountry] = useState('us');

    const onCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setCurrentPage(1);
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['news', category, currentPage, country],
        queryFn: () => customFetch(category, currentPage, country),
    });

    useEffect(() => {
        if (data?.totalResults) {
            setTotalResults(data.totalResults);
            setTotalPages(Math.ceil(data.totalResults / 10));
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [data, theme]);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='min-h-screen bg-base-200'>
            <header className='bg-white text-primary content p-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Amazi News</h1>
                    <button
                        onClick={handleTheme}
                        className="btn btn-ghost btn-circle transition-transform"
                    >
                        {theme === themes.night ? (
                            <BsSunFill className="h-5 w-5 text-warning" />
                        ) : (
                            <BsMoonFill className="h-5 w-5 text-primary" />
                        )}
                    </button>
                </div>
            </header>
            <main className='container mx-auto p-4'>
                <div>
                    <CategorySelector category={category} onCategoryChange={onCategoryChange} />
                </div>
                <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
                    <h4 className='font-medium text-md'>
                        {totalResults} News
                    </h4>
                </div>
                {isLoading && <div>Loading...</div>}
            </main>
            {data && <div>
                <NewsList news={data?.articles} />
                {
                    totalPages > 1 && (
                    <div> 
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                )
                }
            </div>}
        </div>
    )
}
{/* <div> {data?.articles?.map((article, idx) => (
        <p key={idx}>{article.title}</p>
      ))}</div> */}

export default Home

