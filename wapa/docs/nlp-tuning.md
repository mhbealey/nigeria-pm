# NLP Tuning Guide

## How Intent Classification Works
WAPA uses Claude 3.5 Haiku for single-pass intent + entity extraction. The system prompt is in `src/nlp/prompts/classify-intent.ts`.

## Adding a New Intent

1. Add the intent to `src/nlp/types.ts` → `Intent` enum
2. Add examples to `src/nlp/prompts/classify-intent.ts`
3. Add regex fallback in `src/nlp/fallback-parser.ts`
4. Create command handler in `src/commands/`
5. Register handler in `src/commands/router.ts`
6. Add tests in `tests/unit/nlp/`

## Adjusting Confidence Thresholds
Edit `src/nlp/types.ts`:
- `CONFIDENCE.HIGH` (default 0.85): Execute directly
- `CONFIDENCE.MEDIUM` (default 0.60): Execute with confirmation
- Below MEDIUM: Fallback/clarify

## Testing NLP Changes
```bash
npm test -- tests/unit/nlp/
```

## Prompt Tips
- Keep few-shot examples diverse
- Include edge cases (typos, slang, abbreviated input)
- Test with real WhatsApp message patterns
- Monitor confidence distribution in logs
