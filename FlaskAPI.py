#------------------------------------------------------------------------
#                       Import dependancies
#------------------------------------------------------------------------ 
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


#------------------------------------------------------------------------
#               Configure the database connection URI
#------------------------------------------------------------------------
app = Flask(__name__)
CORS(app)

#------------------------------------------------------------------------
# FORMAT YOUR DATABASE PATH LIKE THIS:  'postgresql://{username}:{password}@{host}:{port}/{database_name}'
#------------------------------------------------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:{PASSWORDHERE}@localhost:5432/Laureates_DB'                              
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#------------------------------------------------------------------------
#          Create a SQLAlchemy database connection object
#------------------------------------------------------------------------
db = SQLAlchemy(app)

#========================================================================
#               Reflect tables to Python classes:
#========================================================================

#------------------------------------------------------------------------
#                           Laureates Table
#------------------------------------------------------------------------
class Laureate(db.Model):
    __tablename__ = 'Laureates'
    Laureate_id = db.Column(db.Integer, primary_key=True)
    Org_Type = db.Column(db.String(20))
    Laureate_Full_Name = db.Column(db.String(100))
    Laureate_Known_Name = db.Column(db.String(100))
    Birth_Date = db.Column(db.Date, default=datetime.utcnow)
    Birth_City = db.Column(db.String(100))
    Birth_Country = db.Column(db.String(100))
    Birth_Lat = db.Column(db.Float)
    Birth_Lon = db.Column(db.Float)
    Gender = db.Column(db.String(10))
    Age_When_Awarded = db.Column(db.Float)

#------------------------------------------------------------------------
#                           Awards Table
#------------------------------------------------------------------------
class Award(db.Model):
    __tablename__ = 'Awards'
    Award_id = db.Column(db.String(6), primary_key=True)
    Laureate_id = db.Column(db.Integer, db.ForeignKey('Laureates.Laureate_id'))
    Category = db.Column(db.String(30))
    Affiliation_Name = db.Column(db.String)
    Award_year = db.Column(db.Integer)
    Motivation = db.Column(db.String)
    Date_Awarded = db.Column(db.Date, default=datetime.utcnow)
    Award_City = db.Column(db.String(100))
    Award_Country = db.Column(db.String(100))
    Award_Lat = db.Column(db.Float)
    Award_Lon = db.Column(db.Float)

#------------------------------------------------------------------------
#                           Prizes Table
#------------------------------------------------------------------------
class Prize(db.Model):
    __tablename__ = 'Prizes'
    Prize_id = db.Column(db.String(6), primary_key=True)
    Laureate_id = db.Column(db.Integer, db.ForeignKey('Laureates.Laureate_id'))
    Prize_Amount = db.Column(db.Integer)
    Prize_Amount_Adj = db.Column(db.Integer)
    Sole_Winner = db.Column(db.Boolean)
    Portion = db.Column(db.String(5))

#------------------------------------------------------------------------
#                           Orgs Table
#------------------------------------------------------------------------
class Org(db.Model):
    __tablename__ = 'Orgs'
    Org_id = db.Column(db.String(6), primary_key=True)
    Laureate_id = db.Column(db.Integer, db.ForeignKey('Laureates.Laureate_id'))
    Org_Type = db.Column(db.String(20))
    Organization_Name = db.Column(db.String)
    Founded_Country = db.Column(db.String(20))
    Org_Founded_Date = db.Column(db.Date, default=datetime)


#========================================================================




#========================================================================
# Define App Routes
#========================================================================

@app.route("/")
def home():
    return (
        f"Welcome to the Noble Prize Winners API<br/>"
        f"Available Routes:<br/>"
        f"/Laureates<br/>"
        f"/Awards<br/>"
        f"/Prizes<br/>"
        f"/Orgs<br/>"
        f"/LaureatesAndAwards<br/>"
        f"/AllTables<br/>"
        

        
    )

#------------------------------------------------------------------------
#                       Laureates App route
#------------------------------------------------------------------------
@app.route("/Laureates")
def get_laureates():
    laureates = Laureate.query.all()
    
    # Format the Birth_Date before building the JSON response
    laureates_list = [
        {
            'Laureate_id': laureate.Laureate_id,
            'Org_Type': laureate.Org_Type,
            'Laureate_Full_Name': laureate.Laureate_Full_Name,
            'Laureate_Known_Name': laureate.Laureate_Known_Name,
            'Birth_Date': laureate.Birth_Date.strftime("%m/%d/%Y")if laureate.Birth_Date is not None else None,  # Format the date
            'Birth_City': laureate.Birth_City,
            'Birth_Country': laureate.Birth_Country,
            'Birth_Lat': laureate.Birth_Lat,
            'Birth_Lon': laureate.Birth_Lon,
            'Gender': laureate.Gender,
            'Age_When_Awarded': laureate.Age_When_Awarded,
        } for laureate in laureates
    ]

    return jsonify({'Laureates': laureates_list})

#------------------------------------------------------------------------
#                       Awards App route
#------------------------------------------------------------------------
@app.route("/Awards")
def get_awards():
    awards_data = Award.query.all()
    awards_list = [{'Award_id': award.Award_id,
                    'Laureate_id': award.Laureate_id,
                    'Category': award.Category,
                    'Affiliation_Name': award.Affiliation_Name,
                    'Award_year': award.Award_year,
                    'Motivation': award.Motivation,
                    'Date_Awarded': award.Date_Awarded.strftime("%m/%d/%Y") if award.Date_Awarded is not None else None,
                    'Award_City': award.Award_City,
                    'Award_Country': award.Award_Country,
                    'Award_Lat': award.Award_Lat,
                    'Award_Lon': award.Award_Lon,
                    } for award in awards_data]

    return jsonify({'Awards': awards_list})

#------------------------------------------------------------------------
#                       Prizes App route
#------------------------------------------------------------------------
@app.route("/Prizes")
def get_prizes():
    prizes_data = Prize.query.all()
    prizes_list = [{'Prize_id': prize.Prize_id,
                    'Laureate_id': prize.Laureate_id,
                    'Prize_Amount': prize.Prize_Amount,
                    'Prize_Amount_Adj': prize.Prize_Amount_Adj,
                    'Sole_Winner': prize.Sole_Winner,
                    'Portion': prize.Portion,
                    } for prize in prizes_data]

    return jsonify({'Prizes': prizes_list})


#------------------------------------------------------------------------
#                       Orgs App route
#------------------------------------------------------------------------
@app.route("/Orgs")
def get_orgs():
    orgs_data = Org.query.all()
    orgs_list = [{'Org_id': org.Org_id,
                  'Laureate_id': org.Laureate_id,
                  'Org_Type': org.Org_Type,
                  'Organization_Name': org.Organization_Name,
                  'Founded_Country': org.Founded_Country,
                  'Org_Founded_Date': org.Org_Founded_Date.strftime("%m/%d/%Y") if org.Org_Founded_Date is not None else None,
                  } for org in orgs_data]

    return jsonify({'Orgs': orgs_list})


#------------------------------------------------------------------------
#                       Laureates And Awards App route
#------------------------------------------------------------------------
@app.route("/LaureatesAndAwards")
def get_laureates_and_awards():
    # Perform a join operation to get data from both Laureates and Awards tables
    # Assuming there's a foreign key relationship between Laureates and Awards
    joined_data = db.session.query(Laureate, Award).filter(Laureate.Laureate_id == Award.Laureate_id).all()

    # Format the joined data for JSON response
    merged_list = [
        {
            'Laureate_id': laureate.Laureate_id,
            'Org_Type': laureate.Org_Type,
            'Laureate_Full_Name': laureate.Laureate_Full_Name,
            'Laureate_Known_Name': laureate.Laureate_Known_Name,
            'Birth_Date': laureate.Birth_Date.strftime("%m/%d/%Y") if laureate.Birth_Date is not None else None,
            'Birth_City': laureate.Birth_City,
            'Birth_Country': laureate.Birth_Country,
            'Birth_Lat': laureate.Birth_Lat,
            'Birth_Lon': laureate.Birth_Lon,
            'Gender': laureate.Gender,
            'Age_When_Awarded': laureate.Age_When_Awarded,
            'Award_id': award.Award_id,
            'Category': award.Category,
            'Affiliation_Name': award.Affiliation_Name,
            'Award_year': award.Award_year,
            'Motivation': award.Motivation,
            'Date_Awarded': award.Date_Awarded.strftime("%m/%d/%Y") if award.Date_Awarded is not None else None,
            'Award_City': award.Award_City,
            'Award_Country': award.Award_Country,
            'Award_Lat': award.Award_Lat,
            'Award_Lon': award.Award_Lon,
        } for laureate, award in joined_data
    ]

    return jsonify({'LaureatesAndAwards': merged_list})


#------------------------------------------------------------------------
#                       All Tables App route
#------------------------------------------------------------------------


@app.route("/AllTables")
def get_AllTables():
    # Perform a join operation to get data from Laureates, Awards, Prizes, and Orgs tables
    # Assuming there are foreign key relationships between these tables
    joined_data = (
        db.session.query(Laureate, Award, Prize, Org)
        .filter(Laureate.Laureate_id == Award.Laureate_id)
        .filter(Laureate.Laureate_id == Prize.Laureate_id)
        .filter(Laureate.Laureate_id == Org.Laureate_id)
        .all()
    )

    # Format the joined data for JSON response
    merged_list = [
        {
            'Laureate_id': laureate.Laureate_id,
            'Org_Type': laureate.Org_Type,
            'Laureate_Full_Name': laureate.Laureate_Full_Name,
            'Laureate_Known_Name': laureate.Laureate_Known_Name,
            'Birth_Date': laureate.Birth_Date.strftime("%m/%d/%Y") if laureate.Birth_Date is not None else None,
            'Birth_City': laureate.Birth_City,
            'Birth_Country': laureate.Birth_Country,
            'Birth_Lat': laureate.Birth_Lat,
            'Birth_Lon': laureate.Birth_Lon,
            'Gender': laureate.Gender,
            'Age_When_Awarded': laureate.Age_When_Awarded,
            'Award_id': award.Award_id,
            'Category': award.Category,
            'Affiliation_Name': award.Affiliation_Name,
            'Award_year': award.Award_year,
            'Motivation': award.Motivation,
            'Date_Awarded': award.Date_Awarded.strftime("%m/%d/%Y") if award.Date_Awarded is not None else None,
            'Award_City': award.Award_City,
            'Award_Country': award.Award_Country,
            'Award_Lat': award.Award_Lat,
            'Award_Lon': award.Award_Lon,
            'Prize_id': prize.Prize_id,
            'Prize_Amount': prize.Prize_Amount,
            'Prize_Amount_Adj': prize.Prize_Amount_Adj,
            'Sole_Winner': prize.Sole_Winner,
            'Portion': prize.Portion,
            'Org_id': org.Org_id,
            'Organization_Name': org.Organization_Name,
            'Founded_Country': org.Founded_Country,
            'Org_Founded_Date': org.Org_Founded_Date.strftime("%m/%d/%Y") if org.Org_Founded_Date is not None else None,
        }
        for laureate, award, prize, org in joined_data
    ]

    return jsonify({'LaureatesAndAwards': merged_list})
#------------------------------------------------------------------------
#========================================================================



#------------------------------------------------------------------------
# Main block to run the application only if this script is executed directly
#------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
#------------------------------------------------------------------------