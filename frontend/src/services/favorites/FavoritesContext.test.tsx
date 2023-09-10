import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PersistenceProvider } from "../persistence/PersistenceContext";
import { CreateFavoriteTrip, FavoriteTripsProvider, useFavoriteTrips } from "./FavoritesContext";

it("renders without crashing", () => {
  const { baseElement } = render(<FavoriteTripsProvider />);
  expect(baseElement).toBeDefined();
});

it("renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavoriteTripsProvider>
        <div>test</div>
      </FavoriteTripsProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

test("Can use context to add favorites", async () => {
  const { result } = renderHook(() => useFavoriteTrips(), {
    wrapper: ({ children }) => (
      <PersistenceProvider>
        <FavoriteTripsProvider>
          {children}
        </FavoriteTripsProvider>
      </PersistenceProvider>
    )
  });

  const { addFavoriteTrip } = result.current;

  const elementToAdd1 = {
    originId: "testaa",
    destinationId: "testbb"
  } as Partial<CreateFavoriteTrip> as CreateFavoriteTrip;

  await act(() => addFavoriteTrip(elementToAdd1));

  expect(result.current.favoriteTrips).toHaveLength(1);
  expect(result.current.favoriteTrips[0].destinationId).toBe("testbb");
  expect(result.current.favoriteTrips[0].originId).toBe("testaa");

});
