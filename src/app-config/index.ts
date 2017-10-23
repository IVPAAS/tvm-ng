export const environment = {
  production: false,
  partnerTempConfig:
  {
    "198": {
      vodMediaTypeIds: [
        { id: 420, label: "Movie" },
        { id: 421, label: "Episode" },
        { id: 422, label: "Linear" },
        { id: 423, label: "Series" },
        { id: 424, label: "Package" }
      ]
    },
    "203": {
      vodMediaTypeIds: [
        { id: 425, label: "Movie" },
        { id: 426, label: "Episode" },
        { id: 427, label: "Linear" },
        { id: 534, label: "Series" },
        { id: 535, label: "Package" }
      ]
    }
  },
  "shell": {
    "defaultRoute": "/settings/metadataTemplates",
    "languageHash": "12", /* this value is set manually at the moment and should be replaced with the published app version  */
    "loginRoute": "/login",
    "errorRoute": "/error",
    "browser": {
      "storageNamespace": "tvm-ng"
    }
  },
  "core": {
    "kaltura": {
      //"apiUrl": "http://34.249.122.223:8080/v4_4/api_v3",
      "apiUrl": "http://34.249.122.223:8080/NEW_TVM/api_v3"
    },
    "menuConfig": [
      {
        "routePath": "dashboard",
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
            "routePath": "content/assets",
            "titleToken": "VOD",
            "enabled": true,
            "position": "left",
            "icon": "kIconbulk"
          },
          {
            "routePath": "content/collection",
            "titleToken": "Collection",
            "enabled": false,
            "position": "left",
            "icon": "kIconbulk"
          }
        ]
      },
      {
        "routePath": "audience",
        "titleToken": "Audience",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "offerings",
        "titleToken": "Offerings",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "rules",
        "titleToken": "Rules",
        "showSubMenu": false,
        "enabled": false
      }, {
        "routePath": "insights",
        "titleToken": "Insights",
        "showSubMenu": false,
        "enabled": false
      },
      {
        "routePath": "settings",
        "titleToken": "",
        "showSubMenu": true,
        "enabled": true,
        "children": [
          {
            "routePath": "settings/metadataTemplates",
            "titleToken": "MetadataTemplates",
            "enabled": true,
            "icon": "kIconbulk"
          }
        ]
      }
    ],
    "diagnostic": {
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