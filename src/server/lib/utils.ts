import { nanoid } from "nanoid";

const STATE_SIZE = 16;

/**
 * Generate a random state string.
 * @returns {string} A random state string.
 */
export function generateState() {
  return nanoid(STATE_SIZE);
}
