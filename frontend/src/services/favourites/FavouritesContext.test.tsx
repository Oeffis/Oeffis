import { render } from "@testing-library/react";
import { FavouritesProvider, useFavourites } from "./FavouritesContext";
import { PersistenceProvider } from "../persistence/PersistenceContext";
import { useEffect } from "react";

it("renders without crashing", () => {
  const { baseElement } = render(<FavouritesProvider />);
  expect(baseElement).toBeDefined();
});

it("renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavouritesProvider>
        <div>test</div>
      </FavouritesProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

it("Can use context to add favourites", () => {

  const Test = (): JSX.Element => {
    const { addFavourite, favourites } = useFavourites();

    useEffect(() => {
      addFavourite({
        origin: "test",
        destination: "test"
      });
    }, []);

    return <div>{favourites.map(x => x.origin)}</div>;
  };

  const { baseElement } = render(
    <PersistenceProvider>
      <FavouritesProvider>
        <Test />
      </FavouritesProvider>
    </PersistenceProvider>
  );

  expect(baseElement).toBeDefined();
  expect(baseElement.innerHTML).toContain("test");
});
