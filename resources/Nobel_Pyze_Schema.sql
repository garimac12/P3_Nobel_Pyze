CREATE TABLE "Laureates" (
    "Laureate_Id" INT PRIMARY KEY,
    "Org_Id" VARCHAR(20),
    "Laureate_Full_Name" VARCHAR(100),
    "Laureate_Known_Name" VARCHAR(100),
    "Birth_Date" DATE,
    "Birth_City" VARCHAR(100),
    "Birth_Country" VARCHAR(100),
    "Birth_Lat" FLOAT,
    "Birth_Lon" FLOAT,
    "Gender" VARCHAR(10),
    "Age_When_Awarded" FLOAT
);

CREATE TABLE "Awards" (
    "Award_Id" SERIAL PRIMARY KEY,
    "Laureate_Id" INT,
    "Category" VARCHAR(30),
    "Affiliation_Name" VARCHAR,
    "Award_Year" INT,
    "Motivation" VARCHAR,
    "Date_Awarded" DATE,
    "Award_City" VARCHAR(100),
    "Award_Country" VARCHAR(100),
    "Award_Lat" FLOAT,
    "Award_Lon" FLOAT,
    FOREIGN KEY ("Laureate_Id") REFERENCES "Laureates" ("Laureate_Id")
);

CREATE TABLE "Prizes" (
    "Prize_Id" SERIAL PRIMARY KEY,
    "Laureate_Id" INT,
    "Prize_Amount" INT,
    "Prize_Amount_Adj" INT,
    "Sole_Winner" BOOL,
    "Portion" VARCHAR(5),
    FOREIGN KEY ("Laureate_Id") REFERENCES "Laureates" ("Laureate_Id")
);

CREATE TABLE "Orgs" (
    "Org_Id" SERIAL PRIMARY KEY,
    "Laureate_Id" INT,
    "Organization_Name" VARCHAR,
    "Founded_Country" VARCHAR(20),
    "Org_Founded_Date" DATE,
    FOREIGN KEY ("Laureate_Id") REFERENCES "Laureates" ("Laureate_Id")
);