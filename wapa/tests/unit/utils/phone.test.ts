import { describe, it, expect } from 'vitest';
import { normalizePhone, maskPhone, extractCountryCode } from '../../../src/utils/phone.js';

describe('Phone Utils', () => {
  describe('normalizePhone', () => {
    it('adds + prefix', () => {
      expect(normalizePhone('2348012345678')).toBe('+2348012345678');
    });
    it('handles 00 prefix', () => {
      expect(normalizePhone('002348012345678')).toBe('+2348012345678');
    });
    it('strips spaces and dashes', () => {
      expect(normalizePhone('+234 801-234-5678')).toBe('+2348012345678');
    });
    it('keeps existing + prefix', () => {
      expect(normalizePhone('+2348012345678')).toBe('+2348012345678');
    });
  });
  describe('maskPhone', () => {
    it('masks the middle of a phone number', () => {
      const masked = maskPhone('+2348012345678');
      expect(masked).toContain('****');
    });
  });
  describe('extractCountryCode', () => {
    it('extracts country code', () => {
      expect(extractCountryCode('+2348012345678')).toBeTruthy();
    });
  });
});
