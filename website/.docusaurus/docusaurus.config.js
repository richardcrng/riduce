export default {
  "title": "Riduce",
  "tagline": "Get rid of your reducer boilerplate!",
  "url": "https://riduce.netlify.com",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "favicon": "img/favicon.ico",
  "organizationName": "richardcrng",
  "projectName": "riduce",
  "themeConfig": {
    "navbar": {
      "title": "Riduce",
      "logo": {
        "alt": "My Site Logo",
        "src": "img/logo.svg"
      },
      "items": [
        {
          "to": "docs/intro/overview",
          "activeBasePath": "docs",
          "label": "Overview",
          "position": "left"
        },
        {
          "href": "https://github.com/richardcrng/riduce",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "copyright": "Copyright © 2020 Richard Ng"
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "metadatas": []
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/richard/Development/repos/personal/riduce/website/sidebars.js",
          "editUrl": "https://github.com/richardcrng/riduce/edit/master/website/"
        },
        "theme": {
          "customCss": "/Users/richard/Development/repos/personal/riduce/website/src/css/custom.css"
        }
      }
    ]
  ],
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": []
};