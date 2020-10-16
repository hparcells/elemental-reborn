/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('doc1.html')}>
              About
            </a>
            <a href={this.docUrl('doc3.html')}>
              API Documentation
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="https://discord.gg/X9VyN42"
              target="_blank"
              rel="noreferrer noopener"
            >
              Discord
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://elemental.hparcells.tk/">Play</a>
            <a href="https://github.com/hparcells/elemental-reborn">GitHub</a>
            <a href="https://github.com/hparcells/elemental-reborn/issues">Issues</a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
