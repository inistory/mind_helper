from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from config import DB_CONNECT
from app import getDB

bp = Blueprint('responseScore', __name__, url_prefix='/responseScore')
api = Api(bp)
db = getDB()
cursor = db.cursor()

response_parser = reqparse.RequestParser()
response_parser.add_argument('user_id')


class ResponseScore(Resource):
    def get(self):
        result = []
        args = response_parser.parse_args()
        sql = '''
        SELECT
            IFNULL(SUM(response_score), 0)
            , r.user_id
            , u.user_name
            , u.user_gender 
            , (SELECT code_nm FROM code WHERE code_id='gender' AND code = u.user_gender) AS user_gender_nm
            , u.user_age 
            , (SELECT code_nm FROM code WHERE code_id='age' AND code = u.user_age) AS user_age_nm
            , u.user_region 
            , (SELECT code_nm FROM code WHERE code_id='region' AND code = u.user_region) AS user_region_nm
        FROM response r
        INNER JOIN `user` u
        ON r.user_id = u.id
        WHERE r.user_id = %s
        '''
        cursor.execute(sql, args['user_id'],)
        responses = cursor.fetchall()
        print(responses)
        for response in responses:
            result.append(
                {
                    'score': response[0],
                    'user_id': response[1],
                    'user_name': response[2],
                    'user_gender': response[3],
                    'user_gender_nm': response[4],
                    'user_age': response[5],
                    'user_age_nm': response[6],
                    'user_region': response[7],
                    'user_region_nm': response[8]
                }
            )
        return jsonify(status='success', result=result)

api.add_resource(ResponseScore, '/')