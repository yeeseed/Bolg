import 'babel-polyfill';

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Frame from 'view/frame.js';
import Write from 'view/write.js';
import User from 'view/user/user.js';

import data from 'data.js';


require('public/css/main.css');
require('public/css/user.css');



export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pages: data
		}
		this.addArticle = this.addArticle.bind(this);
		this.addClicks = this.addClicks.bind(this);
	}
	
	addArticle(articleInfo){
		let {pages} = this.state;
		pages.unshift(articleInfo);
		this.setState({pages});
	}
	
	addClicks(id){
		
		let {pages} = this.state;
		
		pages = pages.map(elem=>{
			if(elem.id === id){
				elem.clicks++;
			}
			return elem;
		});
		
		this.setState({pages});
		
	}
	
	render(){
		
		let {addArticle,addClicks} = this;
		let {pages} = this.state;
		
		return (
			<Router>
				<Switch>
					<Route path="/user" render={props=>{
						let {history,location} = props;
						return <User {...{pages,history,location}}/>
					}}/>
					<Route path="/write" render={props=>{
						let {history,location} = props;
						return <Write {...{addArticle,history,location}}/>
					}}/>
					<Route path="/" render={props=>{
						let {history,location} = props;
						return <Frame {...{pages,addClicks,history,location}}/>
					}}/>
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);
