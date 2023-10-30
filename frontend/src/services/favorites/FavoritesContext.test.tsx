import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PersistenceProvider } from "../persistence/PersistenceContext";
import { CreateFavoriteRoute, CreateFavoriteTrip, FavoriteRoutesProvider, FavoriteTripsProvider, useFavoriteRoutes, useFavoriteTrips } from "./FavoritesContext";

it("FavoriteTripsProvider renders without crashing", () => {
  const { baseElement } = render(<FavoriteTripsProvider />);
  expect(baseElement).toBeDefined();
});

it("FavoriteTripsProvider renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavoriteTripsProvider>
        <div>test</div>
      </FavoriteTripsProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

test("Can use context to add favorite Trips", async () => {
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
    destinationId: "testbb",
    startTime: "2023-09-18T19:29:0"
  } as Partial<CreateFavoriteTrip> as CreateFavoriteTrip;

  await act(() => addFavoriteTrip(elementToAdd1));

  expect(result.current.favoriteTrips).toHaveLength(1);
  expect(result.current.favoriteTrips[0].destinationId).toBe("testbb");
  expect(result.current.favoriteTrips[0].originId).toBe("testaa");

});

it("FavoriteRoutesProvider renders without crashing", () => {
  const { baseElement } = render(<FavoriteRoutesProvider />);
  expect(baseElement).toBeDefined();
});

it("FavoriteRoutesProvider renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <FavoriteRoutesProvider>
        <div>test</div>
      </FavoriteRoutesProvider>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

test("Can use context to add favorite Routes", async () => {
  const { result } = renderHook(() => useFavoriteRoutes(), {
    wrapper: ({ children }) => (
      <PersistenceProvider>
        <FavoriteRoutesProvider>
          {children}
        </FavoriteRoutesProvider>
      </PersistenceProvider>
    )
  });

  const { addFavoriteRoute } = result.current;

  const elementToAdd1 = {
    originId: "testaa",
    destinationId: "testbb"
  } as Partial<CreateFavoriteRoute> as CreateFavoriteRoute;

  await act(() => addFavoriteRoute(elementToAdd1));

  expect(result.current.favoriteRoutes).toHaveLength(1);
  expect(result.current.favoriteRoutes[0].destinationId).toBe("testbb");
  expect(result.current.favoriteRoutes[0].originId).toBe("testaa");

});
