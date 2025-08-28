yarn build
pm2 delete pickleball-server
pm2 start build/src/index.js --name "pickleball-server"