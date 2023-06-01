# Food Delivery App

Live preview available here
https://app-delivery-frontend.vercel.app/

## How to run the application
### Before you do anything
Navigatet to ```http://localhost:5173``` and clear your localstorage

### The easy way
1. Navigate to the root folder
2. Run ```docker compose up -d```
3. Wait until database migration and seeding is done
4. Open ```http://localhost:5173``` in browser
### Slightly harder way
1. Host a postgres database with credentials specified in ./backend/index.js yoursel of by running a ```docker compose up postgres -d```
2. Optionaly, navigate to ./migration, rename .env.example to .env and populate it with your database credentials, then copy this file to ./backend
3. Navigate to ./migration and run ```yarn install``` ```yarn migrate``` and ```yarn seed``` consequtively
4. Navigate to ./backend and run ```yarn install``` ```yarn start```
5. Navigate to ./frontend and run ```yarn install``` ```yarn build``` ```yarn start```
6. Open ```http://localhost:5173``` in browser

If you have any issues with project or deplyment contact me at ```@elo8000``` telegram. Have fun!
