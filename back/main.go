package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/Choheeseok/react-go-todolist-graphql/back/schema"
	"github.com/graphql-go/graphql"
)

type postData struct {
	Query string `json:"query"`
	Operation string `json:"operation"`
	Variables map[string]interface{} `json:"variables"`
}

func main() {
	schema.TodoList = append(schema.TodoList, schema.Todo{
		ID: 1,
		Text: "타입스크립트 공부",
		Done: false,
		DetailText: "열심히 하자",
		Importance: 1,
	})
	schema.TodoList = append(schema.TodoList, schema.Todo{
		ID: 2,
		Text: "밥",
		Done: false,
		DetailText: "먹고싶다",
		Importance: 2,
	})

	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		var p postData
		err := json.NewDecoder(r.Body).Decode(&p)
		switch {
		case err == io.EOF:
			result := graphql.Do(graphql.Params{
				Schema: schema.TodoSchema,
				RequestString: r.URL.Query().Get("query"),
			})
			if len(result.Errors) > 0 {
				fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
			}
			fmt.Println(result)
			json.NewEncoder(w).Encode(result)
			return
		case err != nil:
			panic(err)
		default:
			fmt.Println("default \t", p.Query)
			result := graphql.Do(graphql.Params{
				Context: r.Context(),
				Schema: schema.TodoSchema,
				RequestString: p.Query,
			})
			if err := json.NewEncoder(w).Encode(result); err != nil {
				w.WriteHeader(400)
				return
			}
		}
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){} )

	http.ListenAndServe(":8000", nil)
}