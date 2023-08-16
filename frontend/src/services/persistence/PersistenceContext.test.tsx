import { render } from "@testing-library/react";
import { PersistenceContext, PersistenceProvider } from "./PersistenceContext";
import React from "react";

test("renders without crashing", () => {
  const { baseElement } = render(<PersistenceProvider />);
  expect(baseElement).toBeDefined();
});

test("renders children", () => {
  const { baseElement } = render(
    <PersistenceProvider>
      <div>test</div>
    </PersistenceProvider>
  );
  expect(baseElement).toBeDefined();
});

test("Can use context to set and get data", () => {
  const Test = () => {
    const persistence = React.useContext(PersistenceContext);
    persistence.set("comp_test", "Hello world");

    const value = persistence.get("comp_test");
    expect(value).toBe("Hello world");

    return <div>{value}</div>;
  };

  const { baseElement } = render(
    <PersistenceProvider>
      <Test />
    </PersistenceProvider>
  );

  expect(baseElement).toBeDefined();
  expect(baseElement.innerHTML).toContain("Hello world");
});
