import {describe, test, expect} from 'vitest';
import { add } from './App';

describe('add function', () => {
    test('adds two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
    });
});