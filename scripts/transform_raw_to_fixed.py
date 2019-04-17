#!/usr/bin/env python

"""
This script transform the raw datasets to clean comma
separated files ready to be imported to database.

The raw files can be found on:
https://cdn.dimkouv.com/raw_murders_analytics_data.tar.gz
"""

import pandas as pd
import numpy as np

RAW_DATA_DIR = "../data/raw"
CLEAN_DATA_DIR = "../data/clean"

CONTINENTS = ["unknown", "africa", "asia", "europe",
              "north america", "oceania", "south america"]
CONTINENTS = {c: i+1 for i, c in enumerate(CONTINENTS)}


def generate_countries_table():
    raw_filenames = [RAW_DATA_DIR + x for x in [
        "/Homicide_0-14.csv",
        "/Homicide_15-29.csv",
        "/Homicide_30-44.csv",
        "/Homicide_45-59.csv",
        "/Homicide_60-123.csv",
        "/Murdered_Females.csv",
        "/Murdered_Males.csv",
        "/Political_Culture.csv"]]

    # load continents data frame
    cc_df = pd.read_csv(RAW_DATA_DIR + "/Countries_Continents.csv")

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
    df.to_csv(CLEAN_DATA_DIR + "/country.csv", index=True, index_label="id")


def generate_homicides_table():
    countries = pd.read_csv(CLEAN_DATA_DIR + "/country.csv")

    raw_files = [
        {
            "path": RAW_DATA_DIR + "/Homicide_0-14.csv",
            "age_from": 0,
            "age_to": 14,
            "gender": None
        },
        {
            "path": RAW_DATA_DIR + "/Homicide_15-29.csv",
            "age_from": 15,
            "age_to": 29,
            "gender": None
        },
        {
            "path": RAW_DATA_DIR + "/Homicide_30-44.csv",
            "age_from": 30,
            "age_to": 44,
            "gender": None
        },
        {
            "path": RAW_DATA_DIR + "/Homicide_45-59.csv",
            "age_from": 45,
            "age_to": 59,
            "gender": None
        },
        {
            "path": RAW_DATA_DIR + "/Homicide_60-123.csv",
            "age_from": 60,
            "age_to": 123,
            "gender": None
        },
        {
            "path": RAW_DATA_DIR + "/Murdered_Females.csv",
            "age_from": None,
            "age_to": None,
            "gender": "F"
        },
        {
            "path": RAW_DATA_DIR + "/Murdered_Males.csv",
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
                deathnums = row[key]

                homicides_data.append({
                    "country_id": countries[countries["name"] == country]["id"].tolist()[0],
                    "year": year,
                    "gender": raw_file["gender"],
                    "age_from": raw_file["age_from"],
                    "age_to": raw_file["age_to"],
                    "deathnums": deathnums
                })

    df = pd.DataFrame(data=homicides_data)
    # start id from 1 instead of 0
    df.index = np.arange(1, len(df) + 1)
    df.to_csv(CLEAN_DATA_DIR + "/homicides.csv", index_label="id")


def generate_political_culture():
    countries = pd.read_csv(CLEAN_DATA_DIR + "/country.csv")

    political_culture_data = []

    df = pd.read_csv(RAW_DATA_DIR + "/Political_Culture.csv")
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
    df.to_csv(CLEAN_DATA_DIR + "/political_culture.csv", index_label="id")


if __name__ == "__main__":
    generate_countries_table()
    generate_homicides_table()
    generate_political_culture()
