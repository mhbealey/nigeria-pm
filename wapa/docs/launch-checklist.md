# Launch Checklist

## Environment
- [ ] All environment variables set in production
- [ ] Database URL points to production Postgres
- [ ] Redis URL points to production Redis
- [ ] Anthropic API key is production-ready
- [ ] Sentry DSN configured

## WhatsApp
- [ ] Webhook URL registered with Meta
- [ ] Webhook verification passing
- [ ] Message templates approved by Meta
- [ ] Phone number verified and registered
- [ ] App reviewed and approved for production

## Infrastructure
- [ ] Database migrated to latest
- [ ] Seed data cleared from production
- [ ] SSL/TLS configured
- [ ] Rate limits tuned for expected traffic
- [ ] Health check endpoint responding

## Monitoring
- [ ] Sentry error tracking active
- [ ] Log aggregation configured
- [ ] Webhook processing latency alerts set
- [ ] Redis memory alerts configured
- [ ] Database connection pool monitored

## Security
- [ ] Webhook signature verification enabled
- [ ] Environment variables secured (not in code)
- [ ] API tokens rotated from development values
- [ ] Rate limiting active
- [ ] CORS configured for production domain

## Backup & Recovery
- [ ] Database backup strategy confirmed
- [ ] Point-in-time recovery tested
- [ ] Rollback procedure documented
- [ ] Incident response plan in place
