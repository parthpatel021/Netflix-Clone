import useCurrentUser from '@/hooks/useCurrentUser';
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
    const {data: user} = useCurrentUser();

    return (
        <>
            <h1 className="text-2xl text-white">Netflix - Clone</h1>
            <p className='text-white'>Logged in as: {user?.name}</p>
            <button className='h-10 w-full bg-white' onClick={() => signOut()}>LogOut</button>
        </>
    )
}
