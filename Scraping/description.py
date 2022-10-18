from selenium import webdriver
from time import sleep
import os
import json
import os
import smtplib
import time


from bs4 import BeautifulSoup
import colorama
import requests


from colorama import Back, Fore
from ebooklib import epub
# from utils import *
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
# from utils import *
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service


CHROMEDRIVER_PATH=r"C://Program Files//BraveSoftware//Brave-Browser//Application//brave.exe"
options=Options()
options.headless=True
options.add_argument("--log-level=3")
driver=webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,options=options)

# initialise browser

# load page
driver.get('https://leetcode.com/problems/two-sum/')

# execute java script
driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")

# wait page to load
sleep(5)

# get selected content
problem_description = driver.find_element_by_class_name('question-content__JfgR')
print(problem_description.text)