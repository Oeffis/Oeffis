import { render } from "@testing-library/react";
import { useEffect } from "react";
import { PersistenceProvider } from "../persistence/PersistenceContext";
import { FavouriteTripsProvider, useFavouriteTrips } from "./FavouritesContext";

it("renders without crashing", () => {
  const { baseElement } = render(<FavouriteTripsProvider />);
  expect(baseElement).toBeDefined();
});

it("renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavouriteTripsProvider>
        <div>test</div>
      </FavouriteTripsProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

it("Can use context to add favourites", () => {

  const Test = (): JSX.Element => {
    const { addFavouriteTrip, favouriteTrips } = useFavouriteTrips();

    useEffect(() => {
      addFavouriteTrip({
        originStopId: "test",
        destinationStopId: "test"
      });
    }, []);

    return <div>{favouriteTrips.map(x => x.originStopId)}</div>;
  };

  const { baseElement } = render(
    <PersistenceProvider>
      <FavouriteTripsProvider>
        <Test />
      </FavouriteTripsProvider>
    </PersistenceProvider>
  );

  expect(baseElement).toBeDefined();
  expect(baseElement.innerHTML).toContain("test");
});
