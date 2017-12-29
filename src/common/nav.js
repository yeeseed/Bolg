import React,{ Component } from 'react';
import {NavLink} from 'react-router-dom';


export default class Nav extends Component{
	
	render(){
		
		let {category,categories,changeCategory} = this.props;
		
		categories = categories.map((elem,i)=>{
			return elem.order === category?
					(<NavLink 
						key={i}
						to="/" 
						className="focus"
						onClick={()=>{changeCategory(elem.order)}}
					>{elem.name}</NavLink>):
					(<NavLink 
						key={i}
						to="/"
						onClick={()=>{changeCategory(elem.order)}}
					>{elem.name}</NavLink>);
		});

		return (
			<nav>
				<div className="menu">
					{categories}
				</div>
			</nav>
		)
	}
}