/* eslint-disable @typescript-eslint/no-unsafe-call */
import { parseArgs } from './inputs';

describe('parseArgs', () => {
  test('should parse as expected', () => {
    const actual = parseArgs(
      // eslint-disable-next-line prettier/prettier
      "--coverage --coverageReporters=json,json-summary",
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(actual).toEqual([
      '--coverage',
      '--coverageReporters=json,json-summary',
    ]);
  });
});
