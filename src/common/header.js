import React from 'react';


export default function Header(){
	return (
		<header>
			<div className="backimg"><img src={require('public/img/IMG_0293.jpg')}/></div>
			<div className="logo"><img src={require('public/img/00002637.png')} alt=""/></div>
		</header>	
	)
}
