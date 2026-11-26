import { describe, expect, it } from "vitest";

import { currentBoard, pastBoard } from "@/content/pages";

// The board is the chapter's own record of who holds which seat. If a name or role
// changes here, the About page changes with it — so the pair is asserted, not the count.
describe("Current board", () => {
  const expected: Record<string, string> = {
    "Mohamed Baccouche": "Chair",
    "Yasmin Loukil": "Vice Chair — Technical Activities",
    "Tasnim Daly": "Vice Chair — Membership Activities",
    "Senda Derouiche": "General Secretary",
    "Fatma Messai": "Treasurer",
    "Loua Klai": "Logistics Manager",
    "Belkis Ghedir": "Media Manager",
  };

  it("lists every member with the role the chapter supplied", () => {
    const roles = Object.fromEntries(currentBoard.members.map((m) => [m.name, m.role]));
    expect(roles).toEqual(expected);
  });

  it("keeps the previous website's board separate from the current one", () => {
    expect(pastBoard.mandate).toBe("2021–2022");
    expect(currentBoard.members.map((m) => m.name)).not.toContain("Mohamed Taher Bazzazi");
  });
});
