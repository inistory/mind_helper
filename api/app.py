from flask import Flask
from config import DB_CONNECT, SECRET_KEY
from flask_jwt_extended import JWTManager

#import logging
import pymysql
pymysql.install_as_MySQLdb()

def getDB():
    db = pymysql.connect(
        user=DB_CONNECT["username"],
        passwd=DB_CONNECT["password"],
        host=DB_CONNECT["server"],
        port=3306,
        db=DB_CONNECT["dbname"],
        charset="utf8",
    )
    return db


def create_app():
    #logging.basicConfig(filename = "./logs/flask.log", level = logging.DEBUG)    
    app = Flask(__name__)
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["JWT_SECRET_KEY"] = SECRET_KEY
    
    jwt = JWTManager(app)

    import auth
    app.register_blueprint(auth.bp)

    import responseScore
    app.register_blueprint(responseScore.bp)

    import test
    app.register_blueprint(test.bp)

    import report
    app.register_blueprint(report.bp)

    import response
    app.register_blueprint(response.bp)    

    import message
    app.register_blueprint(message.bp)  

    with app.app_context():
        import db

        db.init_db()

    return app