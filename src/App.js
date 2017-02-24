import React, { Component } from 'react';
const apps = require('./my-apps.js');
import {Panel, Grid, ButtonToolbar, Button, Row, Col, Pager} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Pager>
          <h2>State manager test</h2>
          <h5>Shows the state of my web services running on my digital ocean machine</h5>
          </Pager>
          <Grid>
          {apps.default.appslist.map((object, i) => {
              return <SingleState name={object.name} url={object.url}></SingleState>;
            })}
            </Grid>
      </div>
    );
  }
}

class SingleState extends Component {
  state = { 
    serviceState: "?"
   }

  constructor(props){
    super(props);
  
    fetch(this.props.url).then((response) => {
      if(response.status >= 200 && response.status < 300)
        this.setState({serviceState: "up"});
      else
        this.setState({serviceState: "down"});

      this.setState({httpCode: response.status})
    })
    .catch((error) => {
      console.dir(error);
      this.setState({serviceState: "down"});
      this.setState({httpCode: 'error'});
    });
  }

  spinnerStyle = {
    height: '50px',
    marginTop: '25px', /* poussé de la moitié de hauteur de viewport */
  }

  gifStyle = {
    height: '90px',
    marginTop: '5px', /* poussé de la moitié de hauteur de viewport */
  }

  rowStyle = {
    height: '110px',
    borderRadius: '10px',
    marginBottom: '10px'
  }
  styleUp = {
    color: 'green'
  }

  styleDown = {
    color: 'red'
  }

  responseCodeStyle = {
    marginTop: '10px'
  }
  render() {
    return (
      <Row style={this.rowStyle}>
        <Col xs={2} md={2} >
           {this.state.serviceState == "?" && <img style={this.spinnerStyle} src="./assets/loading.gif" />}
           {this.state.serviceState == "up" && <img style={this.gifStyle} src="./assets/ok.gif" />}
           {this.state.serviceState == "down" && <img style={this.gifStyle} src="./assets/notok.gif" />}
        </Col>
        <Col xs={7} md={7}>
          <h2 style={this.state.serviceState == "up" ? this.styleUp : this.styleDown}>{this.props.name}</h2>
          <a href={this.props.url} target="blank">{this.props.url}</a>
        </Col>
        <Col xs={3} md={3}>
        <Pager style={this.responseCodeStyle}>
            <p>Response code</p>
            {this.state.httpCode ? <h2>{this.state.httpCode}</h2> : <h3>Loading...</h3>}
          </Pager>
        </Col>
      </Row>
    );
  }
}

export default App;
