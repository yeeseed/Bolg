import React,{ Component } from 'react';
import { Link } from 'react-router-dom';



export default class Frame extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			nowPage: 1
		}
		this.changeNowPage = this.changeNowPage.bind(this);
	}
	
	changeNowPage(nowPage){
		this.setState({nowPage});
	}
	
	render(){
		
		let {changeNowPage} = this;
		let {nowPage} = this.state;
		let {history,location,pages} = this.props;
		let {nowUser} = this.props.location.state.userInfo;
		let {categories} = this.props.location.state.categoryInfo;
		
		let length = 3;//定义每页长度为3
		
		pages = pages.filter(elem=>{
			return elem.user === nowUser;
		});
		
		let maxPage = Math.ceil(pages.length / length) || 1;
		
		let previous = nowPage === 1 ?
			(<span>没有上一页了</span>) :
			(<a 
				href="javascript:;"
				onClick={()=>{
					changeNowPage(--nowPage);
				}}
			>上一页</a>);

		let next = nowPage === maxPage ?
			(<span>没有下一页了</span>) :
			(<a 
				href="javascript:;"
				onClick={()=>{
					changeNowPage(++nowPage);
				}}
			>下一页</a>);
			
			
		pages = pages.filter((elem,i)=>{
			return i >= (nowPage - 1)*length && i < nowPage*length;
		});
		
		
		pages = pages.map((elem,i)=>{
			
			let {category,user,time,clicks,title,description,comments} = elem;
				
			let categoryName = '';
			
			categories.forEach(elem=>{
				if(elem.order === category){
					categoryName = elem.name;
				}
			});
			
			return (
				<div key={i} className="list_box">
					<h2>{title}</h2>
					<p>
						分类：<span>{category}</span> - 时间：
						<span>{time}</span> - 阅读：
						<span>{clicks}</span> - 评论：
						<span>{comments.length}</span>
					</p>
					<p>{description}</p>
					<button
						onClick={()=>{
						history.push('/view',{
							articleInfo: elem,
							userInfo: {
								nowUser
							},
							noAdd: true
						});
						
					}}
					>阅读全文</button>
				</div>
			)

		});
		
		return (
			<div>
				<header id="user_header">
					<h1>欢迎您，username</h1>
					<Link 
						to="/"
						onClick={ev=>{
							ev.preventDefault();
							history.push('/',{
								userInfo: {
									nowUser
								}
							});
						}}
					>返回首页</Link>
					<Link 
						to="/write"
						onClick={ev=>{
							ev.preventDefault();
							history.push('/write',{
								userInfo: {
									nowUser
								},
								categoryInfo:{
									categories
								}
							});
						}}
					>写文章</Link>
				</header>
				<nav id="user_nav">
					<ul>
						<li><a href="javascript:;" className="active">发表文章</a></li>
					</ul>
				</nav>
				<section>
					{pages}
					<div className="user_pager">
						<ul className="clear">
							<li className="previous">
								{previous}
							</li>
							<li>
								<strong>{nowPage}</strong>
							</li> /
							<li>
								<strong>{maxPage}</strong>
							</li>
							<li className="next">
								{next}
							</li>
						</ul>
					</div>
				</section>
			</div>
		)
	}
}