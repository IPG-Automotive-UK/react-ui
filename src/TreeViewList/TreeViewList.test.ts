import { describe, expect, test } from "vitest";
import {
  getAllLeafDescendantIds,
  isParentOrSelfDisabled
} from "./TreeViewList";

// sample hierarchical test data representing a tree structure

const sampleData = [
  {
    children: [
      {
        id: "AER.ConsiderationPointPosition",
        name: "ConsiderationPointPosition"
      },
      { id: "AER.DragCoefficient1D", name: "DragCoefficient" },
      { disabled: true, id: "AER.FrontalArea", name: "FrontalArea" },
      { id: "AER.ReferenceLength", name: "ReferenceLength" }
    ],
    id: "AER",
    name: "Aerodynamics"
  },
  {
    children: [
      {
        children: [
          { id: "SUS.Axle.WheelBase", name: "Wheelbase" },
          {
            children: [
              { id: "SUS.Axle.Front.Load", name: "Load" },
              { id: "SUS.Axle.Front.TrackWidth", name: "Track Width" }
            ],
            id: "SUS.Axle.Front",
            name: "Front"
          }
        ],
        id: "SUS.Axle",
        name: "Axle"
      },
      {
        children: [
          {
            children: [
              { id: "SUS.Damper.Front.Damping1D", name: "Damping" },
              { id: "SUS.Damper.Front.Mass", name: "Mass" }
            ],
            id: "SUS.Damper.Front",
            name: "Front"
          },
          {
            children: [
              { id: "SUS.Damper.Rear.Damping1D", name: "Damping" },
              { id: "SUS.Damper.Rear.Mass", name: "Mass" }
            ],
            id: "SUS.Damper.Rear",
            name: "Rear"
          }
        ],
        id: "SUS.Damper",
        name: "Damper"
      }
    ],
    id: "SUS",
    name: "Suspension"
  }
];

describe("getAllLeafDescendantIds", () => {
  // test case to check if all leaf node IDs are correctly returned
  test("should return all leaf node IDs", () => {
    const expectedLeafIds = [
      "AER.ConsiderationPointPosition",
      "AER.DragCoefficient1D",
      "AER.FrontalArea",
      "AER.ReferenceLength",
      "SUS.Axle.WheelBase",
      "SUS.Axle.Front.Load",
      "SUS.Axle.Front.TrackWidth",
      "SUS.Damper.Front.Damping1D",
      "SUS.Damper.Front.Mass",
      "SUS.Damper.Rear.Damping1D",
      "SUS.Damper.Rear.Mass"
    ];

    // extract leaf nodes from the sample data
    const result = sampleData.flatMap(getAllLeafDescendantIds);

    // sorting both arrays to ensure order-independent comparison
    expect(result.sort()).toEqual(expectedLeafIds.sort());
  });

  // test case for when the input node has no children
  test("should return only the node's ID if it has no children", () => {
    const node = { id: "TEST.Node", name: "TestNode" };

    // since the node has no children, it should return its own ID
    expect(getAllLeafDescendantIds(node)).toEqual(["TEST.Node"]);
  });

  // test case for extracting leaf nodes from a root element with children
  test("should return all leaf nodes for a root element with children", () => {
    const node = {
      children: [
        { id: "ROOT.Child1", name: "Child1" },
        {
          children: [{ id: "ROOT.Child2.GrandChild", name: "GrandChild" }],
          id: "ROOT.Child2",
          name: "Child2"
        }
      ],
      id: "ROOT",
      name: "Root"
    };

    // expected leaf nodes: direct child and a grandchild
    const expectedLeafIds = ["ROOT.Child1", "ROOT.Child2.GrandChild"];

    // extract leaf nodes from the given node
    const result = getAllLeafDescendantIds(node);

    // sorting both arrays before comparison to avoid order-related failures
    expect(result.sort()).toEqual(expectedLeafIds.sort());
  });

  // test case for extracting leaf nodes from a child element with multiple children
  test("should return all leaf nodes for a child element with children", () => {
    const node = {
      children: [
        { id: "CHILD.Leaf1", name: "Leaf1" },
        { id: "CHILD.Leaf2", name: "Leaf2" }
      ],
      id: "CHILD",
      name: "Child"
    };

    // expected leaf nodes from this structure
    const expectedLeafIds = ["CHILD.Leaf1", "CHILD.Leaf2"];

    // extract leaf nodes from the given node
    const result = getAllLeafDescendantIds(node);

    // sorting before assertion for consistency
    expect(result.sort()).toEqual(expectedLeafIds.sort());
  });

  // test case to verify that the function returns the node's ID when the node has no children
  test("should return the node's ID when the node has no children", () => {
    // a node object with an empty children array.
    const node = {
      children: [],
      id: "CHILD",
      name: "Child"
    };

    // expect that the function `getAllLeafDescendantIds` will return an array with the node's ID
    // since the node has no children, it is treated as a leaf node itself
    expect(getAllLeafDescendantIds(node)).toEqual(["CHILD"]);
  });
});

// test cases to check if a node or its ancestors are disabled: checks non-disabled node, directly disabled node, node with no disabled ancestors, and non-existent node
describe("isParentOrSelfDisabled", () => {
  // test case to check if the function returns false for an enabled node
  test("should return false for an enabled node", () => {
    expect(
      isParentOrSelfDisabled(sampleData, "AER.ConsiderationPointPosition")
    ).toBe(false);
  });

  // test case to check if the function returns true for a directly disabled node
  test("should return true for a directly disabled node", () => {
    expect(isParentOrSelfDisabled(sampleData, "AER.FrontalArea")).toBe(true);
  });

  // test case to check if the function returns false for a node with no disabled ancestors
  test("should return false for a node with no disabled ancestors", () => {
    expect(isParentOrSelfDisabled(sampleData, "AER.ReferenceLength")).toBe(
      false
    );
  });

  // test case to check if the function handles non-existent nodes and returns false
  test("should return false for a non-existent node", () => {
    expect(isParentOrSelfDisabled(sampleData, "UNKNOWN.Node")).toBe(false);
  });
});
