module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins":["prettier", "@typescript-eslint"],
    "rules": {
      "camelcase": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
            "format": ["PascalCase"],
            "custom": {
            "regex": "^I[A-Z]",
            "match": true
            }
        }
      ],
      "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "no-shadow": "off",
        "no-console": "off",
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        "lines-between-class-members": "off",
        "import/extensions": [
        "error",
        "ignorePackages",
        {
            "ts": "never"
        }
        ],
        "import-helpers/order-imports": [
        "warn",
        {
            "newlinesBetween": "always",
            "groups": ["module", "/^@shared/", ["parent", "sibling", "index"]],
            "alphabetize": { "order": "asc", "ignoreCase": true }
        }
        ],
        "import/no-extraneous-dependencies": [
        "error",
        { "devDependencies": ["**/*.spec.js"] }
        ],
        "prettier/prettier": "error"
    },
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
    }
}

    