#!/bin/bash

ionic platform remove android
ionic platform add android
ionic platform update android@06.1.0
ionic build android
