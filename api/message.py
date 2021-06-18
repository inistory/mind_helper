from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from config import DB_CONNECT
from app import getDB

bp = Blueprint('message', __name__, url_prefix='/message')
api = Api(bp)
db = getDB()
cursor = db.cursor()

message_parser = reqparse.RequestParser()
message_parser.add_argument('id')
message_parser.add_argument('user_id')


# class essage(Resource):
#     def get(self):
#         result = []
#         args = message_parser.parse_args()
#         sql = '''
#             SELECT
#                 *
#             FROM report
#         '''
#         cursor.execute(sql, )
#         reports = cursor.fetchall()
#         for report in reports:
#             result.append(
#                 {
#                     'id' :report[0],
#                     'title':report[1],
#                     'desc':report[2],
#                 }
#             )
#         return jsonify(status='success', result = result)

class Message(Resource):
    def get(self):
        result = []
        args = message_parser.parse_args()
        sql = '''
            SELECT
                u.user_name 
                , (SELECT code_nm FROM code WHERE code_id='gender' AND code = u.user_gender) AS user_gender_nm
                , (SELECT code_nm FROM code WHERE code_id='region' AND code = u.user_region) AS user_region_nm
                , m.message_cause 
                , m.message_desc 
            FROM `user` u 
            INNER JOIN message m 
            ON u.user_gender = m.message_gender 
            AND u.user_age = m.message_age 
            WHERE u.id = %s
        '''
        cursor.execute(sql, args['user_id'])
        messages = cursor.fetchall()
        for message in messages:
            result.append(
                {
                    'user_name' :message[0],
                    'user_gender':message[1],
                    'user_region':message[2],
                    'message_cause':message[3],
                    'message_desc':message[4]
                }
            )
        return jsonify(status='success', result = result)

# api.add_resource(Report, '/report')
api.add_resource(Message, '/')