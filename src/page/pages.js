import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Page from 'page/page.js';
import Pager from 'page/pager.js';
import View from 'page/view.js';

export default class Pages extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pages: [],
			nowPage: 1
		}
		this.changeNowPage = this.changeNowPage.bind(this);
		this.addComment = this.addComment.bind(this);
	}	
	
	changeNowPage(nowPage){
		this.setState({nowPage});
	}
	
	addComment(id,comment){
		
		let {pages} = this.state;
		
		pages = pages.map(elem=>{
			if(elem.id === id){
				elem.comments.unshift(comment);
			}
			return elem;
		});
		
		this.setState({pages});
		
	}

	componentWillReceiveProps(nextProps){
		this.setState({nowPage: 1});
	}
	
	componentDidMount(){
		this.setState({
			pages: this.props.pages
		});
	}

	render() {

		let {changeNowPage,addComment} = this;
		let {pages,nowPage} = this.state;
		let {category,changeCategory,nowUser,addClicks,history} = this.props;

		let length = 5;

		if(category !== 0){
			pages = pages.filter(elem=>{
				return elem.category === category;
			});
		}
		
		let pageList = pages.map((elem, i) => {
			return i >= length * (nowPage - 1) && i < length * nowPage ?
				<Page key = {i} { ...elem} {...{changeCategory,history}}/>:
				null;
		});

		return(
			<div className="mainLeft">
				
				<Route exact path="/" render={()=>{
					return (
						<div>
							{pageList}
							<Pager 
								{...{
									list: pages,
									nowPage,
									changeNowPage,
									length
								}}
							/>
						</div>
					)
				}}/>
				<Route path="/view" render={(props)=>{
					let {articleInfo,noAdd} = props.location.state;
					return <View 
								{...{
									articleInfo,
									addComment,
									nowUser,
									addClicks,
									noAdd
								}}
							/>
				}}/>
				
			</div>
		)
	}
}