module.exports = {
    extends: ['airbnb', 'prettier'],
    plugins: [
        'flowtype',
        'import',
        'jsx-a11y',
        'prettier',
        'react',
        'react-hooks',
    ],
    env: {
        browser: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: true,
    },
    rules: {
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
            },
        ],
        'no-console': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }], // should add ".ts" if typescript project
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-unescaped-entities': 'off',
        'react/jsx-curly-brace-presence': [
            'error',
            { props: 'never', children: 'never' },
        ],

        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
            },
        ],
        'prettier/prettier': [
            'warn',
            { singleQuote: true, endOfLine: 'auto', tabWidth: 4 },
        ],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
};
