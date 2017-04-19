import { TestFixture, TestCase, Expect } from "alsatian";

import getSigned32BitInt from "./index";

const MIN_32_BIT = -2147483648;
const MAX_32_BIT = 2147483647;

@TestFixture()
export class GetSigned32BitIntTests {

  @TestCase(5.003, 5)
  @TestCase(100.192, 100)
  @TestCase(128412.12938, 128412)
  public shouldRoundFloatDown(input: number, expectedOutput: number) {
    const output = getSigned32BitInt(input);

    Expect(output).toBe(expectedOutput);
  }

  @TestCase(100)
  @TestCase(300)
  @TestCase(435345)
  @TestCase(14873874)
  @TestCase(MAX_32_BIT)
  public shouldWrapCorrectlyWhenAboveMax(numberToAdd: number) {
    const expectedOutput = MIN_32_BIT - 1 + numberToAdd;
    const input = MAX_32_BIT + numberToAdd;

    const output = getSigned32BitInt(input);

    Expect(output).toBe(expectedOutput);
  }

  @TestCase(100)
  @TestCase(300)
  @TestCase(435345)
  @TestCase(14873874)
  @TestCase(MAX_32_BIT)
  public shouldWrapCorrectlyWhenBelowMin(numberToSubtract: number) {
    const expectedOutput = MAX_32_BIT + 1 - numberToSubtract;
    const input = MIN_32_BIT - numberToSubtract;

    const output = getSigned32BitInt(input);

    Expect(output).toBe(expectedOutput);
  }

}
