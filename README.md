# mind_helper
[mind_helper] 우을증 해소 웹서비스


### install node, npm (macOS)
```
brew update

brew upgrade node

npm install -g npm
```

### 패키지 설치 및 시작
```
npm isntall
```
```
npm start
```

### backend


python패키지 설치하기
```
: pip3 install -r requirements.txt
```

mysql - flask 연결설정
: api 폴더안에 config.py 파일을 만드세요.
config.py 파일 안에 여러분의 mysql 사용자 정보를 아래의 형식에 맞추어 저장하세요.

```
DB_CONNECT = {
  'username' : '유저 이름',
  'password' : '비밀번호',
  'dbname' : '데이터베이스 이름',
  'server' : '127.0.0.1'
}

SECRET_KEY = '시크릿키 입력'

DB_URI = f"mysql://{DB_CONNECT['username']}:{DB_CONNECT['password']}@{DB_CONNECT['server']}:3306/{DB_CONNECT['dbname']}?charset=utf8".format(
  username = DB_CONNECT["username"],
  password = DB_CONNECT["password"],
  server = DB_CONNECT["server"],
  dbname = DB_CONNECT["dbname"]
  )
```



파이썬 logging 설정
:  터미널을 켜고 medical-hotspot 폴더에서
아래 명령어를 입력하세요.
cd api
mkdir logs
touch flask.log
