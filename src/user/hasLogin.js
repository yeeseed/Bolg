import React,{ Component } from 'react';
import { Link } from 'react-router-dom';


export default function HasLogin(props){
	
	let {layout,nowUser,history,categories} = props;

	return (
		<div className="rightBox" id="userInfo">
			<div className="title"><span>用户信息</span></div>
			<p><span className="colDark" id="username">{nowUser}</span></p>
			<p><span className="colDanger">你好，欢迎光临我的博客！</span></p>
			<Link
				to="/user"
				onClick={ev=>{
					ev.preventDefault();
					history.push('/user',{
						userInfo: {
							nowUser
						},
						categoryInfo:{
							categories
						}
					});
				}}
			>个人中心</Link>
			<p>
				<span className="colDark">
					<a 
						href="javascript:;" 
						id="logout"
						onClick={layout}
					>退出</a>
				</span>
			</p>
		</div>
	)
}