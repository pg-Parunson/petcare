from flask import Flask, render_template, request, jsonify, redirect
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://haumcare:louiscare@cluster0.8ssl1.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.petcare

# 메인 페이지
@app.route('/')
def home():
   return render_template('main.html')

@app.route("/addMember", methods=["POST"])
def addUser_post():
    userId_receive = request.form['userId_give']
    userPassword_receive = request.form['userPassword_give']
    userNickname_receive = request.form['userNickname_give']

    doc = {
        'userId': userId_receive,
        'userPassword': userPassword_receive,
        'userNickname': userNickname_receive
    }
    db.users.insert_one(doc)

    return jsonify({'msg':'마이펫 회원가입이 완료되었습니다.'})

# 마이펫 정보 등록
@app.route("/petInfo", methods=["POST"])
def petInfo_post():
    petName_receive = request.form['petName_give']
    petBirth_receive = request.form['petBirth_give']
    breed_receive = request.form['breed_give']
    petSex_receive = request.form['petSex_give']
    neuteringCheck_receive = request.form['neuteringCheck_give']
    etc_receive = request.form['etc_give']

    doc = {
        'petName': petName_receive,
        'petBirth': petBirth_receive,
        'breed': breed_receive,
        'petSex': petSex_receive,
        'neutering': neuteringCheck_receive,
        'etc': etc_receive
    }
    db.petInfo.insert_one(doc)

    return jsonify({'msg':'마이펫 정보가 저장되었습니다.'})

# 마이펫 정보 획득
@app.route("/petInfo", methods=["GET"])
def petInfo_get():
    petInfo = list(db.petInfo.find({}, {'_id': False}))
    return jsonify({'petInfo': petInfo})

# 진료내역 저장
@app.route("/medicalInfo", methods=["POST"])
def medicalInfo_post():
    inoculationDate_receive = request.form['inoculationDate_give']
    treatmentType_receive = request.form['treatmentType_give']
    treatmentPeriodStart_receive = request.form['treatmentPeriodStart_give']
    treatmentPeriodEnd_receive = request.form['treatmentPeriodEnd_give']
    cost_receive = request.form['cost_give']
    treatmentHospital_receive = request.form['treatmentHospital_give']

    doc = {
        'inoculationDate': inoculationDate_receive,
        'treatmentType': treatmentType_receive,
        'treatmentPeriodStart': treatmentPeriodStart_receive,
        'treatmentPeriodEnd': treatmentPeriodEnd_receive,
        'cost': cost_receive,
        'treatmentHospital': treatmentHospital_receive
    }
    db.medicalInfo.insert_one(doc)

    return jsonify({'msg':'진료내역이 추가되었습니다.'})

# 마이펫 정보 획득
@app.route("/medicalInfo", methods=["GET"])
def medicalInfo_get():
    medicalInfo = list(db.medicalInfo.find({}, {'_id': False}))
    return jsonify({'medicalInfo': medicalInfo})

# # 로그인 후 메인페이지 이동
# @app.route("/login", methods=["GET", "POST"])
# def login_chk():
#     myPassword = request.form.get('myPassword')
#     if password == myPassword:
#         return redirect('/')
#     return 'Password incorrect.'

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)