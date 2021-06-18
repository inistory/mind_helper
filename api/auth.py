from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from app import getDB
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


bp = Blueprint('auth', __name__, url_prefix='/auth')
db = getDB()
api = Api(bp)
cursor = db.cursor()

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('email')
auth_parser.add_argument('password')
auth_parser.add_argument('confirm')
auth_parser.add_argument('name')
auth_parser.add_argument('phone')

class Signup(Resource):
    def post(self):

        args = auth_parser.parse_args()

        email = args['email']
        password = args['password']
        confirm = args['confirm']
        name = args['name']
        phone = args['phone']

        error = None
        if not email:
            error = "아이디가 유효하지 않습니다."
        elif not password : 
            error = "비밀번호가 유효하지 않습니다."
        elif not confirm :
            error = "비밀번호가 유효하지 않습니다."
        elif password != confirm:
            error = "비밀번호가 일치하지 않습니다."
        elif not name :
            error = "사용자명이 유효하지 않습니다."
        sql = '''
            SELECT 
                email
            FROM counselor
            WHERE email = %s            
        '''
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        if result is not None:
            error = '{} 계정은 이미 등록된 계정입니다.'.format(email)

        if error is None:
            sql =  '''
                INSERT INTO
                    `counselor`
                    (`email`,`password`,`name`,`phone`) 
                VALUES (%s, %s, %s, %s)
            '''
            cursor.execute(sql, (email, generate_password_hash(password), name, phone))
            result = cursor.fetchone()
            db.commit()
            return jsonify(status = "success", result = {"email": email, "name" :name, })
        return jsonify(status= "fail", result = {"error" : error})

class Login(Resource):
    def post(self):
        args = auth_parser.parse_args()
        email = args['email']
        password = args['password']
        error = None
        
        sql = '''
            SELECT 
                email, password, id 
            FROM counselor 
            WHERE email = %s
        '''
        cursor.execute(sql, (email,))
        counselor = cursor.fetchone()
        
        if counselor is None:
            error = '등록되지 않은 계정입니다.'
            return jsonify(status = "fail", result = {"error": error})
            
        else :
            counselorEmail = counselor[0]
            counselorPassword = counselor[1]
            counselorId = counselor[2]

            if not (counselor == None or check_password_hash(counselorPassword, password)):
                error = '비밀번호가 일치하지 않습니다.'

            if error is None:
                access_token = create_access_token(identity=counselor[2])
                return jsonify(status = "success", result = {"email": counselorEmail, "id": counselorId, "access_token": access_token })
            
            else:
                return jsonify(status = "fail", result = {"error": error})
            
    
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')