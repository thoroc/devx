import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { resolvesNext, stub } from "jsr:@std/testing/mock";
import { getDefaultEnvVars } from "./get-defaut-env-vars.ts";

describe("getDefaultEnvVars", () => {
  it("Should read the default env variables for default envfile=.env.dist", async () => {
    // Arrange
    const readTextFileMock = stub(
      Deno,
      "readTextFile",
      resolvesNext([
        `FOO=baa
USERNAME=admin
PASSWORD=$up3rH4rdP455w0rd`,
      ]),
    );
    const expected = {
      "FOO": "baa",
      "USERNAME": "admin",
      "PASSWORD": "$up3rH4rdP455w0rd",
    };

    // Act
    const actual = await getDefaultEnvVars();
    // Assert

    try {
      assertEquals(actual, expected);
    } finally {
      readTextFileMock.restore();
    }
  });

  it("Should ignore comments", async () => {
    // Arrange
    const readTextFileMock = stub(
      Deno,
      "readTextFile",
      resolvesNext([
        `FOO=baa
# Comment 1
USERNAME=admin
# Comment 2
PASSWORD=$up3rH4rdP455w0rd`,
      ]),
    );
    const expected = {
      "FOO": "baa",
      "USERNAME": "admin",
      "PASSWORD": "$up3rH4rdP455w0rd",
    };

    // Act
    const actual = await getDefaultEnvVars();

    // Assert
    try {
      assertEquals(actual, expected);
    } finally {
      readTextFileMock.restore();
    }
  });
});
