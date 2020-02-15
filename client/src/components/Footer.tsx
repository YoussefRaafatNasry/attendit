import React, { Component } from "react";

interface IState {
  authorUsername: string;
}

export class Footer extends Component<{}, IState> {
  public state: IState = {
    authorUsername: "YoussefRaafatNasry"
  };

  render() {
    const { authorUsername } = this.state;
    return (
      <footer className="footer">
        <p className="footer__content">
          {"</> with ❤️ by "}
          <a
            className="footer__link"
            href={`https://github.com/${authorUsername}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            @{authorUsername}
          </a>
        </p>
        <p className="footer__extra">
          This project is just a demo to learn full stack development
        </p>
      </footer>
    );
  }
}
