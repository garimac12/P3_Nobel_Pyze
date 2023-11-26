CREATE TABLE "Laureates" (
    "Laureate_id" INT PRIMARY KEY,
    "Org_Type" VARCHAR(20),
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
    "Award_id" VARCHAR(6) PRIMARY KEY,
    "Laureate_id" INT,
    "Category" VARCHAR(30),
    "Affiliation_Name" VARCHAR,
    "Award_year" INT,
    "Motivation" VARCHAR,
    "Date_Awarded" DATE,
    "Award_City" VARCHAR(100),
    "Award_Country" VARCHAR(100),
    "Award_Lat" FLOAT,
    "Award_Lon" FLOAT,
    FOREIGN KEY ("Laureate_id") REFERENCES "Laureates" ("Laureate_id")
);

CREATE TABLE "Prizes" (
    "Prize_id" VARCHAR(6) PRIMARY KEY,
    "Laureate_id" INT,
    "Prize_Amount" INT,
    "Prize_Amount_Adj" INT,
    "Sole_Winner" BOOL,
    "Portion" VARCHAR(5),
    FOREIGN KEY ("Laureate_id") REFERENCES "Laureates" ("Laureate_id")
);

CREATE TABLE "Orgs" (
    "Org_id" VARCHAR(6) PRIMARY KEY,
    "Laureate_id" INT,
    "Org_Type" VARCHAR(20),
    "Organization_Name" VARCHAR,
    "Founded_Country" VARCHAR(20),
    "Org_Founded_Date" DATE,
    FOREIGN KEY ("Laureate_id") REFERENCES "Laureates" ("Laureate_id")
);