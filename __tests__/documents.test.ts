import { describe, it, expect } from "vitest";
import { plainTextToHtml } from "../lib/documents";

describe("plainTextToHtml", () => {
  it("converts plain text to HTML paragraphs", () => {
    const input = "Today meeting notes\n\nSecond paragraph";
    const result = plainTextToHtml(input);

    expect(result).toBe(
      "<p>Today meeting notes</p><p>Second paragraph</p>"
    );
  });

  it("escapes HTML characters", () => {
    const input = "<script>alert('xss')</script>";
    const result = plainTextToHtml(input);

    expect(result).toBe(
      "<p>&lt;script&gt;alert('xss')&lt;/script&gt;</p>"
    );
  });

  it("preserves single line breaks within paragraphs", () => {
    const input = "Line one\nLine two";
    const result = plainTextToHtml(input);

    expect(result).toBe("<p>Line one<br>Line two</p>");
  });
});
