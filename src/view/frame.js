import React,{ Component } from 'react';

import Header from 'common/header.js';
import Nav from 'common/nav.js';
import Footer from 'common/footer.js';
import User from 'user/user.js';
import Pages from 'page/pages.js';

let categories = [
	{name: '首页',order: 0},
	{name: 'CSS',order: 1},
	{name: 'HTML',order: 2},
	{name: 'JAVASCRIPT',order: 3},
];

let userData = [];

export default class Frame extends Component{

	constructor(props) {
		super(props);
		this.state = {
			category: 0,//当前导航页
			isLogin: 'login',
			users: userData,
			nowUser: null
		}
		this.changeState = this.changeState.bind(this);
		this.login = this.login.bind(this);
		this.layout = this.layout.bind(this);
		this.addUser = this.addUser.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
	}
	
	//登录和注册面板切换
	changeState(isLogin){
		this.setState({isLogin});
	}
	
	login(nowUser){
		this.setState({
			nowUser,
			isLogin: 'hasLogin'
		});
	}
	
	layout(){
		this.setState({
			isLogin: 'login',
			nowUser: null
		});
	}
	
	addUser(userInfo){
		
		userData.push(userInfo);
		
		this.setState({
			isLogin: 'hasLogin',
			users: userData,
			nowUser: userInfo.username
		});
	}
	
	changeCategory(category){
		this.setState({category});
	}
	
	componentDidMount(){
		if(this.props.location.state){
			let {userInfo,articleInfo} = this.props.location.state;
			if(userInfo && articleInfo){
				this.setState({
					nowUser: userInfo.nowUser,
					isLogin: 'hasLogin',
					category: articleInfo.category
				});
			}else if(userInfo){
				this.setState({
					nowUser: userInfo.nowUser,
					isLogin: 'hasLogin'
				});
			}
		}
	}
	
	render(){
		
		let {changeState,login,layout,addUser,changeCategory} = this;
		let {category,isLogin,users,nowUser} = this.state;
		let {history,pages,addClicks} = this.props;

		return (
			<div>
				<Header/>
				<Nav {...{category,categories,changeCategory}}/>
				<div id="main" className="clear">
					
					<Pages {...{category,changeCategory,nowUser,history,pages,addClicks}}/>				
		
					<div className="mainRight">
					
						<User 
							{...{
								changeState,
								login,
								layout,
								addUser,
								isLogin,
								users,
								nowUser,
								history,
								categories
							}}
						/>
		
						<div className="rightBox">
							<div className="title"><span>社区</span></div>
							<p>
								<a href="http://www.baidu.com" className="colDanger" target="_blank">百度</a>
							</p>
							<p>
								<a href="https://docschina.org" className="colDanger" target="_blank">印记中文</a>
							</p>
						</div>
		
					</div>
		
				</div>
				<Footer/>
      		</div>
		)
	}
}
