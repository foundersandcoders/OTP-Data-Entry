# OTP Data Entry
Application to allow users to enter data into the Nazareth Open Tourism Platform database

Find the link for the Data Entry website
 [here](https://data-entry-fac.herokuapp.com/)
### Endpoints
  + `/:lang/places`

### Local Installation Guide

+ `git clone https://github.com/foundersandcoders/OTP-Data-Entry.git`
<br>

+ `npm i`
<br>

+ `npm run dev`

### File Structure
```
public/
    reset.css
    style.css
src/
    constants/
        urls.json
    controllers
        home.js
        places.js
        router.js
    app.js
    start.js
    text.js
    views/
        layouts/
            main.hbs
        home.hbs
        places.hbs
```
