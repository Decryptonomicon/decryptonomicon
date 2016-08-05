import page from 'page';
import React from 'react';
import ReactDOM from 'react-dom';

const container = document.getElementById('app-container');

import Shift from './components/shift';

function navigate(reactApp) {

  ReactDOM.unmountComponentAtNode(container);
  ReactDOM.render(
    (
      <div id="app-main">
        <div className="navbar navbar-default">
          <div className="navbar-header">
            <a className="navbar-brand" to="home">Decryptonomicon</a>
          </div>
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


page('/', () => {
  navigate(<Shift />);
});

page.start({
  hashbang: true
});
