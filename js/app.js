/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<TodoHeader />
				<TodoMain />
				<TodoFooter />
			</div>
		);
	}	
});

var TodoHeader = React.createClass({
	render : function(){
		return (
			<header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" autofocus />
			</header>
		);
	}
	
});

var TodoFooter = React.createClass({
	render: function() {
		return (
			<footer className="footer">
				<span className="todo-count"><strong>0</strong> item left</span>
				<ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button className="clear-completed">Clear completed</button>
			</footer>
		);
	}
});

var TodoMain = React.createClass({
	render: function() {
		return (
			<section className="main">
				<input className="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					<li className="completed">
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>Taste JavaScript</label>
							<button className="destroy"></button>
						</div>
						
					</li>
					<li>
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>Buy a unicorn</label>
							<button className="destroy"></button>
						</div>
						
					</li>
				</ul>
			</section>
		);
	}
});


ReactDOM.render(<App />, document.getElementById('tutu'));


