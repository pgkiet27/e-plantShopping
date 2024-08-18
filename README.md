<h1> This is a project from my React course.</h1> 

- Everything is done using React without Redux. 
- Features like adding products to the cart, increasing/decreasing product quantity, calculating the total price, removing products and so on are all fully implemented. 
- However, I'm unable to handle the functionality of the 'Continue Shopping' button.

<h3>Create vite project</h3>

- <code>npm create vite@latest</code>
- <code>npm install</code>
- Start the project: <code>npm run dev</code>

<h3>Deploy project to Github</h3>

- Step 1: <code>npm install gh-pages --save-dev</code>
- Step 2: In file <code>pagkage.json</code>, add two more lines in "script"
    - "predeploy": "npm run build",
    - "deploy": "gh-pages -d dist"
- Step 3: In the <code>vite.config.js</code>, add this line before <code>plugins: [react()],</code>
    - <code>base: "/YOUR_REPOSITORY_NAME",</code>
- Step 4: <code>npm run deploy</code>

Note: To update your app deployment, just run the npm run deploy command again.