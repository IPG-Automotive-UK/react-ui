import Breadcrumbs from "./Breadcrumbs";
import { Link } from "@mui/material";
import React from "react";
import { render } from "@testing-library/react";

/**
 * Tests
 */
describe("Breadcrumbs", () => {
  test("displays all children", () => {
    const { container } = render(
      <Breadcrumbs>
        <Link href="">Home</Link>
        <Link href="">Garden</Link>
        <Link href="">Shops</Link>
      </Breadcrumbs>
    );
    const crumbOne = container.querySelector(".MuiBreadcrumbs-root");
    const crumbTwo = container.querySelector(".MuiBreadcrumbs-root");
    const crumbThree = container.querySelector(".MuiBreadcrumbs-root");
    const separators = container.querySelectorAll(".MuiBreadcrumbs-separator");

    expect(crumbOne).toBeInTheDocument();
    expect(crumbTwo).toBeInTheDocument();
    expect(crumbThree).toBeInTheDocument();

    expect(separators).toHaveLength(2);
  });

  test("displays children with separators between ", () => {
    const { container } = render(
      <Breadcrumbs>
        <Link href="">Home</Link>
        <Link href="">Garden</Link>
        <Link href="">Shops</Link>
      </Breadcrumbs>
    );
    const separators = container.querySelectorAll(".MuiBreadcrumbs-separator");

    expect(separators).toHaveLength(2);
  });

  test("displays default links from props and separators", () => {
    const { container } = render(
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", to: "/home" },
          { label: "Garden", to: "/home/garden" },
          { label: "Shops", to: "home/garden/shops" }
        ]}
      />
    );
    const crumbOne = container.querySelector(".MuiBreadcrumbs-root");
    const crumbTwo = container.querySelector(".MuiBreadcrumbs-root");
    const crumbThree = container.querySelector(".MuiBreadcrumbs-root");
    const separators = container.querySelectorAll(".MuiBreadcrumbs-separator");

    expect(crumbOne).toBeInTheDocument();
    expect(crumbTwo).toBeInTheDocument();
    expect(crumbThree).toBeInTheDocument();

    expect(separators).toHaveLength(2);
  });

  test("displays a custom component", () => {
    const { container } = render(
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", to: "/home" },
          { label: "Garden", to: "/home/garden" },
          { label: "Shops", to: "home/garden/shops" }
        ]}
        component="button"
      />
    );
    const buttons = container.getElementsByTagName("button");

    expect(buttons).toHaveLength(3);
  });
});
