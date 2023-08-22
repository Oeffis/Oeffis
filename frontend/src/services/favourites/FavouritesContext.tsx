import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePersistence } from "../persistence/PersistenceContext";
import { parsePersistedFavourites, stringifyFavourites } from "./persistenceFunctions";

const FAVOURITES_KEY = "favourites";

export type CreateFavourite = {
  origin: string;
  destination: string;
};

export type Favourite = {
  createdAt: Date;
  id: string;
} & CreateFavourite;

export type FavouritesService = {
  addFavourite: (createFavourite: CreateFavourite) => Favourite;
  removeFavouriteById: (id: string) => boolean;
  removeFavourite: (favourite: Favourite) => boolean;
  favourites: Favourite[];
};

export const FavouritesContext = createContext<FavouritesService | null>(null);

export function FavouritesProvider(props: PropsWithChildren): JSX.Element {
  const persistence = usePersistence();
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  useEffect(() => {
    const parsedFromPersistence = parsePersistedFavourites(persistence.get(FAVOURITES_KEY));
    setFavourites(parsedFromPersistence);
  }, [
    persistence,
    setFavourites
  ]);

  const setFavouritesAndPersist = useCallback(
    (newFavourites: Favourite[]): void => {
      setFavourites(newFavourites);
      persistence.set(FAVOURITES_KEY, stringifyFavourites(newFavourites));
    },
    [
      persistence,
      setFavourites
    ]
  );

  const addFavourite = useCallback(
    (createFavourite: CreateFavourite): Favourite => {
      const favourite = {
        ...createFavourite,
        createdAt: new Date(),
        id: uuidv4()
      };

      const newFavourites = [...favourites, favourite];
      setFavouritesAndPersist(newFavourites);
      return favourite;
    },
    [
      favourites,
      setFavouritesAndPersist
    ]
  );

  const removeFavouriteById = useCallback(
    (id: string): boolean => {
      let found = false;
      const newFavourites = favourites.filter(favourite => {
        if (favourite.id === id) {
          found = true;
          return false;
        }

        return true;
      });

      if (!found) {
        return false;
      }

      setFavouritesAndPersist(newFavourites);
      return true;
    },
    [
      favourites,
      setFavouritesAndPersist
    ]
  );

  const removeFavourite = useCallback(
    (favourite: Favourite): boolean => removeFavouriteById(favourite.id),
    [
      removeFavouriteById
    ]
  );

  return (
    <FavouritesContext.Provider value={{
      favourites,
      addFavourite,
      removeFavouriteById,
      removeFavourite
    }}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesService {
  const favouritesService = useContext(FavouritesContext);

  if (favouritesService === null) {
    throw new Error("useFavourites must be used within a FavouritesContext");
  }

  return favouritesService;
}
