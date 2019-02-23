#!/usr/bin/env python

import pandas as pd
import numpy as np


CONTINENTS = ["unknown", "africa", "asia", "europe",
              "north america", "oceania", "south america"]
CONTINENTS = {c: i+1 for i, c in enumerate(CONTINENTS)}


def generate_countries_table():
    """
    This method generates the countries table.
    """

    raw_filenames = [
        "../raw_data/Homicide_0-14.csv",
        "../raw_data/Homicide_15-29.csv",
        "../raw_data/Homicide_30-44.csv",
        "../raw_data/Homicide_45-59.csv",
        "../raw_data/Homicide_60-123.csv",
        "../raw_data/Murdered_Females.csv",
        "../raw_data/Murdered_Males.csv",
        "../raw_data/Political_Culture.csv",
    ]

    # load continents data frame
    cc_df = pd.read_csv("../raw_data/Countries_Continents.csv")

    # convert country to lower case
    cc_df['Country'] = cc_df['Country'].apply(lambda x: x.lower())
    cc_df['Continent'] = cc_df['Continent'].apply(lambda x: x.lower())

    # find all the country names from our csv files
    country_names = []
    for filename in raw_filenames:
        df = pd.read_csv(filename)
        country_names += [country.lower()
                          for country in df.iloc[:, 0].tolist()]
    # remove duplicates
    country_names = set(country_names)

    # generate the countries table
    country_table = []
    for country_name in country_names:
        try:
            continent = cc_df[cc_df['Country'] == country_name]['Continent'].tolist()[
                0]
        except IndexError:
            continent = 'unknown'

        country_table.append({
            "name": country_name,
            "continent_id": CONTINENTS[continent]
        })

    df = pd.DataFrame(data=country_table)
    # start id from 1 instead of 0
    df.index = np.arange(1, len(df) + 1)
    df.to_csv("../fixed_data/country.csv", index=True, index_label="id")


def generate_homicides_table():
    """
    This method generates homicides table
    """
    countries = pd.read_csv("../fixed_data/country.csv")

    raw_files = [
        {
            "path": "../raw_data/Homicide_0-14.csv",
            "age_from": 0,
            "age_to": 14,
            "gender": None
        },
        {
            "path": "../raw_data/Homicide_15-29.csv",
            "age_from": 15,
            "age_to": 29,
            "gender": None
        },
        {
            "path": "../raw_data/Homicide_30-44.csv",
            "age_from": 30,
            "age_to": 44,
            "gender": None
        },
        {
            "path": "../raw_data/Homicide_45-59.csv",
            "age_from": 45,
            "age_to": 59,
            "gender": None
        },
        {
            "path": "../raw_data/Homicide_60-123.csv",
            "age_from": 60,
            "age_to": 123,
            "gender": None
        },
        {
            "path": "../raw_data/Murdered_Females.csv",
            "age_from": None,
            "age_to": None,
            "gender": "F"
        },
        {
            "path": "../raw_data/Murdered_Males.csv",
            "age_from": None,
            "age_to": None,
            "gender": "M"
        },
    ]

    homicides_data = []
    for raw_file in raw_files:
        df = pd.read_csv(raw_file["path"])
        for row in df.to_dict(orient='records'):
            country = row['country'].lower()
            for key in row:
                if not key.isdigit():
                    continue
                year = int(key)
                if np.isnan(row[key]):
                    continue
                percentage = row[key]

                homicides_data.append({
                    "country_id": countries[countries["name"] == country]["id"].tolist()[0],
                    "year": year,
                    "gender": raw_file["gender"],
                    "age_from": raw_file["age_from"],
                    "age_to": raw_file["age_to"],
                    "percentage": percentage
                })

    df = pd.DataFrame(data=homicides_data)
    # start id from 1 instead of 0
    df.index = np.arange(1, len(df) + 1)
    df.to_csv("../fixed_data/homicides.csv", index_label="id")


def generate_political_culture():
    """
    This method generates political culture table
    """
    countries = pd.read_csv("../fixed_data/country.csv")

    political_culture_data = []

    df = pd.read_csv("../raw_data/Political_Culture.csv")
    for row in df.to_dict(orient='records'):
        country = row['country'].lower()
        for key in row:
            if not key.isdigit():
                continue
            year = int(key)
            if np.isnan(row[key]):
                continue
            index = row[key]

            political_culture_data.append({
                "country_id": countries[countries["name"] == country]["id"].tolist()[0],
                "year": year,
                "index": index
            })

    df = pd.DataFrame(data=political_culture_data)
    # start id from 1 instead of 0
    df.index = np.arange(1, len(df) + 1)
    df.to_csv("../fixed_data/political_culture.csv", index_label="id")


if __name__ == "__main__":
    generate_countries_table()
    generate_homicides_table()
    generate_political_culture()
