import page from 'page';
import React from 'react';
import ReactDOM from 'react-dom';

const container = document.getElementById('app-container');

import Shift from './components/shift';
import Vig from './components/vigenere';

function navigate(reactApp) {

  ReactDOM.unmountComponentAtNode(container);
  ReactDOM.render(
    (
      <div id="app-main">
        <div className="navbar navbar-default">

          <div className="navbar-header">
            <a className="navbar-brand" href="/">Decryptonomicon</a>
          </div>
          <ul className="nav navbar-nav">
              <li><a href="#!/shift">Shift</a></li>
              <li><a href="#!/vig">Vigenere</a></li>
          </ul>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 main">
            {reactApp}
            </div>
          </div>
        </div>
      </div>
    ),
    container);
}

page.base('/#!');

page('/shift', () => {
  navigate(<Shift />);
});

page('/vig', () => {
  navigate(<Vig />);
});

page('/', () => {
  navigate(<div> hello </div>);
});

page.start({
  hashbang: true
});
