package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"time"
)

const scoreBackupExpire = 600

func RandomBytes(bytes []byte) {
	if _, err := io.ReadFull(rand.Reader, bytes); err != nil {
		panic(err)
	}
}

func EncryptAES(plainText, key []byte) (string, error) {
	encrypted := make([]byte, len(plainText)+aes.BlockSize)

	iv := encrypted[:aes.BlockSize]
	RandomBytes(iv)

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(encrypted[aes.BlockSize:], plainText)

	return base64.StdEncoding.EncodeToString(encrypted), nil
}

func DecryptAES(encoded string, key []byte) ([]byte, error) {
	encrypted, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		return nil, err
	}

	iv := encrypted[:aes.BlockSize]

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	decrypted := make([]byte, len(encrypted)-aes.BlockSize)
	mode.CryptBlocks(decrypted, encrypted[aes.BlockSize:])

	return decrypted, nil
}

type ScoreBackup struct {
	ID        int64  `json:"-"`
	Name      string `json:"name"`
	Point     int    `json:"point"`
	Batsu     int    `json:"batsu"`
	CompPoint int    `json:"compPoint"`
	Win       int    `json:"win"`
	Lose      int    `json:"lose"`
	Time      int64  `json:"time"`
}

func Encrypt(scoreBk *ScoreBackup, key []byte) (string, error) {
	plainText, err := json.Marshal(scoreBk)
	if err != nil {
		LogError("encrypt", Log{ID: scoreBk.ID, Message: "json marshal error", Json: scoreBk, Error: err})
		return "", err
	}

	for len(plainText)%aes.BlockSize != 0 {
		plainText = append(plainText, 0)
	}

	encrypted, err := EncryptAES(plainText, key)
	if err != nil {
		LogError("encrypt", Log{ID: scoreBk.ID, Message: "AES encrypt error", Json: scoreBk, Error: err})
		return "", err
	}

	return encrypted, nil
}

func Decrypt(encoded string, key []byte) (*ScoreBackup, error) {
	encrypted, err := DecryptAES(encoded, key)
	if err != nil {
		LogError("decrypt", Log{Message: "AED decrypt error", Json: encoded, Error: err})
		return nil, err
	}

	for encrypted[len(encrypted)-1] == 0 {
		encrypted = encrypted[:len(encrypted)-1]
	}

	scoreBk := new(ScoreBackup)
	err = json.Unmarshal(encrypted, scoreBk)
	if err != nil {
		LogError("decrypt", Log{Message: "json unmarshal error", Json: encoded, Error: err})
		return nil, err
	}

	return scoreBk, nil
}

func (room *Room) MakeScoreBackup(user *User, score *Score) (string, error) {
	scoreBk := new(ScoreBackup)
	scoreBk.Name = user.Name
	scoreBk.Point = score.Point
	scoreBk.Batsu = score.Batsu
	scoreBk.CompPoint = score.CompPoint
	scoreBk.Win = score.Win
	scoreBk.Lose = score.Lose
	scoreBk.Time = time.Now().Unix()

	return Encrypt(scoreBk, room.AESKey)
}

func (room *Room) RestoreScoreBackup(user *User, encoded string) (*Score, error) {
	scoreBk, err := Decrypt(encoded, room.AESKey)
	if err != nil {
		return nil, err
	}

	if scoreBk.Name != user.Name {
		LogInfo("restore score backup", Log{ID: scoreBk.ID, Message: "mismatch user name", Json: scoreBk})
		return nil, errors.New("Mismatch user name")
	}

	if time.Now().Unix()-scoreBk.Time > scoreBackupExpire {
		LogInfo("restore score backup", Log{ID: scoreBk.ID, Message: "time is expired", Json: scoreBk})
		return nil, errors.New("Time is expired")
	}

	score := NewScore()
	score.Point = scoreBk.Point
	score.Batsu = scoreBk.Batsu
	score.CompPoint = scoreBk.CompPoint
	score.Win = scoreBk.Win
	score.Lose = scoreBk.Lose

	return score, nil
}
