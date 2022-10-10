import json
import os
import smtplib
import time


import bs4
import colorama
import requests


from colorama import Back, Fore
from ebooklib import epub
# from utils import *
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from utils import *
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service


questions_url='https://leetcode.com/problemset/all/'
api='https://leetcode.com/api/problems/algorithms/'

