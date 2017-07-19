// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  partnerTempConfig :
    {
      "198" : {
        vodMediaTypeIds: [
          {id: 420, label: "Movie"},
          {id: 421, label: "Episode"},
          {id: 422, label: "Linear"},
          {id: 423, label: "Series"},
          {id: 424, label: "Package"}
        ]
      },
      "203": {
        vodMediaTypeIds: [
          {id: 425, label: "Movie"},
          {id: 426, label: "Episode"},
          {id: 427, label: "Linear"},
          {id: 534, label: "Series"},
          {id: 535, label: "Package"}
        ]
      }
    },
  "shell": {
    "defaultRoute": "/content/assets",
    "browser": {
      "storageNamespace": "tvm-ng"
    }
  },
  "core": {
    "kaltura": {
      "apiUrl" : "http://34.249.122.223:8080/v4_4/api_v3",
    },
    "menuConfig": [
      {
        "routePath": "1",
        "titleToken": "Dashboard",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "content",
        "titleToken": "Content",
        "showSubMenu": true,
        "enabled": true,
        "children": [
          {
            "routePath": "content/vod",
            "titleToken": "VOD",
            "enabled": true
          },
          {
            "routePath": "1",
            "titleToken": "Live",
            "enabled": false
          },
          {
            "routePath": "1",
            "titleToken": "Collection",
            "enabled": false
          },
          {
            "routePath": "1",
            "titleToken": "Moderation",
            "enabled": false
          },
          {
            "routePath": "1",
            "titleToken": "Tags",
            "enabled": false
          }
        ]
      },
      {
        "routePath": "1",
        "titleToken": "Audience",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "1",
        "titleToken": "Offerings",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "1",
        "titleToken": "Distribution",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "1",
        "titleToken": "Rules",
        "showSubMenu": false,
        "enabled": false
      },{
        "routePath": "1",
        "titleToken": "Insights",
        "showSubMenu": false,
        "enabled": false
      }
    ],
    "diagnostic" : {
      "debugging": true
    },
    "externalLinks": {
    },
    "locales": [
      {
        "id": "en",
        "label": "English",
        "source": "i18n/en.json"
      },
      {
        "id": "de",
        "label": "Deutsch",
        "source": "i18n/de.json"
      },
      {
        "id": "es",
        "label": "Español",
        "source": "i18n/es.json"
      },
      {
        "id": "fr",
        "label": "Français",
        "source": "i18n/fr.json"
      },
      {
        "id": "ja",
        "label": "日本語",
        "source": "i18n/ja.json"
      }
    ]
  }
}
