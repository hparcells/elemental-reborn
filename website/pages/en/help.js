/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site.](${docUrl(
        'about.html',
      )})`,
      title: 'Browse Docs',
    },
    {
      content: 'Join the discord Server at [https://discord.gg/X9VyN42](https://discord.gg/X9VyN42).',
      title: 'Join the community',
    },
    {
      content: "This project's source code is available at [https://github.com/hparcells/elemental-reborn](https://github.com/hparcells/elemental-reborn) along with its issue board.",
      title: 'Check out the GitHub Repository',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>

            <p>You can reach out to me by messaging me on Discord @MythicHunter758#1973 or shooting me an email at <a href='mailto:hunterparcells@gmail.com'>hunterparcells@gmail.com</a>.</p>
          </header>

          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
