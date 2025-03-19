import { describe, expect, test } from "vitest";

import { getAllLeafDescendantIds } from "./TreeViewList";

describe("getAllLeafDescendantIds", () => {
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

  // test case for when the input is an empty array
  test("should return an empty array for an empty array input", () => {
    // no input data, so it should return an empty array
    expect([].flatMap(getAllLeafDescendantIds)).toEqual([]);
  });
});
