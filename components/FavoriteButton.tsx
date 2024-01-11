import axios from "axios";
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        let list = currentUser?.favoritesIds || [];
        
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        
        if(isFavorite){
            response = await axios.delete('/api/favorite', {data: {movieId}});
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }
        
        console.log(response?.data);
        
        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        });

        mutateFavorites();
    }, [ movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return(
        <div className="cursor-pointer group/items w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            onClick={toggleFavorites}
        >
            <Icon className="text-white" size={30} />
        </div>
    )
}   

export default FavoriteButton;