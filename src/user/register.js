import React,{ Component } from 'react';


export default class Register extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			errMsg: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(){
		
		let {username,password,repassword} = this.refs;
		let {addUser} = this.props;
		
		if(username.value.trim() === ''){
			this.setState({
				errMsg: '用户名不能为空！'
			});
		}else if(password.value === ''){
			this.setState({
				errMsg: '密码不能为空！'
			});
		}else if(password.value !== repassword.value){
			this.setState({
				errMsg: '两次输入的密码不一致！'
			});
		}else{
			addUser({
				username: username.value,
				password: password.value
			});
		}
	}
	
	render(){
		
		let {onSubmit} = this;
		let {errMsg} = this.state;
		let {changeState} = this.props;
	
		return (
			<div className="rightBox" id="registerBox">
				<div className="title"><span>注册</span></div>
				<div className="line">
					<span className="colDark">用户名：</span>
					<input type="text" name="username" ref="username" />
				</div>
				<div className="line">
					<span className="colDark">密码：</span>
					<input type="password" name="password" ref="password" />
				</div>
				<div className="line">
					<span className="colDark">确认：</span>
					<input type="password" name="repassword" ref="repassword" />
				</div>
				<div className="line">
					<span className="colDark"></span>
					<button
						onClick={onSubmit}
					>注 册</button>
				</div>
				<p className="textRight">已有账号？
					<a 
						href="javascript:;"
						className="colMint"
						onClick={ev=>{changeState('login')}}
					>马上登录</a>
				</p>
				<p className="colWarning textCenter">{errMsg}</p>
			</div>
		)
	}
	
	
}