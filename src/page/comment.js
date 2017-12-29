import React from 'react';


export default function Comment(props){
	
	let {name,time,content} = props;
	
	time = (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();

	return (
		<div className="messageBox">
			<p className="name clear">
				<span className="f1">{name}</span>
				<span className="fr">{time}</span>
			</p>
			<p>{content}</p>
		</div>
	)
}