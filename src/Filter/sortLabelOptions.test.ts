import { describe, expect, it } from "vitest";

import { Label } from "../LabelSelector/Label.types";
import { sortLabelOptions } from "./sortLabelOptions";

describe("sortLabelOptions", () => {
  // sort labels alphabetically with lowercase names
  it("sorts labels alphabetically with lowercase names", () => {
    const options: Label[] = [
      { _id: "1", color: "#005FA8", description: "Label B", name: "b" },
      { _id: "2", color: "#F542E0", description: "Label A", name: "a" },
      { _id: "3", color: "#FFA500", description: "Label C", name: "c" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual(["a", "b", "c"]);
  });

  // sort labels alphabetically with uppercase names
  it("sorts labels alphabetically with uppercase names", () => {
    const options: Label[] = [
      { _id: "1", color: "#005FA8", description: "Label B", name: "B" },
      { _id: "2", color: "#F542E0", description: "Label A", name: "A" },
      { _id: "3", color: "#FFA500", description: "Label C", name: "C" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual(["A", "B", "C"]);
  });

  // sort labels alphabetically with mixed case names
  it("sorts labels alphabetically with mixed case names", () => {
    const options: Label[] = [
      { _id: "1", color: "#005FA8", description: "Label b", name: "b" },
      { _id: "2", color: "#F542E0", description: "Label A", name: "A" },
      { _id: "3", color: "#FFA500", description: "Label C", name: "C" },
      { _id: "4", color: "#087A23", description: "Label B", name: "B" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "A",
      "b",
      "B",
      "C"
    ]);
  });

  // sort labels with numeric names
  it("sorts labels with numeric names", () => {
    const options: Label[] = [
      { _id: "1", color: "#005FA8", description: "Label 2", name: "2" },
      { _id: "2", color: "#F542E0", description: "Label 1", name: "1" },
      { _id: "3", color: "#FFA500", description: "Label 10", name: "10" },
      { _id: "4", color: "#087A23", description: "Label 3", name: "3" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "1",
      "2",
      "3",
      "10"
    ]);
  });

  // sort labels with special character names
  it("sorts labels with special character names", () => {
    const options: Label[] = [
      { _id: "1", color: "#005FA8", description: "Label @", name: "@" },
      { _id: "2", color: "#F542E0", description: "Label !", name: "!" },
      { _id: "3", color: "#FFA500", description: "Label #", name: "#" },
      { _id: "4", color: "#087A23", description: "Label $", name: "$" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "!",
      "@",
      "#",
      "$"
    ]);
  });

  // returns an empty array when no labels are provided
  it("returns an empty array when no labels are provided", () => {
    const options: Label[] = [];
    expect(sortLabelOptions(options)).toEqual([]);
  });

  // sort labels with alphanumeric names
  it("sorts labels with alphanumeric names", () => {
    const options: Label[] = [
      {
        _id: "1",
        color: "#005FA8",
        description: "Label Gate 10",
        name: "Gate 10"
      },
      {
        _id: "2",
        color: "#F542E0",
        description: "Label Gate 4",
        name: "Gate 4"
      },
      {
        _id: "3",
        color: "#FFA500",
        description: "Label Gate 5",
        name: "Gate 5"
      },
      {
        _id: "4",
        color: "#087A23",
        description: "Label Gate 1",
        name: "Gate 1"
      }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "Gate 1",
      "Gate 4",
      "Gate 5",
      "Gate 10"
    ]);
  });

  // sort semantic versioning labels
  it("sorts semantic versioning labels", () => {
    const options: Label[] = [
      {
        _id: "1",
        color: "#005FA8",
        description: "Label 11.0.0",
        name: "11.0.0"
      },
      {
        _id: "2",
        color: "#F542E0",
        description: "Label 10.0.0",
        name: "10.0.0"
      },
      {
        _id: "3",
        color: "#FFA500",
        description: "Label 100.0.0",
        name: "100.0.0"
      },
      { _id: "4", color: "#087A23", description: "Label 1.0.0", name: "1.0.0" },
      { _id: "5", color: "#087A23", description: "Label 1.0.1", name: "1.0.1" },
      {
        _id: "6",
        color: "#087A23",
        description: "Label 1.0.10",
        name: "1.0.10"
      },
      { _id: "7", color: "#087A23", description: "Label 1.0.2", name: "1.0.2" },
      { _id: "8", color: "#087A23", description: "Label 1.1.0", name: "1.1.0" }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "1.0.0",
      "1.0.1",
      "1.0.2",
      "1.0.10",
      "1.1.0",
      "10.0.0",
      "11.0.0",
      "100.0.0"
    ]);
  });

  // sort labels with all types of characters
  it("sorts labels with all types of characters", () => {
    const options: Label[] = [
      {
        _id: "1",
        color: "#01b207",
        description: "description for !",
        name: "!"
      },
      {
        _id: "2",
        color: "#03640e",
        description: "description for 2",
        name: "2"
      },
      {
        _id: "3",
        color: "#051615",
        description: "description for 1",
        name: "1"
      },
      {
        _id: "4",
        color: "#06c81c",
        description: "description for 10",
        name: "10"
      },
      {
        _id: "5",
        color: "#087a23",
        description: "description for Gate 10",
        name: "Gate 10"
      },
      {
        _id: "6",
        color: "#0a2c2a",
        description: "description for Gate 4",
        name: "Gate 4"
      },
      {
        _id: "7",
        color: "#0bde31",
        description: "description for Gate 5",
        name: "Gate 5"
      },
      {
        _id: "8",
        color: "#0d9038",
        description: "description for @",
        name: "@"
      },
      {
        _id: "9",
        color: "#0f423f",
        description: "description for 3",
        name: "3"
      },
      {
        _id: "10",
        color: "#10f446",
        description: "description for b",
        name: "b"
      },
      {
        _id: "11",
        color: "#12a64d",
        description: "description for A",
        name: "A"
      },
      {
        _id: "12",
        color: "#145854",
        description: "description for C",
        name: "C"
      },
      {
        _id: "13",
        color: "#160a5b",
        description: "description for B",
        name: "B"
      },
      {
        _id: "14",
        color: "#17bc62",
        description: "description for Gate 1",
        name: "Gate 1"
      }
    ];
    expect(sortLabelOptions(options).map(o => o.name)).toEqual([
      "!",
      "@",
      "1",
      "2",
      "3",
      "10",
      "A",
      "b",
      "B",
      "C",
      "Gate 1",
      "Gate 4",
      "Gate 5",
      "Gate 10"
    ]);
  });
});
