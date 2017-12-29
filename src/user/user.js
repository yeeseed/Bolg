import React,{ Component } from 'react';

import Login from 'user/login.js';
import Register from 'user/register.js';
import HasLogin from 'user/hasLogin.js';

export default class User extends Component{
	
	render(){
		
		let {
			changeState,
			login,
			layout,
			addUser,
			isLogin,
			users,
			nowUser,
			history,
			categories
		} = this.props;
			
		if(isLogin === 'login'){
			return  <Login {...{changeState,login,users}}/>
		}else if(isLogin === 'register'){
			return  <Register {...{changeState,addUser}}/>
		}else if(isLogin === 'hasLogin'){
			return  <HasLogin {...{layout,nowUser,history,categories}}/>
		}
			
		
	}
}