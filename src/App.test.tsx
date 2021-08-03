import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { title: "First post", body: "Body of a first post", userId: 1 },
        { title: "Second post", body: "Body of a second post", userId: 2 }
      ])
    );
  })
);

describe("App", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders list of posts", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId("post")).toHaveLength(2);
    });

    expect(
      screen.getByRole("heading", { name: "First post" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Second post" })
    ).toBeInTheDocument();
  });

  it("doesn't crash when there are no posts", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/posts", (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([])
        );
      })
    )
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId("post")).not.toBeInTheDocument();
    });
  });

  it("renders received error message when 404 occurs", async () => {
    const errorMsg = "We couldn't find requested post"
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/posts", (_, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({error: errorMsg})
        );
      })
    )

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(errorMsg, {exact: false})).toBeInTheDocument()
    })
    expect(screen.queryByTestId("post")).not.toBeInTheDocument();
  });

  it("renders generic error when there is a network outage", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/posts", (_, res, ctx) => {
        return res.networkError("")
      })
    )

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Generic error", {exact: false})).toBeInTheDocument()
    })
    expect(screen.queryByTestId("post")).not.toBeInTheDocument();
  });
});
