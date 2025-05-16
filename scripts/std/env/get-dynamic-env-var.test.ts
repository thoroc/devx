import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { getDynamicEnvVar } from "./get-dynamic-env-var.ts";

describe("getDynamicEnvVar", () => {
  it("Should transform the envfile content to an array of objects", async () => {
    // Arrange
    const envfileContent = `FOO=baa
USERNAME=admin
PASSWORD=$up3rH4rdP455w0rd`;
    const expected = [
      { name: "FOO", value: "baa" },
      { name: "USERNAME", value: "admin" },
      { name: "PASSWORD", value: "$up3rH4rdP455w0rd" },
    ];

    // Act
    const actual = await getDynamicEnvVar(envfileContent);

    // Assert
    assertEquals(actual, expected);
  });

  it("Should ignore comments", async () => {
    // Arrange
    const envfileContent = `FOO=baa
# Comment 1
USERNAME=admin
# Comment 2
PASSWORD=$up3rH4rdP455w0rd`;
    const expected = [
      { name: "FOO", value: "baa" },
      { name: "USERNAME", value: "admin" },
      { name: "PASSWORD", value: "$up3rH4rdP455w0rd" },
    ];

    // Act
    const actual = await getDynamicEnvVar(envfileContent);

    // Assert
    assertEquals(actual, expected);
  });
});
