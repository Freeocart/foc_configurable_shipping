import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders output with name", () => {
  render(<App outputName="test_output_name" />);
  const outputElement = screen.getByTestId(screen, "Test:Output");
  expect(outputElement).toBeInTheDocument();
});
