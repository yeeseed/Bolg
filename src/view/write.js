import React,{ Component } from 'react';
import { Link } from 'react-router-dom';


export default class Login extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			msg: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(articleInfo){
		if(!articleInfo.title.trim()){
			this.setState({
				msg: '标题不能为空！'
			});
		}else if(!articleInfo.description.trim()){
			this.setState({
				msg: '描述不能为空！'
			});
		}else if(!articleInfo.content.trim()){
			this.setState({
				msg: '内容不能为空！'
			});
		}else{
			
			let {category,title,des,content} = this.refs;
			
			title.value = des.value = content.value = '';
			
			this.props.addArticle(articleInfo);
			this.setState({
				msg: '发表成功！'
			});
		}
	}
	
	render(){
		
		let {onSubmit} = this;
		let {msg} = this.state;
		let {history,location} = this.props;
		let {nowUser} = location.state.userInfo;
		let {categories} = this.props.location.state.categoryInfo;
		
		let options = categories.map((elem,i)=>{
			return i !== 0?
					(<option key={i} value={elem.order}>{elem.name}</option>):
					null;
		});
		
		return (
			<form 
				id="write"
				onSubmit={ev=>{
					ev.preventDefault();
					ev.stopPropagation();
					
					let {category,title,des,content} = this.refs;
					let time = new Date();
					time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
					
					onSubmit({
						id: Math.random(),
						category: Number(category.value),
						user: nowUser,
						time,
						clicks: 0,
						title: title.value,
						description: des.value,
						content: content.value,
						comments: []
					});
					
				}}
			>
				<label htmlFor="category">分类:</label>
				<select name="category" ref="category">
					{options}
				</select>
				<label htmlFor="title">标题:</label>
				<input type="text" name="title" ref="title" />
				<label htmlFor="des">描述:</label>
				<input type="text" name="des" ref="des" />
				<label htmlFor="content">内容:</label>
				<textarea name="content" ref="content"></textarea>
				<p>{msg}</p>
				<input type="submit" value="发表" />
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
				>返回</Link>
			</form>
		)
	}
}