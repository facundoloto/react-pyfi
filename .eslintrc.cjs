module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            js: true,
            modules: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    overrides: [
        {
            files: ["*.jsx"],
            // rules: {
            //     "import/no-unused-modules": [
            //         "error",
            //         {
            //             src: ["**/*.jsx"],
            //             missingExports: false,
            //             unusedExports: true
            //         }
            //     ]
            // }
        }],
};
