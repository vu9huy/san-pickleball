yarn build
pm2 delete pickleball-client
pm2 start pm2-config-ecosystem.config.cjs