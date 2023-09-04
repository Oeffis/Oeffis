import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PersistenceProvider } from "../persistence/PersistenceContext";
import { CreateFavouriteTrip, FavouriteTripsProvider, useFavouriteTrips } from "./FavouritesContext";

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

test("Can use context to add favourites", async () => {
  const { result } = renderHook(() => useFavouriteTrips(), {
    wrapper: ({ children }) => (
      <PersistenceProvider>
        <FavouriteTripsProvider>
          {children}
        </FavouriteTripsProvider>
      </PersistenceProvider>
    )
  });

  const { addFavouriteTrip } = result.current;

  const elementToAdd1 = {
    origin: {
      id: "testaa"
    },
    destination: {
      id: "testbb"
    }
  } as Partial<CreateFavouriteTrip> as CreateFavouriteTrip;

  await act(() => addFavouriteTrip(elementToAdd1));

  expect(result.current.favouriteTrips).toHaveLength(1);
  expect(result.current.favouriteTrips[0].destination.id).toBe("testbb");
  expect(result.current.favouriteTrips[0].origin.id).toBe("testaa");

});
