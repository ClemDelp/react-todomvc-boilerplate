/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var TodoHeader = React.createClass({
	
	add : function(event){
		event.preventDefault();
		this.props.add(this.state.val);
		this.setState({val : ""});

		return false;
	},

	getInitialState : function(){
		return ({val : ''});
	},

	handleChange : function(event){
		this.setState({val : event.target.value});
	},	

	render : function(){
		return (
			<header className="header">
				<h1>todos</h1>
				<form onSubmit={this.add}>
				<input value={this.state.val} onChange={this.handleChange} className="new-todo" placeholder="What needs to be done?" autofocus />
				</form>
			</header>
		);
	}
	
});

var TodoFooter = React.createClass({
	render: function() {
		return (
			<footer className="footer">
				<span className="todo-count"><strong>{this.props.nb_left}</strong> item left</span>
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

var TodoItem = React.createClass({
	
	delete : function(){
		this.props.delete(this.props.id)
	},

	toggle : function(){
		this.props.toggle(this.props.id)
	},

	render : function(){
		var classStr = '';
		if(this.props.todo.completed == true) classStr = 'completed';
		
		return (
			<li className={classStr}>
				<div className="view">
					<input onClick={this.toggle}  className="toggle" type="checkbox" ckecked={this.props.todo.completed} />
					<label>{this.props.todo.name}</label>
					<button onClick={this.delete} className="destroy"></button>
				</div>
				
			</li>
		);
	}
})

var TodoMain = React.createClass({

	addItem : function(val){
		this.state.todos.push({name:val,completed:false});
		this.setState({todos : this.state.todos});
	},

	deleteItem : function(key){
		this.state.todos.splice(key,1);
		this.setState({todos : this.state.todos})
	},
	
	toggleItem : function(key){
		this.state.todos[key].completed = !this.state.todos[key].completed;
		this.setState({todos : this.state.todos})
	},

	getInitialState : function(){
		return {
			todos : [
				{name : "Design the application", completed : false},
				{name : "Push to git repo", completed : false}
			]
		}
	},

	render: function() {
		var that = this;
		console.log(this.state.todos)

		var rows = this.state.todos.map(function(todo,i){

			return <TodoItem toggle={that.toggleItem} delete={that.deleteItem} todo={todo} id={i} />
		});

		var nb_left = this.state.todos.filter(function(elem){return !elem.completed;}).length;
		return (
			<div>
				<TodoHeader add={that.addItem} />
				<section className="main">
					<input className="toggle-all" type="checkbox" />
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ul className="todo-list">
						{rows}
					</ul>
				</section>
				<TodoFooter nb_left={nb_left} />
			</div>
		);
	}
});

ReactDOM.render(<TodoMain />, document.getElementById('todo_main_container'));


