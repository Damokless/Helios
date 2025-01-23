import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            "indent": [
                "error",
                4
            ],
            "max-len": [
                "error",
                {
                    "code": 120,
                    "ignoreStrings": true,
                    "ignoreUrls": true,
                    "ignoreRegExpLiterals": true
                }
            ],
            "semi": [
                "error",
                "never",
                { "beforeStatementContinuationChars": "never" }
            ],
            "no-extra-semi": "error",
            "comma-dangle": "error",
            "quotes": [
                "error",
                "single"
            ],
            "quote-props": [
                "error",
                "as-needed",
                { "keywords": true }
            ],
            "jsx-quotes": [
                "warn",
                "prefer-single"
            ],
            "arrow-parens": [
                "warn",
                "always"
            ],
            "key-spacing": [
                "error",
                {
                    "multiLine": {
                        "beforeColon": false,
                        "afterColon": true
                    },
                    "align": {
                        "beforeColon": false,
                        "afterColon": true,
                        "on": "colon"
                    }
                }
            ],
            "brace-style": [
                "error",
                "stroustrup"
            ],
            "padding-line-between-statements": [
                "error",
                {
                    "blankLine": "always",
                    "prev": "*",
                    "next": "*"
                },
                {
                    "blankLine": "never",
                    "prev": "import",
                    "next": "import"
                }
            ],
            "one-var-declaration-per-line": [
                "error",
                "always"
            ],
            "prefer-const": "error",
            "no-trailing-spaces": "error",
            "no-await-in-loop": "error",
            "no-multi-assign": "error",
            "no-multi-spaces": [
                "error",
                {
                    "exceptions": {
                        "TSPropertySignature": true,
                        "Property": true
                    }
                }
            ],
            "no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxBOF": 0,
                    "maxEOF": 1
                }
            ],
            "no-implicit-coercion": "error",

            // Object rules
            "object-curly-newline": [
                "error",
                {
                    "ImportDeclaration": { "consistent": true },
                    "ObjectPattern": { "consistent": true },
                    "ObjectExpression": {
                        "multiline": true,
                        "minProperties": 2
                    }
                }
            ],
            "object-curly-spacing": [
                "error",
                "always"
            ],
            "object-property-newline": [
                "error",
                { "allowAllPropertiesOnSameLine": false }
            ],

            // Array rules
            "array-bracket-newline": [
                "error",
                {
                    "multiline": true,
                    "minItems": null
                }
            ],
            "array-bracket-spacing": [
                "error",
                "never"
            ],
            "array-element-newline": [
                "error",
                {
                    "ArrayExpression": {
                        "multiline": true,
                        "minItems": 2
                    },
                    "ArrayPattern": "consistent"
                }
            ]
        },
    },
)
