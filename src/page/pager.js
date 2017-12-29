import React,{ Component } from 'react';


export default class Pager extends Component{
	
	render(){
		
		let {
			list,//数据列表
			nowPage,
			changeNowPage,
			length//每页长度
		} = this.props;

		let maxPage = Math.ceil(list.length / length) || 1;

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
		
		return (
			<div className="pager">
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
		)
	}
}