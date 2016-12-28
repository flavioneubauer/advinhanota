#!/bin/bash

cordova build android --release

# keytool -genkey -v -keystore release-key.keystore -alias keystore -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk keystore

/opt/android-sdk-linux/build-tools/25.0.0/zipalign -v 4  platforms/android/build/outputs/apk/android-release-unsigned.apk calculanota-signed.apk

mv calculanota-signed.apk releases/.
