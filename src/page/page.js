import React,{ Component } from 'react';
import {Link} from 'react-router-dom';


export default class Page extends Component{
	render(){
		
		let {
			id,
			category,
			user,
			time,
			clicks,
			title,
			description,
			content,
			comments,
			changeCategory,
			history
		} = this.props;
		
		return (
			<div className="listBox">
				<h1>{title}</h1>
				<p className="colDefault">
					作者：<span className="colInfo">{user}</span> - 时间：
					<span className="colInfo">{time}</span> - 阅读：
					<span className="colInfo">{clicks}</span> - 评论：
					<span className="colInfo">{comments.length}</span>
				</p>
				<dfn><p>{description}</p></dfn>
				<div className="function">
					<Link 
						to="/view"
						onClick={ev=>{
							ev.stopPropagation();
							ev.preventDefault();
							history.push('/view',{
								articleInfo: {
									id,
									user,
									time,
									clicks,
									title,
									content,
									comments
								}
							});
							changeCategory(category);
						}}
					>阅读全文</Link>
				</div>
			</div>
		)
	}
}