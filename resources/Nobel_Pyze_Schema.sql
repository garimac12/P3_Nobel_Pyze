CREATE TABLE "Laureates" (
    "Laureate_id" INT,
    "Org_id" VARCHAR(20),
    "Laureate_Full_Name" VARCHAR(100),
    "Laureate_Known_Name" VARCHAR(100),
    "Birth_Date" DATE,
    "Birth_City" VARCHAR(100),
    "Birth_Country" VARCHAR(100),
    "Birth_Lat" FLOAT,
    "Birth_Lon" FLOAT,
    "Gender" VARCHAR(10),
    "Age_When_Awarded" FLOAT,
    CONSTRAINT "pk_Laureate_winners_demographics" PRIMARY KEY (
        "Laureate_id"
     )
);

CREATE TABLE "Awards" (
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
    CONSTRAINT "pk_Awards_details" PRIMARY KEY (
        "Laureate_id"
     )
);

CREATE TABLE "Prizes" (
    "Laureate_id" INT,
    "Prize_Amount" INT,
    "Prize_Amount_Adj" INT,
    "Sole_Winner" BOOL,
    "Portion" VARCHAR(5),
    CONSTRAINT "pk_Prize_details" PRIMARY KEY (
        "Laureate_id"
     )
);

CREATE TABLE "Orgs" (
    "Laureate_id" INT,
    "Org_id" VARCHAR(20),
    "Organization_Name" VARCHAR,
    "Founded_country" VARCHAR(20),
    "Org_Founded_Date" DATE,
	CONSTRAINT "pk_Organization_winners_demographics" PRIMARY KEY (
        "Laureate_id"
	 )
);