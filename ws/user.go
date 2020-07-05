package main

type User struct {
	ID int64 `json:"id"`
	Conn *Conn `json:"-"`
	Team *Team `json:"-"`
	Name string `json:"name"`
	ChatAnswer bool `json:"chatAnswer"`
}

func NewUser(id int64, conn *Conn, name string) *User {
	user := new(User)
	user.ID = id
	user.Conn = conn
	user.Name = name
	return user
}

type Users map[int64]*User

func (users Users) Update(user *User) {
	target := users[user.ID]
	target.ChatAnswer = user.ChatAnswer
}
