/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Elemental Reborn', // Title for your website.
  tagline: 'Combine elements.',
  url: 'https://docs.elemental.hparcells.tk', // Your website URL
  baseUrl: '/', // Base URL for your project */

  // Used for publishing and more
  projectName: 'elemental-reborn',
  organizationName: 'hparcells',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'about', label: 'Docs'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'}
  ],
  /* path to images for header/footer */
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#0551af',
    secondaryColor: '#172b54',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Hunter Parcells`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  repoUrl: 'https://github.com/hparcells/elemental-reborn',
};

module.exports = siteConfig;
