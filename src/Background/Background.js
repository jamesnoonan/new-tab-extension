import React from 'react';
import defaultBackground from '../default-background.jpg';
import { useState } from 'react';

/* global chrome */

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: defaultBackground,
    };
  }

  componentDidMount() {
    // Is page running as chrome extension
    if (chrome.hasOwnProperty('storage')) {
      chrome.storage.sync.get(['backgroundImage'], (result) => {
        if (result.hasOwnProperty('backgroundImage')) {
          this.setState({ background: result.backgroundImage });
        }
      });
      // Get the last time image was updated
      chrome.storage.sync.get(['backgroundImageDate'], (result) => {
        const lastUpdated = new Date(result.backgroundImageDate);
        const difference = Math.round(
          new Date().getDate() - lastUpdated.getDate()
        );

        if (difference !== 0) {
          fetch(
            `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS}&orientation=landscape&query=nature&content_filter=high&features`
          )
            .then((response) => response.json())
            .then((data) => {
              // Set new value
              chrome.storage.sync.set({
                backgroundImageDate: new Date().toJSON(),
              });
              // Set new value
              chrome.storage.sync.set({ backgroundImage: data.urls.regular });
              this.setState({ background: data.urls.regular });
            });
        }
      });
    }
  }
  render() {
    return (
      <div
        className="Background"
        style={{ backgroundImage: 'url(' + this.state.background + ')' }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Background;
