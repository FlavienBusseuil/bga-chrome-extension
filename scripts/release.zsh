# Previous TAG
PREVIOUS_TAG=v$(node scripts/getVersion.js);
# Set a new version number and create a github tag
yarn version;
# Update the version number in manifest
node scripts/updateManifestVersionFromPackage.js;
# Set a new TAG name from version number
TAG=v$(node scripts/getVersion.js);
# production build
yarn build;
# zip
cd build/prod
zip -9 -r ../../builds/build-$TAG.zip *;
cd ../..
# production firefox build
yarn build:ff;
# zip firefox
cd build/prod-firefox
zip -9 -r ../../builds/build-firefox-$TAG.zip *;
cd ../..
# production opera build
yarn build:op;
# zip opera
cd build/prod-opera
zip -9 -r ../../builds/build-opera-$TAG.zip *;
cd ../..
# commit changes
git add package.json;
git add src/manifest.json;
git add src/manifest-firefox.json;
git add src/manifest-opera.json;
git commit -m 'Update version';
git push;
# push Github tag
git push --tags
# create a new release
# gren release --tags $TAG;
# create and push a changelog
# gren changelog --override;
# git add CHANGELOG.md;
# git commit -m 'Update Changelog';
# git push