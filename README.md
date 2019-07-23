#INTWETION developped in 2019
##Personal developpment tool.

## General Information, possible upgrades

#### Routes
The `admin panel` can be accessed through the  `/admin` route.

#### CSS
*   All colors are managed in the file `variable.css`.

#### Work in progress:
* The color picker in the admin panel is not linked to the front but is stored in the database.  
* Login for admin has to be developped in database as in front.


## 1 - API / Database

  The description of the database is in the file `database/infos_bdd.txt`.

  ##Database
  #### Requirements
  Mysql, node, npm(or yarn)
  #### Install
  Creating database :

  In your work environment, install mysql, launch it (`mysql -u 'user' -p`, then type your password), and source the path to the file `2_intwetion.sql`.  ex : `source api/database/2_intwetion.sql;`.
  
  The database is created.

  ##Api
  In the api folder (`api/`):
  Set conf (file`api/conf.js`) with your own sql config (user, password).

  Set the port address you want for the api in `api.js` (`const port = 'what you want';`).

  To start api, in your terminal: `node api.js`


## 2 - REACT APP
   
First install all dependencies with `npm install` in the root of the project!

    #In the project directory, you can run:

  ### `npm start`

  Runs the app in the development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.<br>
  You will also see any lint errors in the console.


  ### `npm run build`

  Builds the app for production to the `build` folder.<br>
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.<br>
  Your app is ready to be deployed!

  See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  ### `npm run eject`

  **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

  You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

  ## Learn More

  You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

  To learn React, check out the [React documentation](https://reactjs.org/).

  ### Code Splitting

  This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

  ### Analyzing the Bundle Size

  This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

  ### Making a Progressive Web App

  This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

  ### Advanced Configuration

  This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

  ### Deployment

  This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

  ### `npm run build` fails to minify

  This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify








 
