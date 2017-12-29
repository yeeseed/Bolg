import React,{ Component } from 'react';

import Pager from 'page/pager.js';
import Comment from 'page/comment.js';

export default class View extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			nowPage: 1
		}
		this.changeNowPage = this.changeNowPage.bind(this);
	}	
	
	changeNowPage(nowPage){
		this.setState({nowPage});
	}
	
	componentDidMount(){	
		let {articleInfo,addClicks} = this.props;
		this.setState({
			comments: articleInfo.comments
		});	
		addClicks(articleInfo.id);
	}

	componentWillReceiveProps(nextProps){
		this.setState({nowPage: 1});
	}
	
	render(){

		let {changeNowPage} = this;
		let {nowPage} = this.state;
		let {addComment,nowUser,addClicks,noAdd} = this.props;
		
		let {
			id,
			user,
			time,
			clicks,
			title,
			content,
			comments
		} = this.props.articleInfo;	
		
		if(!noAdd)clicks++;//从主页进入时点击量不会立即增加，需要手动加1
		
		let length = 3;
		
		let writeComment = (<p className="bgDanger" style={{lineHeight: "30px"}}>您还没有登录，请先登录！</p>);
		
		if(nowUser){
			writeComment = [
				(<p key={1} className="textLeft">{nowUser}</p>),
				(<p key={2} className="textLeft clear">
					<textarea 
						id="messageContent"
						ref="msgContent"
					></textarea>
					<button 
						id="messageBtn" 
						className="submit"
						onClick={()=>{
							addComment(id,{
								time: new Date(),
								name: 1,
								content: this.refs.msgContent.value
							});
							this.refs.msgContent.value = '';
						}}
					>提交</button>
				</p>)
			];
		}
		
		if(comments.length === 0){
			comments = (
				<div className="messageBox">
					<p>还没有留言</p>
				</div>
			);
		}else{
			comments = comments.map((elem,i)=>{
				return i >= length * (nowPage - 1) && i < length * nowPage ?
					<Comment key = {i} { ...elem}/>:
					null;
			});
		}
		
		
		
		return (
			<div>
				<h1>{title}</h1>
				<p className="colDefault">
					作者：<span className="colInfo">{user}</span> - 时间：
					<span className="colInfo">{time}</span> - 阅读：
					<span className="colInfo">{clicks}</span> - 评论：
					<span className="colInfo">{comments.length}</span>
				</p>
				<dfn>
					{content}
				</dfn>
				<div className="listBox message">
					<h3 className="textLeft"><strong>评论</strong></h3>
					
					{writeComment}
				
					<div className="messageList">
						{comments}
					</div>
	
				</div>
				
				<Pager
					{...{
						list: comments,
						nowPage,
						changeNowPage,
						length
					}}
				/>
				
			</div>	
		)
	}
}