package schema

import (
	"fmt"
	"math/rand"

	"github.com/graphql-go/graphql"
)

// Todo struct
type Todo struct {
	ID int `json:"id"`
	Text string `json:"text"`
	Done bool `json:"done"`
	DetailText string `json:"detailText"`
	Importance int `json:"importance"`
}

// AddTodo struct
type AddTodo struct {
	Text string `json:"text"`
	DetailText string `json:"detailText"`
	Importance int `json:"importance"`
}

// TodoList slice
var TodoList []Todo

func generateRandomID() int {
	return rand.Intn(10000)
}

var todoType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Todo",
	Fields: graphql.Fields{
		"id": &graphql.Field {
			Type: graphql.String,
		},
		"text": &graphql.Field{
			Type: graphql.String,
		},
		"done": &graphql.Field{
			Type: graphql.Boolean,
		},
		"detailText": &graphql.Field{
			Type: graphql.String,
		},
		"importance": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name:"RootMutation",
	Fields: graphql.Fields{
		"createTodo": &graphql.Field{
			Type: todoType,
			Args: graphql.FieldConfigArgument{
				"text" : &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"detailText": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"importance": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				newTodo := Todo{
					ID: generateRandomID(),
					Text: params.Args["text"].(string),
					Done: false,
					DetailText: params.Args["detailText"].(string), 
					Importance: params.Args["importance"].(int),
				}

				fmt.Println(newTodo)
				TodoList = append(TodoList, newTodo)
				return newTodo, nil
			},
		},
	},
})

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name:"RootQuery",
	Fields: graphql.Fields{
		"getTodos": &graphql.Field{
			Type: graphql.NewList(todoType),
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				return TodoList, nil
			},
		},
	},
})

// TodoSchema with rootQuery, rootMutation
var TodoSchema, _ =graphql.NewSchema(graphql.SchemaConfig{
	Query: rootQuery,
	Mutation: rootMutation,
})