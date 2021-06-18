from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from config import DB_CONNECT
from app import getDB

bp = Blueprint('report', __name__, url_prefix='/report')
api = Api(bp)
db = getDB()
cursor = db.cursor()

report_parser = reqparse.RequestParser()
report_parser.add_argument('id')
report_parser.add_argument('user_id')


class Report(Resource):
    def get(self):
        result = []
        args = report_parser.parse_args()
        sql = '''
            SELECT 
                CASE 
                    WHEN IFNULL(SUM(response_score), 0) <= 10 AND IFNULL(SUM(response_score), 0) > 0 THEN (SELECT report_title FROM report WHERE id = 1)
                    WHEN IFNULL(SUM(response_score), 0) <= 15 AND IFNULL(SUM(response_score), 0) > 10 THEN (SELECT report_title FROM report WHERE id = 2)
                    WHEN IFNULL(SUM(response_score), 0) <= 23 AND IFNULL(SUM(response_score), 0) > 15 THEN (SELECT report_title FROM report WHERE id = 3)
                    WHEN IFNULL(SUM(response_score), 0) >= 24 THEN (SELECT report_title FROM report WHERE id = 4)
                    ELSE ''
                END report_title
                ,CASE 
                    WHEN IFNULL(SUM(response_score), 0) <= 10 AND IFNULL(SUM(response_score), 0) > 0 THEN (SELECT report_desc FROM report WHERE id = 1)
                    WHEN IFNULL(SUM(response_score), 0) <= 15 AND IFNULL(SUM(response_score), 0) > 10 THEN (SELECT report_desc FROM report WHERE id = 2)
                    WHEN IFNULL(SUM(response_score), 0) <= 23 AND IFNULL(SUM(response_score), 0) > 15 THEN (SELECT report_desc FROM report WHERE id = 3)
                    WHEN IFNULL(SUM(response_score), 0) >= 24 THEN (SELECT report_desc FROM report WHERE id = 4)
                    ELSE ''
                END report_desc
            FROM response
            WHERE user_id = %s
        '''
        cursor.execute(sql, (args['user_id'],))
        reports = cursor.fetchall()
        for report in reports:
            result.append(
                {
                    'title':report[0],
                    'desc':report[1]
                }
            )
        return jsonify(status='success', result = result)

# class Message(Resource):
#     def get(self):
#         result = []
#         args = report_parser.parse_args()
#         sql = '''
#             SELECT
#                 u.user_name 
#                 , (SELECT code_nm FROM code WHERE code_id='gender' AND code = u.user_gender) AS user_gender_nm
#                 , (SELECT code_nm FROM code WHERE code_id='region' AND code = u.user_region) AS user_region_nm
#                 , m.message_cause 
#                 , m.message_desc 
#             FROM `user` u 
#             INNER JOIN message m 
#             ON u.user_gender = m.message_gender 
#             AND u.user_age = m.message_age 
#             WHERE u.id = %s
#         '''
#         cursor.execute(sql, args['user_id'])
#         messages = cursor.fetchall()
#         for message in messages:
#             result.append(
#                 {
#                     'user_name' :message[0],
#                     'user_gender':message[1],
#                     'user_region':message[2],
#                     'message_cause':message[3],
#                     'message_desc':message[4]
#                 }
#             )
#         return jsonify(status='success', result = result)

api.add_resource(Report, '/report')
# api.add_resource(Message, '/message')