require("dotenv").config();
console.log('TITLE: >> ', process.env.TITLE);
module.exports = {
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET, // add exactly this
    editorTheme: {
        page: {
            title: process.env.TITLE = 'Edge Rules',
            favicon: __dirname + "//images//watson-logo.png", //can use '__dirname + "\\img\\favicon.png" (\\ on Windows)'
            // css: "/absolute/path/to/custom/css/file",
            // scripts: "/absolute/path/to/custom/js/file"  // As of 0.17
        },
        header: {
            title: process.env.TITLE = 'Edge Rules',
            image: __dirname + "//images//watson-logo.png", // or null to remove image
            // url: "http://nodered.org" // optional url to make the header text/image a link to this url
        },
        
        // deployButton: {
        //     type:"simple",
        //     label:"Save",
        //     icon: "/absolute/path/to/deploy/button/image" // or null to remove image
        // },
        
        // menu: { // Hide unwanted menu items by id. see editor/js/main.js:loadEditor for complete list
        //     "menu-item-import-library": false,
        //     "menu-item-export-library": false,
        //     "menu-item-keyboard-shortcuts": false,
        //     "menu-item-help": {
        //         label: "Alternative Help Link Text",
        //         url: "http://example.com"
        //     }
        // },
        
        userMenu: true, // Hide the user-menu even if adminAuth is enabled
        
        // login: {
        //     image: "/absolute/path/to/login/page/big/image" // a 256x256 image
        // },
    
        // logout: {
        //     redirect: "http://example.com" // As of 0.17
        // },
    
        palette: {
            editable: true, // Enable/disable the Palette Manager
            catalogues: [   // Alternative palette manager catalogues
                'https://catalogue.nodered.org/catalogue.json'
            ],
            // theme: [ // Override node colours - rules test against category/type by RegExp.
            //     { category: ".*", type: ".*", color: "#f0f" }
            // ]
        },

        functionGlobalContext: {
            env: process.env
        },
    
        projects: {
            enabled: false // Enable the projects feature 
        } 
    }
}