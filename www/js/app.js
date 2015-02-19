var app = angular.module("App", ["ionic"]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/todos");

	$stateProvider.state("app", {
		abstract: true,
		templateUrl: "main.html"
	})

	$stateProvider.state("app.todos", {
		abstract: true,
		url: "/todos",
		views: {
			todos: {
				template: "<ion-nav-view></ion-nav-view>"
			}
		}
	});

	$stateProvider.state("app.todos.index", {
		url: "",
		templateUrl: "todos.html",
		controller: "todosCtrl"
	});

	$stateProvider.state("app.todos.detail", {
		url: "/:todo",
		templateUrl: "todo.html",
		controller: "todoCtrl",
		resolve: {
			todo: function($stateParams, todoService) {
				return todoService.getTodo($stateParams.todo);
			}
		}
	});

	$stateProvider.state("app.help", {
		url: "/help",
		views: {
			help: {
				templateUrl: "help.html"
			}
		}
	});
});

app.factory("todoService", function() {
	var todos = [
		{title: "task1", done: true},
		{title: "task2", done: false},
		{title: "task3", done: false}
	];

	return {
		todos: todos,
		getTodo: function(index) {
			return todos[index];
		}
	};
});

app.controller("todosCtrl", ["$scope", "todoService", function($scope, todoService) {
	$scope.todos = todoService.todos;
}]);

app.controller("todoCtrl", ["$scope", "todo", function($scope, todo) {
	$scope.todo = todo;
}]);