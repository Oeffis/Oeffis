import { render } from "@testing-library/react";
import { FavouritesProvider, useFavourites } from "./FavouritesContext";
import { PersistenceProvider } from "../persistence/PersistenceContext";

test("renders without crashing", () => {
  const { baseElement } = render(<FavouritesProvider />);
  expect(baseElement).toBeDefined();
});

test("renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavouritesProvider>
        <div>test</div>
      </FavouritesProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

test("Can use context to add favourites", () => {

  const Test = (): JSX.Element => {
    const { addFavourite } = useFavourites();

    const favourite = addFavourite({
      origin: "test",
      destination: "test"
    });

    return <div>{favourite.origin}</div>;
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
