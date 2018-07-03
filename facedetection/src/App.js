import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import './App.css';
import Clarifai from 'clarifai';

/*particles parameters*/
const parameters = {
  particles : {
    number : {
      value : 30,
      density :{
        enable: true,
        value_area: 500
      }
    },
    opacity : {
      anim : {
        enable : true,
        speed: 10
      }
    }
  }
};

/*get the face detection api from Clarifai*/
const app = new Clarifai.App({
        apiKey: 'c9622fb2407c40ff8b38196aa4b069d0'
    });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box : {},
      route: 'signin',
      isSignedIn: false,
      user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

/*componentDidMount() {
  fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(console.log);
}*/

loadUser = (user) => {
  this.setState({user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
  }})
}

/*get the feedback from the api*/
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    console.log(width, height);
    /*return face position*/
    return {
      //from left to right
      leftCol : clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      //beacuse in the css, right means right edge to the position. so we need to do some math.
      rightCol: width - (clarifaiFace.right_col * width), 
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  /*show the the box square the face*/
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }
  /*use a listerner to track the input*/
  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  /*setting the click button; using promise*/
  onSubmit = () => {
    this.setState({imageUrl : this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    /*arrow function*/
    .then(response => {
      if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
           this.setState(Object.assign(this.state.user, {entries: count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    // in case of invalid url
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  /*main execuation order, put each components in the render to complete the design*/
  render() {
    return (
      <div className="App"> 
       <Particles className = 'particles' params={parameters}/>
          <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
          {/*check whetger the user signed in already.*/}
          {this.state.route === 'home'
            ? <div> 
                <Logo />
                <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
                <ImageLinkForm 
                onInputChange = {this.onInputChange} 
                onSubmit = {this.onSubmit}/>
                <FaceDetection 
                box = {this.state.box} 
                imageUrl = {this.state.imageUrl}/>
              </div>
            : (this.state.route === 'signin' 
              ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
              :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />   
              )
        }
      </div>
    );
  }
}

export default App;
