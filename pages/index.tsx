import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
    
import useMoviesList from '@/hooks/useMoviesList';

import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session){
        return {
            redirect:{
                destination: '/auth',
                premanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    const { data: movies = []} = useMoviesList(); 

    return (
        <>
            <Navbar />
            <Billboard />
            <div className='pb-40'>
                <MovieList title="Trending Now" data={movies} />
            </div>
        </>
    )
}
