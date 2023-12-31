## Differences to using Webpack

1. Substantially faster at reloading pages, but loading on port 5173 (http://localhost:5173/)
2. Assets can be added straight to the html elements... ie. the "src" property works
   - Don't forget that "./" means to get the asset from the current folder and "../" means to get the asset from a folder up
3. Javascript has to be added to the html using the `<script>` tag, as this is no longer done using the bundler
   - This was the way the script was loaded before we used webpack
4. Each page (html) should be in its own folder, and the `vite.config.js` needs to have an extra line to include it
   - Note: The html file in the folder is called `index.html` in the folder. The path to access the page is `/(foldername)/index.html`.
   - There is already an example in this template (See the `about` folder and the href is `/about/`)
   - It is a LOT easier to create new pages with this configuration, as you can copy-paste the folder, rename a few things and add one line to the `vite.config.js`
5. DaisyUI (https://daisyui.com/) has been installed and configured, but the theme is disabled
   - Enable / Edit the theme in the `tailwind.config.js` file.
   - There is an example theme there already, which you could modify the colours to suit your app (https://daisyui.com/theme-generator/)
   - With the theme disabled, just use tailwind as you normally would

## Similarities to using Webpack

1. CSS (including tailwind) are still loaded via javascript, so ensure it is at the top of your .js file
2. Folder structure has been set up to allow all code to reside in the "src" folder
3. Running a dev server still uses the command `npm run dev`
#   h a b l i t s  
 