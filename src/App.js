// component to act as main page the routes to all other needed components

import React, {Component} from 'react';
import Header from './components/Header';
import {Route, Switch} from 'react-router-dom';
import Error from './components/Error';
import List from './components/List';
import Issue from './components/Issue';


class App extends Component {
  constructor(){
    super();
    this.state = {
      content: []
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/repos/walmartlabs/thorax/issues')
      .then(response => response.json())
      .then(content => this.setState({content}))
      .catch(err => {
        console.log('Error:', err);
      });
  }

  render(){
    return (
      <div className="App">

        {/* header for each page */}
        <Header />

        <main>
          {/* router for each necessary page */}
          <Switch>
            <Route exact path="/" component={(props) => <List {...props} content={this.state.content} />}/>

            <Route path="/issue/:num" component={Issue} />

            {/* handles erroneous url  */}
            <Route component={Error}/>
          </Switch>
        </main>
      </div>
    );
  }
  
}

export default App;
