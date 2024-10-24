# Presentation
This notebook is a small react server/client representaiton for a **ToDo-List application** using a `MySQL, NodeJs`.

# Install
## Server:
1- The server is based on NodeJs, so you need to install it before.
```PowerShell
# installs fnm (Fast Node Manager)
winget install Schniz.fnm

# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.18.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```
2- Install the required Frameworks:
```
npm install express cors deamon mysql
```
## Client:
The fronted was designed using `React` provided by `Vite`.
```
npm create vite@latest
```

