import React,{ Component } from 'react';


export default class Login extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			errMsg: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(){
		
		let {username,password} = this.refs;
		let {users,login} = this.props;
		
		if(username.value.trim() === ''){
			this.setState({
				errMsg: '用户名不能为空！'
			});
		}else if(password.value === ''){
			this.setState({
				errMsg: '密码不能为空！'
			});
		}else{
			let hasUser = users.some(elem=>{
				return elem.username === username.value && elem.password === password.value;
			});
			
			hasUser?
				login(username.value):
				this.setState({
					errMsg: '用户名或密码错误！'
				});
		}
	}
	
	render(){
		
		let {onSubmit} = this;
		let {errMsg} = this.state;
		let {changeState} = this.props;
	
		return (
			<div className="rightBox" id="loginBox">
				<div className="title"><span>登录</span></div>
				<div className="line">
					<span className="colDark">用户名：</span>
					<input type="text" name="username" ref="username" />
				</div>
				<div className="line">
					<span className="colDark">密码：</span>
					<input type="password" name="password" ref="password" />
				</div>
				<div className="line">
					<span className="colDark"></span>
					<button
						onClick={onSubmit}
					>登 录</button>
				</div>
				<p className="textRight">还没注册？
					<a 
						href="javascript:;" 
						className="colMint"
						onClick={ev=>{changeState('register')}}
					>马上注册</a>
				</p>
				<p className="colWarning textCenter">{errMsg}</p>
			</div>
		)
	}
	
	
}