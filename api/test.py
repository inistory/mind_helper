from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from config import DB_CONNECT
from app import getDB

bp = Blueprint('test', __name__, url_prefix='/test')
api = Api(bp)
db = getDB()
cursor = db.cursor()

question_parser = reqparse.RequestParser()
question_parser.add_argument('question_id')

user_parser = reqparse.RequestParser()
user_parser.add_argument('id')
user_parser.add_argument('user_name')
user_parser.add_argument('user_age')
user_parser.add_argument('user_gender')
user_parser.add_argument('user_region')

# score_parser = reqparse.RequestParser()
# score_parser.add_argument('user_id')

code_parser = reqparse.RequestParser()
code_parser.add_argument('code_id')


class Question(Resource):
    def get(self):
        result = []
        args = question_parser.parse_args()
        sql = '''
            SELECT
                id
                , question
            FROM question
            WHERE id = %s
            ORDER BY id ASC
        '''
        cursor.execute(sql, args['question_id'])
        questions = cursor.fetchall()
        for question in questions:
            result.append(
                {
                    'id': question[0],
                    'question': question[1]
                }
            )
        return jsonify(status='success', result=result)


class QuestionItem(Resource):
    def get(self):
        result = []
        args = question_parser.parse_args()
        sql = '''
            SELECT
                id
                , question_item
                , question_id
                , score
            FROM question_item
            WHERE question_id = %s
        '''
        cursor.execute(sql, args['question_id'],)
        questionItems = cursor.fetchall()
        for questionItem in questionItems:
            result.append(
                {
                    'id': questionItem[0],
                    'question_item': questionItem[1],
                    'question_id': questionItem[2],
                    'score': questionItem[3]
                }
            )
        return jsonify(status='success', result=result)


class User(Resource):
    def post(self):
        args = user_parser.parse_args()
        sql = '''
        INSERT INTO
            `user` (`user_name`,`user_age`,`user_gender`, `user_region`)
        VALUES(%s, %s, %s, %s)
        '''
        cursor.execute(sql, (args['user_name'], args['user_age'],
                       args['user_gender'], args['user_region']))
        db.commit()
        return jsonify(status="success", result={"user_name": args['user_name'], 'user_id': cursor.lastrowid})


# class ResponseScore(Resource):
#     def get(self):
#         result = []
#         args = score_parser.parse_args()
#         # sql = '''
#         # SELECT
#         #     IFNULL(SUM(response_score), 0)
#         #     , r.user_id
#         #     , u.user_name
#         #     , u.user_gender 
#         #     , (SELECT code_nm FROM code WHERE code_id='gender' AND code = u.user_gender) AS user_gender_nm
#         #     , u.user_age 
#         #     , (SELECT code_nm FROM code WHERE code_id='age' AND code = u.user_age) AS user_age_nm
#         #     , u.user_region 
#         #     , (SELECT code_nm FROM code WHERE code_id='region' AND code = u.user_region) AS user_region_nm
#         # FROM response r
#         # INNER JOIN `user` u
#         # ON r.user_id = u.id
#         # WHERE r.user_id = %s
#         # '''
#         # cursor.execute(sql, args['user_id'],)
#         # responses = cursor.fetchall()
#         # print(responses)
#         # for response in responses:
#         #     result.append(
#         #         {
#         #             'score': response[0],
#         #             'user_id': response[1],
#         #             'user_name': response[2],
#         #             'user_gender': response[3],
#         #             'user_gender_nm': response[4],
#         #             'user_age': response[5],
#         #             'user_age_nm': response[6],
#         #             'user_region': response[7],
#         #             'user_region_nm': response[8]
#         #         }
#         #     )
#         sql = '''
#         SELECT
#             IFNULL(SUM(response_score), 0)
#         FROM response r
#         WHERE r.user_id = %s
#         '''
#         cursor.execute(sql, args['user_id'],)
#         responses = cursor.fetchall()
#         print(responses)
#         for response in responses:
#             result.append(
#                 {
#                     'score': response[0]
#                 }
#             )
#         return jsonify(status="success", result=result)




class Code(Resource):
    def get(self):
        result = []
        args = code_parser.parse_args()
        sql = '''
        SELECT
            id
            , code_id
            , code
            , code_nm
            , sort_no
        FROM `code`
        WHERE code_id = %s
        ORDER BY sort_no
        '''
        cursor.execute(sql, (args['code_id'],))
        codes = cursor.fetchall()
        for code in codes:
            result.append(
                {
                    'id': code[0],
                    'code_id': code[1],
                    'code': code[2],
                    'code_nm': code[3],
                    'sort_no': code[4]
                }
            )
        return jsonify(status='success', result=result)




api.add_resource(Question, '/question')
api.add_resource(QuestionItem, '/questionItem')
api.add_resource(User, '/user')
# api.add_resource(ResponseScore, '/responseScore')
api.add_resource(Code, '/code')