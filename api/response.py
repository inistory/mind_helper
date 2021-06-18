from flask import Flask, Blueprint, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from config import DB_CONNECT
from app import getDB

bp = Blueprint('response', __name__, url_prefix='/response')
api = Api(bp)
db = getDB()
cursor = db.cursor()

response_parser = reqparse.RequestParser()
response_parser.add_argument('id')
response_parser.add_argument('response_score')
response_parser.add_argument('question_id')
response_parser.add_argument('user_id')


class Response(Resource):
    def post(self):
        args = response_parser.parse_args()
        sql = '''
        INSERT INTO
            `response` (`response_score`,`question_id`,`user_id`)
        VALUES(%s, %s, %s)
        '''
        cursor.execute(sql, (args['response_score'],
                       args['question_id'], args['user_id']))
        db.commit()

        return jsonify(status="success", result={"response_score": args['response_score'], "question_id": args['question_id'], 'user_id': args['user_id']})


api.add_resource(Response, '/')